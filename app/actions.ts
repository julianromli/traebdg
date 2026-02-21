"use server";

import { db } from "@/db";
import { users, redeemCodes } from "@/db/schema";
import { redeemSchema } from "@/lib/validations";
import { eq, or, and } from "drizzle-orm";
import { headers } from "next/headers";

export type ActionState = {
  success: boolean;
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export async function redeemCode(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. Validate Input
  const rawData = Object.fromEntries(formData.entries());
  
  // Convert boolean-like strings to what Zod expects if needed, 
  // but Zod schema expects strings/enums which match form values.
  
  const validatedFields = redeemSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validasi gagal. Mohon periksa kembali input Anda.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, whatsapp, background, itRole, usedTrae } = validatedFields.data;

  // --- TEST MODE BYPASS ---
  if (email === "test@traebandung.com") {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return {
      success: true,
      code: "TEST-CODE-2024-TRAE",
      message: "Redeem berhasil! (Mode Test)",
    };
  }
  // --- END TEST MODE ---

  // 2. Get IP Address
  const headersList = await headers();
  // In production (Vercel/etc), x-forwarded-for is reliable.
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";

  try {
    // 3. Check IP Limit (1 submission per IP)
    if (ip !== "unknown") {
      const existingUserByIp = await db
        .select()
        .from(users)
        .where(eq(users.ipAddress, ip))
        .limit(1);

      if (existingUserByIp.length > 0) {
        return {
          success: false,
          message: "Anda sudah melakukan redeem code sebelumnya dari perangkat ini.",
        };
      }
    }

    // 4. Check Unique Email/WhatsApp
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.whatsapp, whatsapp)))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        message: "Email atau nomor WhatsApp sudah terdaftar.",
      };
    }

    // 5. Atomic Transaction
    const codeValue = await db.transaction(async (tx) => {
      // Find an available code
      // We select one code ID that is not used.
      const availableCode = await tx
        .select({ id: redeemCodes.id, code: redeemCodes.code })
        .from(redeemCodes)
        .where(eq(redeemCodes.isUsed, false))
        .limit(1);

      if (availableCode.length === 0) {
        throw new Error("Maaf, kuota redeem code sudah habis.");
      }

      const codeToUse = availableCode[0];

      // Optimistic locking: Try to update this specific code
      // We check isUsed = false again in the update condition
      const updateResult = await tx
        .update(redeemCodes)
        .set({
          isUsed: true,
          usedAt: new Date(),
          // We will set userId later or we need user ID first.
          // Since we need userId for the FK, we must insert user first.
        })
        .where(and(eq(redeemCodes.id, codeToUse.id), eq(redeemCodes.isUsed, false)))
        .returning({ id: redeemCodes.id });

      if (updateResult.length === 0) {
        // Race condition hit: someone else took this code.
        // We could retry, but for simplicity we throw error to rollback and let user try again.
        // Or we could implement a loop here. 
        throw new Error("Terjadi kesalahan teknis (Code contention). Silakan coba lagi.");
      }

      // If code update successful (reserved), insert the user
      const [newUser] = await tx
        .insert(users)
        .values({
          fullName,
          email,
          whatsapp,
          background,
          itRole: itRole || null,
          usedTrae: usedTrae === "YES",
          ipAddress: ip,
        })
        .returning({ id: users.id });

      // Now update the code with the user ID
      await tx
        .update(redeemCodes)
        .set({ userId: newUser.id })
        .where(eq(redeemCodes.id, codeToUse.id));

      return codeToUse.code;
    });

    return {
      success: true,
      code: codeValue,
      message: "Redeem berhasil!",
    };
  } catch (error: any) {
    console.error("Redeem Error:", error);
    // Return friendly error message
    let msg = "Terjadi kesalahan pada server.";
    if (error.message.includes("kuota")) msg = error.message;
    if (error.message.includes("contention")) msg = "Sedang sibuk, silakan coba lagi.";
    
    return {
      success: false,
      message: msg,
    };
  }
}
