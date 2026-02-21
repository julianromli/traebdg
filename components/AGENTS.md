# Components Guidance

## 1. Package Identity
- **Scope**: Reusable UI components (Forms, Modals, Layout parts).
- **Tech**: React 19, Tailwind CSS, Framer Motion, Lucide React.

## 2. Patterns & Conventions
- **Naming**: PascalCase filenames (e.g., `RedeemForm.tsx`).
- **Client Components**: Add `"use client"` if using hooks or event listeners.
- **Styling**: Use `cn()` helper to merge classes.

### Code Examples
- ✅ **Component Structure**:
  ```tsx
  import { cn } from "@/lib/utils";
  
  export function Button({ className, ...props }: ButtonProps) {
    return <button className={cn("bg-blue-500", className)} {...props} />;
  }
  ```
- ❌ **Avoid**: Hardcoded colors outside of Tailwind classes.

## 4. Touch Points
- **Forms**: `components/RedeemForm.tsx` (React Hook Form + Zod)
- **Modals**: `components/RedeemModal.tsx`
- **Layout Parts**: `components/Navbar.tsx`, `components/Footer.tsx`

## 5. JIT Index Hints
- **Find Forms**: `rg "useForm" components`
- **Find Framer Motion**: `rg "motion\." components`
- **Find Lucide Icons**: `rg "lucide-react" components`
