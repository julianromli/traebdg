import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  whatsapp: text("whatsapp").notNull().unique(),
  background: text("background").notNull(), // 'IT' or 'Non-IT'
  itRole: text("it_role"), // 'Developer', 'DevOps', etc. (nullable)
  usedTrae: integer("used_trae", { mode: "boolean" }).notNull(),
  ipAddress: text("ip_address").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const redeemCodes = sqliteTable("redeem_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(),
  isUsed: integer("is_used", { mode: "boolean" }).notNull().default(false),
  userId: integer("user_id").references(() => users.id),
  usedAt: integer("used_at", { mode: "timestamp" }),
});
