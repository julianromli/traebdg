# Deployment Guide

## Prerequisites
1. **Turso Database**: Create a database on [Turso](https://turso.tech/).
2. **Vercel Account**: For hosting the Next.js application.

## Database Setup
1. Create a database in Turso.
2. Get the Database URL and Auth Token.
3. Run migrations locally or in CI/CD:
   ```bash
   # Update .env with production credentials
   TURSO_DATABASE_URL=libsql://trae-bandung-code-faizintifada.aws-ap-northeast-1.turso.io
   TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzE2OTE1MDcsImlkIjoiNjA4MzY1NjctMzEyOS00ODZhLWE0MmMtNmNkOWE5Y2Q5YTYyIiwicmlkIjoiNDBmMDY5OTItYWQ2ZS00MjUzLWFjZGItNWRmMTA4NGI0MzBlIn0.FVtmOabDpo5GrC4d_bCtNPLNRLxtn3EoQ-4ykGQQ10HZxb29dPi-6pY0lwhx9ghUEPkaD1LEKcN8gHZfdza7Bw
   
   # Push schema
   npx drizzle-kit push
   ```
4. Seed the redeem codes:
   ```bash
   # Ensure docs/redeem-code-list.md exists and has codes
   npx tsx scripts/seed.ts
   ```

## Environment Variables
Set the following environment variables in Vercel:

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Connection URL (starts with `libsql://`) |
| `TURSO_AUTH_TOKEN` | Auth token for Turso |

## Deploying to Vercel
1. Push code to GitHub/GitLab/Bitbucket.
2. Import project in Vercel.
3. Configure Environment Variables.
4. Deploy.

## Post-Deployment
- Verify the site is accessible.
- Test one redemption flow.
- Monitor Vercel logs for any errors.
