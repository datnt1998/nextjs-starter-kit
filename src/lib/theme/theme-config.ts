/**
 * Theme configuration and constants
 */

export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme-mode";

export const THEME_MODES: ThemeMode[] = ["light", "dark", "system"];

/**
 * Get the system theme preference
 */
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: "light" | "dark"): void {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}
