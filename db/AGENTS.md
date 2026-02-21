# Database Guidance

## 1. Package Identity
- **Scope**: Database Schema, Connection, and Migrations.
- **Tech**: Drizzle ORM, SQLite (LibSQL/Turso).

## 2. Setup & Run
- **Push Schema**: `npx drizzle-kit push` (Applies changes to DB)
- **Studio**: `npx drizzle-kit studio` (Visual DB editor)
- **Seed**: `npx tsx scripts/seed.ts`

## 3. Patterns & Conventions
- **Schema**: Define tables in `db/schema.ts`.
- **Types**: Infer types from schema using `typeof users.$inferSelect`.
- **Queries**: Use `db.select().from(table)...` pattern.

### File Examples
- ✅ **Table Definition**:
  ```typescript
  export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
  });
  ```
- ✅ **Connection**: `db/index.ts`

## 4. Touch Points
- **Schema**: `db/schema.ts` (Users, RedeemCodes)
- **Connection**: `db/index.ts`
- **Seed Script**: `scripts/seed.ts`

## 5. JIT Index Hints
- **Find Tables**: `rg "sqliteTable" db/schema.ts`
- **Find Relations**: `rg "relations\(" db/schema.ts`
