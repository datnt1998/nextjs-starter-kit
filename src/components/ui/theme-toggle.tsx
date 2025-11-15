"use client";

import React from "react";
import { useTheme } from "@/lib/theme/use-theme";
import type { ThemeMode } from "@/lib/theme/theme-config";

interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * ThemeToggle component for switching between light, dark, and system themes
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={() => handleThemeChange("light")}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          theme === "light"
            ? "bg-primary-600 text-white"
            : "bg-muted text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700"
        }`}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>

      <button
        onClick={() => handleThemeChange("dark")}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          theme === "dark"
            ? "bg-primary-600 text-white"
            : "bg-muted text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700"
        }`}
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <button
        onClick={() => handleThemeChange("system")}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          theme === "system"
            ? "bg-primary-600 text-white"
            : "bg-muted text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700"
        }`}
        aria-label="System theme"
        aria-pressed={theme === "system"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </button>
    </div>
  );
}
