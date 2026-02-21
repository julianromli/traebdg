import { z } from "zod";

export const redeemSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid").regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, "Format nomor WhatsApp tidak valid (contoh: 08123456789)"),
  background: z.enum(["IT", "Non-IT"], {
    errorMap: () => ({ message: "Pilih latar belakang Anda" }),
  }),
  itRole: z.string().optional(),
  usedTrae: z.enum(["YES", "NO"], {
    errorMap: () => ({ message: "Pilih status penggunaan TRAE" }),
  }),
}).refine((data) => {
  if (data.background === "IT" && !data.itRole) {
    return false;
  }
  return true;
}, {
  message: "Pilih role IT Anda",
  path: ["itRole"],
});

export type RedeemFormValues = z.infer<typeof redeemSchema>;
