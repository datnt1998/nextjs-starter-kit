import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string, handling Tailwind CSS conflicts.
 *
 * This utility combines clsx for conditional class names and tailwind-merge to resolve
 * conflicting Tailwind classes. When multiple Tailwind classes target the same property,
 * only the last one is kept.
 *
 * @param inputs - Class names to merge. Can be strings, objects, arrays, or undefined/null
 * @returns A single string with merged class names
 *
 * @example
 * // Basic usage
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 *
 * @example
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', { 'error': hasError })
 *
 * @example
 * // Component usage
 * <div className={cn('default-styles', className)} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
