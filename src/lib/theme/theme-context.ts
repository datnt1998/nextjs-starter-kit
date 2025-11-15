"use client";

import { createContext } from "react";
import type { ThemeMode } from "./theme-config";

export interface ThemeContextValue {
  /** Current theme mode (light, dark, or system) */
  theme: ThemeMode;
  /** Set the theme mode */
  setTheme: (theme: ThemeMode) => void;
  /** The resolved theme (light or dark) - accounts for system preference when theme is "system" */
  resolvedTheme: "light" | "dark";
  /** The system's preferred theme */
  systemTheme: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
