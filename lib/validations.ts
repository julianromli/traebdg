import { z } from "zod";

export const redeemSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  whatsapp: z.string().min(10, "Invalid WhatsApp number").regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, "Invalid WhatsApp format (e.g. 08123456789)"),
  background: z.enum(["IT", "Non-IT"], {
    message: "Select your background",
  }),
  itRole: z.string().optional(),
  usedTrae: z.enum(["YES", "NO"], {
    message: "Select your TRAE usage status",
  }),
}).refine((data) => {
  if (data.background === "IT" && !data.itRole) {
    return false;
  }
  return true;
}, {
  message: "Please specify your IT role",
  path: ["itRole"],
});

export type RedeemFormValues = z.infer<typeof redeemSchema>;