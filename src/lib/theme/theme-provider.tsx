"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  type ThemeMode,
  THEME_STORAGE_KEY,
  getSystemTheme,
  applyTheme,
} from "./theme-config";
import { ThemeContext } from "./theme-context";

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme mode */
  defaultTheme?: ThemeMode;
  /** Storage key for localStorage */
  storageKey?: string;
}

/**
 * ThemeProvider component that manages theme state and persistence
 *
 * Features:
 * - Theme persistence to localStorage
 * - System theme detection
 * - Automatic theme switching based on system preference
 * - Smooth transitions between themes
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Get the resolved theme (accounts for system preference)
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as ThemeMode | null;
    if (
      stored &&
      (stored === "light" || stored === "dark" || stored === "system")
    ) {
      setThemeState(stored);
    }

    // Get initial system theme
    setSystemTheme(getSystemTheme());
    setMounted(true);
  }, [storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    applyTheme(resolvedTheme);
  }, [resolvedTheme, mounted]);

  // Set theme and persist to localStorage
  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);
    },
    [storageKey]
  );

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
