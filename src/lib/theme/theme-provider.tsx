"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  type ThemeMode,
  type ThemeConfig,
  THEME_STORAGE_KEY,
  getSystemTheme,
  applyTheme,
  defaultThemeConfig,
  validateThemeConfig,
  ThemeValidationError,
} from "./theme-config";
import { ThemeContext } from "./theme-context";
import { loadThemeConfig } from "./theme-loader";

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme mode */
  defaultTheme?: ThemeMode;
  /** Storage key for localStorage */
  storageKey?: string;
  /** Custom theme configuration */
  customConfig?: ThemeConfig;
  /** Storage key for theme config in localStorage */
  configStorageKey?: string;
}

/**
 * ThemeProvider component that manages theme state and persistence
 *
 * Features:
 * - Theme persistence to localStorage
 * - System theme detection
 * - Automatic theme switching based on system preference
 * - Smooth transitions between themes
 * - Theme configuration customization and persistence
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
  customConfig,
  configStorageKey = "theme-config",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [config, setConfig] = useState<ThemeConfig>(
    customConfig || defaultThemeConfig
  );
  const [mounted, setMounted] = useState(false);

  // Get the resolved theme (accounts for system preference)
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Load theme and config from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as ThemeMode | null;
    if (
      stored &&
      (stored === "light" || stored === "dark" || stored === "system")
    ) {
      setThemeState(stored);
    }

    // Load custom config from localStorage if available
    try {
      const storedConfig = localStorage.getItem(configStorageKey);
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig) as ThemeConfig;
        validateThemeConfig(parsedConfig);
        setConfig(parsedConfig);
      }
    } catch (error) {
      console.error("Failed to load theme config from localStorage:", error);
      // Fall back to default or custom config
      setConfig(customConfig || defaultThemeConfig);
    }

    // Get initial system theme
    setSystemTheme(getSystemTheme());
    setMounted(true);
  }, [storageKey, configStorageKey, customConfig]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme and config to document
  useEffect(() => {
    if (!mounted) return;

    applyTheme(resolvedTheme);
    loadThemeConfig(config, resolvedTheme);
  }, [resolvedTheme, config, mounted]);

  // Set theme and persist to localStorage
  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);
    },
    [storageKey]
  );

  // Update theme config with validation and persistence
  const updateConfig = useCallback(
    (updates: Partial<ThemeConfig>) => {
      try {
        // Merge updates with current config
        const newConfig: ThemeConfig = {
          colors: {
            light: { ...config.colors.light, ...updates.colors?.light },
            dark: { ...config.colors.dark, ...updates.colors?.dark },
          },
          gradients: {
            light: { ...config.gradients.light, ...updates.gradients?.light },
            dark: { ...config.gradients.dark, ...updates.gradients?.dark },
          },
          shadows: {
            light: { ...config.shadows.light, ...updates.shadows?.light },
            dark: { ...config.shadows.dark, ...updates.shadows?.dark },
          },
          borderRadius: { ...config.borderRadius, ...updates.borderRadius },
        };

        // Validate the new config
        validateThemeConfig(newConfig);

        // Update state
        setConfig(newConfig);

        // Persist to localStorage
        localStorage.setItem(configStorageKey, JSON.stringify(newConfig));
      } catch (error) {
        if (error instanceof ThemeValidationError) {
          console.error("Theme config validation failed:", error.message);
          throw error;
        }
        console.error("Failed to update theme config:", error);
        throw new Error("Failed to update theme configuration");
      }
    },
    [config, configStorageKey]
  );

  // Reset config to default
  const resetConfig = useCallback(() => {
    const defaultConfig = customConfig || defaultThemeConfig;
    setConfig(defaultConfig);
    localStorage.removeItem(configStorageKey);
  }, [customConfig, configStorageKey]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        systemTheme,
        config,
        updateConfig,
        resetConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
