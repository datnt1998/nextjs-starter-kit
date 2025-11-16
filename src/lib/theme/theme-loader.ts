/**
 * Theme configuration loader
 * Transforms theme config to CSS custom properties and applies them at runtime
 */

import type {
  ThemeConfig,
  GradientDefinition,
  ShadowDefinition,
  ColorScale,
} from "./theme-config";

/**
 * Convert gradient definition to CSS gradient string
 */
function gradientToCss(gradient: GradientDefinition): string {
  const stops = gradient.stops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  if (gradient.type === "linear") {
    const angle = gradient.angle ?? 135;
    return `linear-gradient(${angle}deg, ${stops})`;
  } else {
    return `radial-gradient(circle, ${stops})`;
  }
}

/**
 * Convert shadow definition to CSS box-shadow string
 */
function shadowToCss(shadow: ShadowDefinition): string {
  return shadow.layers
    .map((layer) => {
      const { offsetX, offsetY, blur, spread, color, opacity } = layer;
      // Parse RGB values from color string
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const [, r, g, b] = rgbMatch;
        return `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgb(${r} ${g} ${b} / ${opacity})`;
      }
      // Fallback for other color formats
      return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
    })
    .join(", ");
}

/**
 * Generate CSS custom properties from theme config
 */
export function generateCssVariables(
  config: ThemeConfig,
  mode: "light" | "dark"
): Record<string, string> {
  const variables: Record<string, string> = {};

  // Colors
  const colors = config.colors[mode];
  Object.entries(colors).forEach(([colorName, scale]) => {
    Object.entries(scale as ColorScale).forEach(([shade, value]) => {
      variables[`--color-${colorName}-${shade}`] = value;
    });
  });

  // Gradients
  const gradients = config.gradients[mode];
  Object.entries(gradients).forEach(([name, gradient]) => {
    // Store gradient stops
    gradient.stops.forEach((stop, index) => {
      variables[`--gradient-${name}-stop-${index}-color`] = stop.color;
      variables[`--gradient-${name}-stop-${index}-position`] =
        `${stop.position}%`;
    });

    // Store gradient angle
    if (gradient.type === "linear" && gradient.angle !== undefined) {
      variables[`--gradient-${name}-angle`] = `${gradient.angle}deg`;
    }

    // Store complete gradient
    variables[`--gradient-${name}`] = gradientToCss(gradient);
  });

  // Shadows
  const shadows = config.shadows[mode];

  // Basic shadows
  const basicShadows = ["xs", "sm", "md", "lg", "xl", "2xl", "inner"] as const;
  basicShadows.forEach((size) => {
    variables[`--shadow-${size}`] = shadowToCss(shadows[size]);
  });

  // Colored shadows
  const coloredShadows = ["primary", "success", "accent"] as const;
  coloredShadows.forEach((color) => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      variables[`--shadow-${color}-${size}`] = shadowToCss(
        shadows[color][size]
      );
    });
  });

  // Border radius (same for both modes)
  Object.entries(config.borderRadius).forEach(([size, value]) => {
    variables[`--radius-${size}`] = value;
  });

  return variables;
}

/**
 * Apply CSS variables to document root
 */
export function applyCssVariables(
  variables: Record<string, string>,
  root: HTMLElement = document.documentElement
): void {
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Load theme configuration and apply to document
 */
export function loadThemeConfig(
  config: ThemeConfig,
  mode: "light" | "dark"
): void {
  const variables = generateCssVariables(config, mode);
  applyCssVariables(variables);
}

/**
 * Remove all theme CSS variables from document
 */
export function clearThemeVariables(
  root: HTMLElement = document.documentElement
): void {
  const style = root.style;
  const propertiesToRemove: string[] = [];

  // Collect all custom properties that start with our prefixes
  for (let i = 0; i < style.length; i++) {
    const property = style[i];
    if (
      property.startsWith("--color-") ||
      property.startsWith("--gradient-") ||
      property.startsWith("--shadow-") ||
      property.startsWith("--radius-")
    ) {
      propertiesToRemove.push(property);
    }
  }

  // Remove collected properties
  propertiesToRemove.forEach((property) => {
    root.style.removeProperty(property);
  });
}

/**
 * Get current CSS variable value
 */
export function getCssVariable(
  name: string,
  root: HTMLElement = document.documentElement
): string {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

/**
 * Check if theme variables are loaded
 */
export function areThemeVariablesLoaded(
  root: HTMLElement = document.documentElement
): boolean {
  // Check for a few key variables
  const testVariables = [
    "--color-primary-500",
    "--gradient-primary",
    "--shadow-md",
    "--radius-md",
  ];

  return testVariables.every((variable) => {
    const value = getCssVariable(variable, root);
    return value !== "";
  });
}
