import "dotenv/config";
import { db } from "../db";
import { redeemCodes } from "../db/schema";
import fs from "fs";
import path from "path";

async function main() {
  const filePath = path.join(process.cwd(), "docs", "redeem-code-list.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");
  
  const codes = lines.map((line) => {
    const code = line.trim();
    if (code.length > 0) {
      return {
        code: code,
        isUsed: false,
      };
    }
    return null;
  }).filter((code) => code !== null);

  if (codes.length > 0) {
    console.log(`Found ${codes.length} codes. Seeding...`);
    try {
        const batchSize = 50;
        for (let i = 0; i < codes.length; i += batchSize) {
            const batch = codes.slice(i, i + batchSize);
            await db.insert(redeemCodes).values(batch).onConflictDoNothing();
        }
      console.log("Seeding completed.");
    } catch (error) {
      console.error("Error seeding codes:", error);
    }
  } else {
    console.log("No codes found to seed.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
