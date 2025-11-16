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

// ============================================================================
// Theme Configuration Types
// ============================================================================

/**
 * Gradient stop definition with color and position
 */
export interface GradientStop {
  color: string;
  position: number; // 0-100
}

/**
 * Gradient definition with type, angle, and color stops
 */
export interface GradientDefinition {
  type: "linear" | "radial";
  angle?: number; // for linear gradients (0-360)
  stops: GradientStop[];
}

/**
 * Collection of theme gradients
 */
export interface ThemeGradients {
  primary: GradientDefinition;
  secondary: GradientDefinition;
  success: GradientDefinition;
  accent: GradientDefinition;
  hero: GradientDefinition;
}

/**
 * Color scale from 50 to 950
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Theme color palette
 */
export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  accent: ColorScale;
}

/**
 * Shadow layer definition
 */
export interface ShadowLayer {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

/**
 * Shadow definition with multiple layers
 */
export interface ShadowDefinition {
  layers: ShadowLayer[];
}

/**
 * Colored shadow variants
 */
export interface ColoredShadowVariants {
  sm: ShadowDefinition;
  md: ShadowDefinition;
  lg: ShadowDefinition;
}

/**
 * Complete shadow system
 */
export interface ThemeShadows {
  xs: ShadowDefinition;
  sm: ShadowDefinition;
  md: ShadowDefinition;
  lg: ShadowDefinition;
  xl: ShadowDefinition;
  "2xl": ShadowDefinition;
  inner: ShadowDefinition;
  // Colored shadows
  primary: ColoredShadowVariants;
  success: ColoredShadowVariants;
  accent: ColoredShadowVariants;
}

/**
 * Border radius configuration
 */
export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  full: string;
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  gradients: {
    light: ThemeGradients;
    dark: ThemeGradients;
  };
  shadows: {
    light: ThemeShadows;
    dark: ThemeShadows;
  };
  borderRadius: BorderRadius;
}

// ============================================================================
// Default Theme Configuration
// ============================================================================

/**
 * Default theme configuration with modern design values
 */
export const defaultThemeConfig: ThemeConfig = {
  colors: {
    light: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554",
      },
      secondary: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764",
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a",
      },
      success: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16",
      },
      warning: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03",
      },
      error: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
      info: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49",
      },
      accent: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407",
      },
    },
    dark: {
      primary: {
        50: "#172554",
        100: "#1e3a8a",
        200: "#1e40af",
        300: "#1d4ed8",
        400: "#2563eb",
        500: "#3b82f6",
        600: "#60a5fa",
        700: "#93c5fd",
        800: "#bfdbfe",
        900: "#dbeafe",
        950: "#eff6ff",
      },
      secondary: {
        50: "#3b0764",
        100: "#581c87",
        200: "#6b21a8",
        300: "#7e22ce",
        400: "#9333ea",
        500: "#a855f7",
        600: "#c084fc",
        700: "#d8b4fe",
        800: "#e9d5ff",
        900: "#f3e8ff",
        950: "#faf5ff",
      },
      neutral: {
        50: "#0a0a0a",
        100: "#171717",
        200: "#262626",
        300: "#404040",
        400: "#525252",
        500: "#737373",
        600: "#a3a3a3",
        700: "#d4d4d4",
        800: "#e5e5e5",
        900: "#f5f5f5",
        950: "#fafafa",
      },
      success: {
        50: "#052e16",
        100: "#14532d",
        200: "#166534",
        300: "#15803d",
        400: "#16a34a",
        500: "#22c55e",
        600: "#4ade80",
        700: "#86efac",
        800: "#bbf7d0",
        900: "#dcfce7",
        950: "#f0fdf4",
      },
      warning: {
        50: "#451a03",
        100: "#78350f",
        200: "#92400e",
        300: "#b45309",
        400: "#d97706",
        500: "#f59e0b",
        600: "#fbbf24",
        700: "#fcd34d",
        800: "#fde68a",
        900: "#fef3c7",
        950: "#fffbeb",
      },
      error: {
        50: "#450a0a",
        100: "#7f1d1d",
        200: "#991b1b",
        300: "#b91c1c",
        400: "#dc2626",
        500: "#ef4444",
        600: "#f87171",
        700: "#fca5a5",
        800: "#fecaca",
        900: "#fee2e2",
        950: "#fef2f2",
      },
      info: {
        50: "#082f49",
        100: "#0c4a6e",
        200: "#075985",
        300: "#0369a1",
        400: "#0284c7",
        500: "#0ea5e9",
        600: "#38bdf8",
        700: "#7dd3fc",
        800: "#bae6fd",
        900: "#e0f2fe",
        950: "#f0f9ff",
      },
      accent: {
        50: "#431407",
        100: "#7c2d12",
        200: "#9a3412",
        300: "#c2410c",
        400: "#ea580c",
        500: "#f97316",
        600: "#fb923c",
        700: "#fdba74",
        800: "#fed7aa",
        900: "#ffedd5",
        950: "#fff7ed",
      },
    },
  },
  gradients: {
    light: {
      primary: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(59, 130, 246)", position: 0 }, // blue-500
          { color: "rgb(147, 51, 234)", position: 100 }, // purple-600
        ],
      },
      secondary: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(168, 85, 247)", position: 0 }, // purple-500
          { color: "rgb(236, 72, 153)", position: 100 }, // pink-500
        ],
      },
      success: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(34, 197, 94)", position: 0 }, // green-500
          { color: "rgb(20, 184, 166)", position: 100 }, // teal-600
        ],
      },
      accent: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(249, 115, 22)", position: 0 }, // orange-500
          { color: "rgb(239, 68, 68)", position: 100 }, // red-500
        ],
      },
      hero: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(59, 130, 246)", position: 0 }, // blue-500
          { color: "rgb(147, 51, 234)", position: 50 }, // purple-600
          { color: "rgb(236, 72, 153)", position: 100 }, // pink-500
        ],
      },
    },
    dark: {
      primary: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(96, 165, 250)", position: 0 }, // blue-400
          { color: "rgb(168, 85, 247)", position: 100 }, // purple-500
        ],
      },
      secondary: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(192, 132, 252)", position: 0 }, // purple-400
          { color: "rgb(244, 114, 182)", position: 100 }, // pink-400
        ],
      },
      success: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(74, 222, 128)", position: 0 }, // green-400
          { color: "rgb(45, 212, 191)", position: 100 }, // teal-400
        ],
      },
      accent: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(251, 146, 60)", position: 0 }, // orange-400
          { color: "rgb(248, 113, 113)", position: 100 }, // red-400
        ],
      },
      hero: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(96, 165, 250)", position: 0 }, // blue-400
          { color: "rgb(168, 85, 247)", position: 50 }, // purple-500
          { color: "rgb(244, 114, 182)", position: 100 }, // pink-400
        ],
      },
    },
  },
  shadows: {
    light: {
      xs: {
        layers: [
          {
            offsetX: 0,
            offsetY: 1,
            blur: 2,
            spread: 0,
            color: "rgb(0, 0, 0)",
            opacity: 0.05,
          },
        ],
      },
      sm: {
        layers: [
          {
            offsetX: 0,
            offsetY: 1,
            blur: 3,
            spread: 0,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
          {
            offsetX: 0,
            offsetY: 1,
            blur: 2,
            spread: -1,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
        ],
      },
      md: {
        layers: [
          {
            offsetX: 0,
            offsetY: 4,
            blur: 6,
            spread: -1,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
          {
            offsetX: 0,
            offsetY: 2,
            blur: 4,
            spread: -2,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
        ],
      },
      lg: {
        layers: [
          {
            offsetX: 0,
            offsetY: 10,
            blur: 15,
            spread: -3,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
          {
            offsetX: 0,
            offsetY: 4,
            blur: 6,
            spread: -4,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
        ],
      },
      xl: {
        layers: [
          {
            offsetX: 0,
            offsetY: 20,
            blur: 25,
            spread: -5,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
          {
            offsetX: 0,
            offsetY: 8,
            blur: 10,
            spread: -6,
            color: "rgb(0, 0, 0)",
            opacity: 0.1,
          },
        ],
      },
      "2xl": {
        layers: [
          {
            offsetX: 0,
            offsetY: 25,
            blur: 50,
            spread: -12,
            color: "rgb(0, 0, 0)",
            opacity: 0.25,
          },
        ],
      },
      inner: {
        layers: [
          {
            offsetX: 0,
            offsetY: 2,
            blur: 4,
            spread: 0,
            color: "rgb(0, 0, 0)",
            opacity: 0.05,
          },
        ],
      },
      primary: {
        sm: {
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -1,
              color: "rgb(59, 130, 246)",
              opacity: 0.15,
            },
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: -1,
              color: "rgb(59, 130, 246)",
              opacity: 0.1,
            },
          ],
        },
        md: {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -2,
              color: "rgb(59, 130, 246)",
              opacity: 0.2,
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -2,
              color: "rgb(59, 130, 246)",
              opacity: 0.15,
            },
          ],
        },
        lg: {
          layers: [
            {
              offsetX: 0,
              offsetY: 12,
              blur: 24,
              spread: -4,
              color: "rgb(59, 130, 246)",
              opacity: 0.25,
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -4,
              color: "rgb(59, 130, 246)",
              opacity: 0.15,
            },
          ],
        },
      },
      success: {
        sm: {
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -1,
              color: "rgb(34, 197, 94)",
              opacity: 0.15,
            },
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: -1,
              color: "rgb(34, 197, 94)",
              opacity: 0.1,
            },
          ],
        },
        md: {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -2,
              color: "rgb(34, 197, 94)",
              opacity: 0.2,
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -2,
              color: "rgb(34, 197, 94)",
              opacity: 0.15,
            },
          ],
        },
        lg: {
          layers: [
            {
              offsetX: 0,
              offsetY: 12,
              blur: 24,
              spread: -4,
              color: "rgb(34, 197, 94)",
              opacity: 0.25,
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -4,
              color: "rgb(34, 197, 94)",
              opacity: 0.15,
            },
          ],
        },
      },
      accent: {
        sm: {
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -1,
              color: "rgb(249, 115, 22)",
              opacity: 0.15,
            },
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: -1,
              color: "rgb(249, 115, 22)",
              opacity: 0.1,
            },
          ],
        },
        md: {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -2,
              color: "rgb(249, 115, 22)",
              opacity: 0.2,
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -2,
              color: "rgb(249, 115, 22)",
              opacity: 0.15,
            },
          ],
        },
        lg: {
          layers: [
            {
              offsetX: 0,
              offsetY: 12,
              blur: 24,
              spread: -4,
              color: "rgb(249, 115, 22)",
              opacity: 0.25,
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -4,
              color: "rgb(249, 115, 22)",
              opacity: 0.15,
            },
          ],
        },
      },
    },
    dark: {
      xs: {
        layers: [
          {
            offsetX: 0,
            offsetY: 1,
            blur: 2,
            spread: 0,
            color: "rgb(0, 0, 0)",
            opacity: 0.3,
          },
        ],
      },
      sm: {
        layers: [
          {
            offsetX: 0,
            offsetY: 1,
            blur: 3,
            spread: 0,
            color: "rgb(0, 0, 0)",
            opacity: 0.3,
          },
          {
            offsetX: 0,
            offsetY: 1,
            blur: 2,
            spread: -1,
            color: "rgb(0, 0, 0)",
            opacity: 0.3,
          },
        ],
      },
      md: {
        layers: [
          {
            offsetX: 0,
            offsetY: 4,
            blur: 6,
            spread: -1,
            color: "rgb(0, 0, 0)",
            opacity: 0.4,
          },
          {
            offsetX: 0,
            offsetY: 2,
            blur: 4,
            spread: -2,
            color: "rgb(0, 0, 0)",
            opacity: 0.4,
          },
        ],
      },
      lg: {
        layers: [
          {
            offsetX: 0,
            offsetY: 10,
            blur: 15,
            spread: -3,
            color: "rgb(0, 0, 0)",
            opacity: 0.5,
          },
          {
            offsetX: 0,
            offsetY: 4,
            blur: 6,
            spread: -4,
            color: "rgb(0, 0, 0)",
            opacity: 0.4,
          },
        ],
      },
      xl: {
        layers: [
          {
            offsetX: 0,
            offsetY: 20,
            blur: 25,
            spread: -5,
            color: "rgb(0, 0, 0)",
            opacity: 0.6,
          },
          {
            offsetX: 0,
            offsetY: 8,
            blur: 10,
            spread: -6,
            color: "rgb(0, 0, 0)",
            opacity: 0.5,
          },
        ],
      },
      "2xl": {
        layers: [
          {
            offsetX: 0,
            offsetY: 25,
            blur: 50,
            spread: -12,
            color: "rgb(0, 0, 0)",
            opacity: 0.7,
          },
        ],
      },
      inner: {
        layers: [
          {
            offsetX: 0,
            offsetY: 2,
            blur: 4,
            spread: 0,
            color: "rgb(0, 0, 0)",
            opacity: 0.3,
          },
        ],
      },
      primary: {
        sm: {
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -1,
              color: "rgb(96, 165, 250)",
              opacity: 0.2,
            },
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: -1,
              color: "rgb(96, 165, 250)",
              opacity: 0.15,
            },
          ],
        },
        md: {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -2,
              color: "rgb(96, 165, 250)",
              opacity: 0.25,
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -2,
              color: "rgb(96, 165, 250)",
              opacity: 0.2,
            },
          ],
        },
        lg: {
          layers: [
            {
              offsetX: 0,
              offsetY: 12,
              blur: 24,
              spread: -4,
              color: "rgb(96, 165, 250)",
              opacity: 0.3,
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -4,
              color: "rgb(96, 165, 250)",
              opacity: 0.2,
            },
          ],
        },
      },
      success: {
        sm: {
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -1,
              color: "rgb(74, 222, 128)",
              opacity: 0.2,
            },
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: -1,
              color: "rgb(74, 222, 128)",
              opacity: 0.15,
            },
          ],
        },
        md: {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -2,
              color: "rgb(74, 222, 128)",
              opacity: 0.25,
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -2,
              color: "rgb(74, 222, 128)",
              opacity: 0.2,
            },
          ],
        },
        lg: {
          layers: [
            {
              offsetX: 0,
              offsetY: 12,
              blur: 24,
              spread: -4,
              color: "rgb(74, 222, 128)",
              opacity: 0.3,
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -4,
              color: "rgb(74, 222, 128)",
              opacity: 0.2,
            },
          ],
        },
      },
      accent: {
        sm: {
          layers: [
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -1,
              color: "rgb(251, 146, 60)",
              opacity: 0.2,
            },
            {
              offsetX: 0,
              offsetY: 1,
              blur: 2,
              spread: -1,
              color: "rgb(251, 146, 60)",
              opacity: 0.15,
            },
          ],
        },
        md: {
          layers: [
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -2,
              color: "rgb(251, 146, 60)",
              opacity: 0.25,
            },
            {
              offsetX: 0,
              offsetY: 2,
              blur: 4,
              spread: -2,
              color: "rgb(251, 146, 60)",
              opacity: 0.2,
            },
          ],
        },
        lg: {
          layers: [
            {
              offsetX: 0,
              offsetY: 12,
              blur: 24,
              spread: -4,
              color: "rgb(251, 146, 60)",
              opacity: 0.3,
            },
            {
              offsetX: 0,
              offsetY: 4,
              blur: 8,
              spread: -4,
              color: "rgb(251, 146, 60)",
              opacity: 0.2,
            },
          ],
        },
      },
    },
  },
  borderRadius: {
    none: "0px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px",
  },
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validation error class
 */
export class ThemeValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ThemeValidationError";
  }
}

/**
 * Validate hex color format
 */
function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validate RGB color format
 */
function isValidRgbColor(color: string): boolean {
  return /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color);
}

/**
 * Validate RGBA color format
 */
function isValidRgbaColor(color: string): boolean {
  return /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
    color
  );
}

/**
 * Validate color format (hex, rgb, or rgba)
 */
function isValidColor(color: string): boolean {
  return (
    isValidHexColor(color) || isValidRgbColor(color) || isValidRgbaColor(color)
  );
}

/**
 * Validate color scale
 */
function validateColorScale(scale: ColorScale, name: string): void {
  const requiredShades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];

  for (const shade of requiredShades) {
    const key = shade as
      | "50"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900"
      | "950";
    const color = scale[key];
    if (!color) {
      throw new ThemeValidationError(
        `Missing color shade ${shade} in ${name} color scale`
      );
    }
    if (!isValidColor(color)) {
      throw new ThemeValidationError(
        `Invalid color format for ${name}.${shade}: ${color}`
      );
    }
  }
}

/**
 * Validate theme colors
 */
function validateThemeColors(colors: ThemeColors, mode: string): void {
  const requiredColors = [
    "primary",
    "secondary",
    "neutral",
    "success",
    "warning",
    "error",
    "info",
    "accent",
  ];

  for (const colorName of requiredColors) {
    const colorScale = colors[colorName as keyof ThemeColors];
    if (!colorScale) {
      throw new ThemeValidationError(
        `Missing ${colorName} color in ${mode} theme`
      );
    }
    validateColorScale(colorScale, `${mode}.${colorName}`);
  }
}

/**
 * Validate gradient stop
 */
function validateGradientStop(stop: GradientStop, gradientName: string): void {
  if (!isValidColor(stop.color)) {
    throw new ThemeValidationError(
      `Invalid color format in ${gradientName} gradient: ${stop.color}`
    );
  }

  if (stop.position < 0 || stop.position > 100) {
    throw new ThemeValidationError(
      `Gradient stop position must be between 0 and 100 in ${gradientName}: ${stop.position}`
    );
  }
}

/**
 * Validate gradient definition
 */
function validateGradientDefinition(
  gradient: GradientDefinition,
  name: string
): void {
  if (!gradient.type || !["linear", "radial"].includes(gradient.type)) {
    throw new ThemeValidationError(
      `Invalid gradient type in ${name}: ${gradient.type}`
    );
  }

  if (gradient.type === "linear" && gradient.angle !== undefined) {
    if (gradient.angle < 0 || gradient.angle > 360) {
      throw new ThemeValidationError(
        `Gradient angle must be between 0 and 360 in ${name}: ${gradient.angle}`
      );
    }
  }

  if (!gradient.stops || gradient.stops.length < 2) {
    throw new ThemeValidationError(
      `Gradient must have at least 2 color stops in ${name}`
    );
  }

  gradient.stops.forEach((stop) => validateGradientStop(stop, name));
}

/**
 * Validate theme gradients
 */
function validateThemeGradients(gradients: ThemeGradients, mode: string): void {
  const requiredGradients = [
    "primary",
    "secondary",
    "success",
    "accent",
    "hero",
  ];

  for (const gradientName of requiredGradients) {
    const gradient = gradients[gradientName as keyof ThemeGradients];
    if (!gradient) {
      throw new ThemeValidationError(
        `Missing ${gradientName} gradient in ${mode} theme`
      );
    }
    validateGradientDefinition(gradient, `${mode}.${gradientName}`);
  }
}

/**
 * Validate shadow layer
 */
function validateShadowLayer(layer: ShadowLayer, shadowName: string): void {
  if (!isValidColor(layer.color)) {
    throw new ThemeValidationError(
      `Invalid color format in ${shadowName} shadow: ${layer.color}`
    );
  }

  if (layer.opacity < 0 || layer.opacity > 1) {
    throw new ThemeValidationError(
      `Shadow opacity must be between 0 and 1 in ${shadowName}: ${layer.opacity}`
    );
  }
}

/**
 * Validate shadow definition
 */
function validateShadowDefinition(
  shadow: ShadowDefinition,
  name: string
): void {
  if (!shadow.layers || shadow.layers.length === 0) {
    throw new ThemeValidationError(
      `Shadow must have at least 1 layer: ${name}`
    );
  }

  shadow.layers.forEach((layer) => validateShadowLayer(layer, name));
}

/**
 * Validate colored shadow variants
 */
function validateColoredShadowVariants(
  variants: ColoredShadowVariants,
  name: string
): void {
  const requiredSizes = ["sm", "md", "lg"];

  for (const size of requiredSizes) {
    const shadow = variants[size as keyof ColoredShadowVariants];
    if (!shadow) {
      throw new ThemeValidationError(
        `Missing ${size} size in ${name} colored shadow`
      );
    }
    validateShadowDefinition(shadow, `${name}.${size}`);
  }
}

/**
 * Validate theme shadows
 */
function validateThemeShadows(shadows: ThemeShadows, mode: string): void {
  const requiredShadows: Array<
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner"
  > = ["xs", "sm", "md", "lg", "xl", "2xl", "inner"];

  for (const shadowName of requiredShadows) {
    const shadow = shadows[shadowName];
    if (!shadow) {
      throw new ThemeValidationError(
        `Missing ${shadowName} shadow in ${mode} theme`
      );
    }
    validateShadowDefinition(shadow, `${mode}.${shadowName}`);
  }

  // Validate colored shadows
  const coloredShadows: Array<"primary" | "success" | "accent"> = [
    "primary",
    "success",
    "accent",
  ];
  for (const colorName of coloredShadows) {
    const coloredShadow = shadows[colorName];
    if (!coloredShadow) {
      throw new ThemeValidationError(
        `Missing ${colorName} colored shadow in ${mode} theme`
      );
    }
    validateColoredShadowVariants(coloredShadow, `${mode}.${colorName}`);
  }
}

/**
 * Validate border radius configuration
 */
function validateBorderRadius(borderRadius: BorderRadius): void {
  const requiredSizes = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];

  for (const size of requiredSizes) {
    const value = borderRadius[size as keyof BorderRadius];
    if (!value) {
      throw new ThemeValidationError(`Missing border radius size: ${size}`);
    }

    // Validate format (should be a valid CSS length or 9999px for full)
    if (!/^\d+px$/.test(value) && value !== "9999px") {
      throw new ThemeValidationError(
        `Invalid border radius format for ${size}: ${value}. Expected format: "Npx"`
      );
    }
  }

  // Validate specific values match requirements
  const expectedValues: Record<string, string> = {
    none: "0px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px",
  };

  for (const [size, expectedValue] of Object.entries(expectedValues)) {
    const actualValue = borderRadius[size as keyof BorderRadius];
    if (actualValue !== expectedValue) {
      throw new ThemeValidationError(
        `Border radius ${size} should be ${expectedValue}, got ${actualValue}`
      );
    }
  }
}

/**
 * Validate complete theme configuration
 */
export function validateThemeConfig(config: ThemeConfig): void {
  // Validate colors
  if (!config.colors) {
    throw new ThemeValidationError("Missing colors configuration");
  }
  if (!config.colors.light) {
    throw new ThemeValidationError("Missing light theme colors");
  }
  if (!config.colors.dark) {
    throw new ThemeValidationError("Missing dark theme colors");
  }
  validateThemeColors(config.colors.light, "light");
  validateThemeColors(config.colors.dark, "dark");

  // Validate gradients
  if (!config.gradients) {
    throw new ThemeValidationError("Missing gradients configuration");
  }
  if (!config.gradients.light) {
    throw new ThemeValidationError("Missing light theme gradients");
  }
  if (!config.gradients.dark) {
    throw new ThemeValidationError("Missing dark theme gradients");
  }
  validateThemeGradients(config.gradients.light, "light");
  validateThemeGradients(config.gradients.dark, "dark");

  // Validate shadows
  if (!config.shadows) {
    throw new ThemeValidationError("Missing shadows configuration");
  }
  if (!config.shadows.light) {
    throw new ThemeValidationError("Missing light theme shadows");
  }
  if (!config.shadows.dark) {
    throw new ThemeValidationError("Missing dark theme shadows");
  }
  validateThemeShadows(config.shadows.light, "light");
  validateThemeShadows(config.shadows.dark, "dark");

  // Validate border radius
  if (!config.borderRadius) {
    throw new ThemeValidationError("Missing border radius configuration");
  }
  validateBorderRadius(config.borderRadius);
}

/**
 * Validate and return theme config, throwing errors if invalid
 */
export function getValidatedThemeConfig(
  config: ThemeConfig = defaultThemeConfig
): ThemeConfig {
  validateThemeConfig(config);
  return config;
}
