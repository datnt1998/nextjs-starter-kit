"use client";

import { useContext } from "react";
import { ThemeContext } from "./theme-context";

/**
 * Hook to access and control the application theme.
 *
 * Provides access to the current theme state and methods to update it.
 * The theme is persisted to localStorage and synchronized across tabs.
 * Supports light, dark, and system preference modes.
 *
 * @returns Theme context object with current theme state and setter
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * // Basic theme toggle
 * function ThemeToggle() {
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 *
 *   return (
 *     <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *       Current: {resolvedTheme}
 *     </button>
 *   );
 * }
 *
 * @example
 * // System preference option
 * function ThemeSelector() {
 *   const { theme, setTheme } = useTheme();
 *
 *   return (
 *     <select value={theme} onChange={(e) => setTheme(e.target.value)}>
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *       <option value="system">System</option>
 *     </select>
 *   );
 * }
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
