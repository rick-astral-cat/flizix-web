import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes safely.
 * It prevents class conflicts (e.g., 'p-4 p-2' becomes 'p-2').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
