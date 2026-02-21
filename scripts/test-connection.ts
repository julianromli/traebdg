import "dotenv/config";
import { createClient } from "@libsql/client";

async function testConnection() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  console.log("Testing connection...");
  console.log("URL:", url);
  console.log("Auth Token Length:", authToken?.length);

  if (!url || !authToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env");
    return;
  }

  const client = createClient({
    url: url,
    authToken: authToken.trim(),
  });

  try {
    const result = await client.execute("SELECT 1 as connected");
    console.log("Connection successful!");
    console.log("Result:", result.rows[0]);
  } catch (error: any) {
    console.error("Connection failed:", error.message);
    if (error.code === "SERVER_ERROR" && error.message.includes("401")) {
      console.error("Diagnosis: The Auth Token is invalid or expired. Please generate a new token.");
    }
  } finally {
    client.close();
  }
}

testConnection();
