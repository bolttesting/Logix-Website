/**
 * Merge class names (shadcn-style). Extend with clsx + tailwind-merge when Tailwind is added.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ')
}
