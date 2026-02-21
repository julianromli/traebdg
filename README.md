# TRAE PRO Redeem Landing Page

Landing page untuk redeem code TRAE PRO dengan sistem validasi aman dan responsif.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Turso (libSQL) via Drizzle ORM
- **Validation**: Zod & React Hook Form
- **Icons**: Lucide React

## Features
- **Responsive Design**: Mobile-first, modern dark theme.
- **Secure Redemption**:
  - IP Rate Limiting (1 submission per IP).
  - Unique Email & WhatsApp check.
  - Atomic code assignment.
- **User Friendly**:
  - Clear guide and benefits section.
  - Instant copy-to-clipboard for redeemed codes.
  - Success modal with animation.

## Local Development

1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd traebdg
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   - Create `.env` file based on `.env.example`.
   - Run migrations:
     ```bash
     npx drizzle-kit push
     ```
   - Seed data (ensure `docs/redeem-code-list.md` exists):
     ```bash
     npx tsx scripts/seed.ts
     ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `db/`: Database schema and connection.
- `lib/`: Utilities and validation schemas.
- `scripts/`: Helper scripts (seed, verify).
- `docs/`: Documentation and data files.
