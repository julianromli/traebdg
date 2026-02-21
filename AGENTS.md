# Root Guidance

## 1. Project Snapshot
- **Type**: Single Next.js 16 Project (App Router)
- **Stack**: React 19, TypeScript, Tailwind CSS v4, Drizzle ORM (LibSQL/SQLite)
- **State**: Server Actions for mutations, React Hook Form for client state
- **Sub-Guides**: See `app/`, `components/`, and `db/` for specific patterns.

## 2. Root Setup Commands
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **DB Push**: `npx drizzle-kit push` (sync schema to DB)
- **DB Seed**: `npx tsx scripts/seed.ts`

## 3. Universal Conventions
- **Style**: TypeScript Strict. Functional components only.
- **Styling**: Tailwind CSS via `className`. Use `cn()` for conditional classes.
- **Imports**: Use `@/` alias for root (e.g., `@/components/Button`).
- **Commits**: Conventional Commits (feat, fix, chore, docs).

## 4. Security & Secrets
- **Env**: `.env` for secrets. NEVER commit `.env`.
- **Validation**: ALL inputs must be validated with Zod (`lib/validations.ts`).
- **Database**: Use parameterized queries via Drizzle (automated).

## 5. JIT Index (Directory Map)

### Core Structure
- **Routes & Actions**: `app/` → [see app/AGENTS.md](app/AGENTS.md)
- **UI Components**: `components/` → [see components/AGENTS.md](components/AGENTS.md)
- **Database**: `db/` → [see db/AGENTS.md](db/AGENTS.md)
- **Utils/Zod**: `lib/` → [see lib/AGENTS.md](lib/AGENTS.md)

### Quick Find Commands
- **Find Page**: `rg "export default function Page" app`
- **Find Action**: `rg "use server" app`
- **Find Schema**: `rg "export const .* = sqliteTable" db`
- **Find Component**: `rg "export (default )?function [A-Z]" components`

## 6. Definition of Done
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] No strict type errors
