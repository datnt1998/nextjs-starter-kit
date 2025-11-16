/**
 * Theme system exports
 */

export { ThemeProvider } from "./theme-provider";
export { ThemeContext, type ThemeContextValue } from "./theme-context";
export { useTheme } from "./use-theme";
export {
  type ThemeMode,
  type ThemeConfig,
  type GradientDefinition,
  type ShadowDefinition,
  type ColorScale,
  type ThemeColors,
  type ThemeGradients,
  type ThemeShadows,
  type BorderRadius,
  THEME_STORAGE_KEY,
  THEME_MODES,
  getSystemTheme,
  applyTheme,
  defaultThemeConfig,
  validateThemeConfig,
  ThemeValidationError,
} from "./theme-config";
export {
  loadThemeConfig,
  generateCssVariables,
  applyCssVariables,
  clearThemeVariables,
  getCssVariable,
  areThemeVariablesLoaded,
} from "./theme-loader";
