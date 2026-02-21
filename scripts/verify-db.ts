import "dotenv/config";
import { db } from "../db";
import { users, redeemCodes } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Starting verification...");

  // Clean up test data if any
  const testEmail = "test@example.com";
  const testPhone = "081234567890";
  
  // 1. Test Unique Constraints
  console.log("Test 1: Unique Constraints");
  try {
    await db.insert(users).values({
      fullName: "Test User 1",
      email: testEmail,
      whatsapp: testPhone,
      background: "IT",
      usedTrae: false,
      ipAddress: "127.0.0.1"
    }).onConflictDoNothing();
    
    console.log("Inserted User 1");

    // Try insert same email
    try {
        await db.insert(users).values({
            fullName: "Test User 2",
            email: testEmail,
            whatsapp: "08987654321",
            background: "Non-IT",
            usedTrae: false,
            ipAddress: "127.0.0.2"
          });
        console.error("FAIL: Duplicate email should throw error");
    } catch (e) {
        console.log("PASS: Duplicate email prevented");
    }

  } catch (e) {
    console.error("Error in Test 1", e);
  }

  // 2. Test Code Assignment Logic
  console.log("\nTest 2: Code Assignment");
  try {
      // Find a code
      const availableCode = await db.query.redeemCodes.findFirst({
          where: eq(redeemCodes.isUsed, false)
      });
      
      if (availableCode) {
          console.log("Found available code:", availableCode.code);
          
          // Simulate assignment
          const result = await db.update(redeemCodes)
            .set({ isUsed: true, usedAt: new Date() })
            .where(eq(redeemCodes.id, availableCode.id))
            .returning();
            
          if (result.length > 0) {
              console.log("PASS: Code assigned successfully");
          } else {
              console.error("FAIL: Code assignment failed");
          }
      } else {
          console.log("SKIP: No available codes to test assignment");
      }
  } catch (e) {
      console.error("Error in Test 2", e);
  }
  
  // Clean up
  await db.delete(users).where(eq(users.email, testEmail));
  console.log("\nVerification complete.");
}

main();
