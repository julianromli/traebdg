import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

console.log("Database URL:", process.env.TURSO_DATABASE_URL);

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN?.trim(),
  },
});
