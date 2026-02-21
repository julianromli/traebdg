# Library & Utils Guidance

## 1. Package Identity
- **Scope**: Shared logic, validation schemas, and helper functions.
- **Tech**: Zod, clsx, tailwind-merge.

## 2. Patterns & Conventions
- **Validation**: Define Zod schemas here, NOT in components.
- **Utils**: Pure functions only.

### File Examples
- ✅ **Validation Schema** (`lib/validations.ts`):
  ```typescript
  export const userSchema = z.object({
    email: z.string().email(),
  });
  ```
- ✅ **Class Merger** (`lib/utils.ts`):
  ```typescript
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```

## 4. Touch Points
- **Schemas**: `lib/validations.ts`
- **Utils**: `lib/utils.ts`

## 5. JIT Index Hints
- **Find Zod Schemas**: `rg "z\.object" lib`
- **Find Utils**: `rg "export function" lib`
