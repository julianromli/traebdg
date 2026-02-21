# App Directory Guidance

## 1. Package Identity
- **Scope**: Next.js App Router (Routes, Layouts, Loading UI, Server Actions).
- **Tech**: Next.js 16, React Server Components (RSC).

## 2. Key Commands
- **Create Route**: New folder `app/route-name/page.tsx`.
- **Server Action**: Add to `app/actions.ts` (or specific file with `"use server"`).

## 3. Patterns & Conventions
- **RSC Default**: All components are Server Components unless `"use client"` is at the top.
- **Data Fetching**: Fetch directly in `page.tsx` or `layout.tsx` (async components).
- **Mutations**: Use Server Actions (`app/actions.ts`) invoked by Client Components.

### File Examples
- ✅ **Page**: `app/page.tsx` (Async component)
- ✅ **Layout**: `app/layout.tsx` (Root layout with `<html>`)
- ✅ **Server Action**: `app/actions.ts`
  ```typescript
  "use server";
  import { db } from "@/db";
  export async function myAction(formData: FormData) { ... }
  ```

## 4. Touch Points
- **Main Actions**: `app/actions.ts` (Redeem logic)
- **Root Layout**: `app/layout.tsx` (Fonts, metadata, global providers)
- **Global CSS**: `app/globals.css` (Tailwind imports)

## 5. JIT Index Hints
- **Find Actions**: `rg "export async function" app/actions.ts`
- **Find Metadata**: `rg "export const metadata" app`
- **Find Client Components**: `rg "\"use client\"" app`

## 6. Common Gotchas
- **Async/Await**: Page components must be `async` if fetching data.
- **Interactivity**: You CANNOT use hooks (`useState`, `useEffect`) in RSC. Move logic to a component in `components/` with `"use client"`.
