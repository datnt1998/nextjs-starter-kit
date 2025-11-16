# Theme System

A comprehensive theme system for Next.js with support for light/dark modes, custom configurations, and runtime theme customization.

## Features

- 🎨 **Light & Dark Modes**: Automatic theme switching with system preference detection
- 🔧 **Customizable**: Modify colors, gradients, shadows, and border radius
- 💾 **Persistent**: Theme preferences and customizations saved to localStorage
- 🎯 **Type-Safe**: Full TypeScript support with validated configurations
- ⚡ **Runtime Updates**: Apply theme changes without rebuilding
- 🎭 **CSS Variables**: Uses CSS custom properties for dynamic theming

## Quick Start

### Basic Usage

```tsx
import { ThemeProvider } from "@/lib/theme";

export default function App({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
```

### Using the Theme Hook

```tsx
"use client";

import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {resolvedTheme}
    </button>
  );
}
```

## Theme Configuration

### Default Configuration

The theme system comes with a comprehensive default configuration including:

- **Colors**: 8 color scales (primary, secondary, neutral, success, warning, error, info, accent)
- **Gradients**: 5 gradient presets (primary, secondary, success, accent, hero)
- **Shadows**: Multi-layered shadows with colored variants
- **Border Radius**: 8 size options from none to full

### Customizing the Theme

#### Option 1: Provide Custom Config to Provider

```tsx
import { ThemeProvider, defaultThemeConfig } from "@/lib/theme";

const customConfig = {
  ...defaultThemeConfig,
  gradients: {
    light: {
      ...defaultThemeConfig.gradients.light,
      primary: {
        type: "linear",
        angle: 90,
        stops: [
          { color: "rgb(255, 0, 0)", position: 0 },
          { color: "rgb(0, 0, 255)", position: 100 },
        ],
      },
    },
    dark: {
      // ... dark mode gradients
    },
  },
};

export default function App({ children }) {
  return <ThemeProvider customConfig={customConfig}>{children}</ThemeProvider>;
}
```

#### Option 2: Runtime Updates

```tsx
"use client";

import { useTheme } from "@/lib/theme";

export function ThemeCustomizer() {
  const { config, updateConfig } = useTheme();

  const changePrimaryGradient = () => {
    updateConfig({
      gradients: {
        light: {
          ...config.gradients.light,
          primary: {
            type: "linear",
            angle: 45,
            stops: [
              { color: "rgb(255, 100, 100)", position: 0 },
              { color: "rgb(100, 100, 255)", position: 100 },
            ],
          },
        },
      },
    });
  };

  return (
    <button onClick={changePrimaryGradient}>Change Primary Gradient</button>
  );
}
```

## Theme Configuration Structure

### Colors

Each color has 11 shades (50-950):

```typescript
{
  colors: {
    light: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        // ... through 950
      },
      // ... other colors
    },
    dark: {
      // ... dark mode colors
    }
  }
}
```

### Gradients

Gradients support linear and radial types:

```typescript
{
  gradients: {
    light: {
      primary: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "rgb(59, 130, 246)", position: 0 },
          { color: "rgb(147, 51, 234)", position: 100 }
        ]
      }
    }
  }
}
```

### Shadows

Multi-layered shadows for depth:

```typescript
{
  shadows: {
    light: {
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
        ];
      }
    }
  }
}
```

### Border Radius

Consistent border radius values:

```typescript
{
  borderRadius: {
    none: "0px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px"
  }
}
```

## Theme Preview Tool

Visit `/theme-preview` to see a visual preview of all theme colors, gradients, shadows, and components with the current theme configuration.

## API Reference

### ThemeProvider Props

| Prop               | Type                            | Default              | Description                     |
| ------------------ | ------------------------------- | -------------------- | ------------------------------- |
| `defaultTheme`     | `"light" \| "dark" \| "system"` | `"system"`           | Initial theme mode              |
| `storageKey`       | `string`                        | `"theme-mode"`       | localStorage key for theme mode |
| `customConfig`     | `ThemeConfig`                   | `defaultThemeConfig` | Custom theme configuration      |
| `configStorageKey` | `string`                        | `"theme-config"`     | localStorage key for config     |

### useTheme Hook

Returns:

```typescript
{
  theme: ThemeMode;                    // Current theme mode
  setTheme: (theme: ThemeMode) => void; // Set theme mode
  resolvedTheme: "light" | "dark";     // Actual theme (resolves "system")
  systemTheme: "light" | "dark";       // System preference
  config: ThemeConfig;                 // Current theme config
  updateConfig: (updates: Partial<ThemeConfig>) => void; // Update config
  resetConfig: () => void;             // Reset to default
}
```

## Validation

The theme system includes comprehensive validation:

- Color format validation (hex, rgb, rgba)
- Gradient angle validation (0-360)
- Shadow opacity validation (0-1)
- Border radius format validation

Invalid configurations will throw `ThemeValidationError` with descriptive messages.

## CSS Variables

The theme system generates CSS custom properties that can be used directly:

```css
/* Colors */
var(--color-primary-500)
var(--color-success-600)

/* Gradients */
var(--gradient-primary)
var(--gradient-success)

/* Shadows */
var(--shadow-md)
var(--shadow-primary-lg)

/* Border Radius */
var(--radius-lg)
var(--radius-2xl)
```

## Advanced Usage

### Loading Theme Config Manually

```typescript
import { loadThemeConfig, defaultThemeConfig } from "@/lib/theme";

// Load theme config and apply to document
loadThemeConfig(defaultThemeConfig, "light");
```

### Generating CSS Variables

```typescript
import { generateCssVariables } from "@/lib/theme";

const variables = generateCssVariables(config, "light");
// Returns: { "--color-primary-500": "#3b82f6", ... }
```

### Checking if Theme is Loaded

```typescript
import { areThemeVariablesLoaded } from "@/lib/theme";

if (areThemeVariablesLoaded()) {
  console.log("Theme is ready!");
}
```

## Best Practices

1. **Use the Provider**: Always wrap your app with `ThemeProvider`
2. **Validate Configs**: Use `validateThemeConfig` before applying custom configs
3. **Persist Carefully**: Be mindful of localStorage size when storing large configs
4. **Test Both Modes**: Always test your customizations in both light and dark modes
5. **Use Type Safety**: Leverage TypeScript types for configuration

## Troubleshooting

### Theme not applying

- Ensure `ThemeProvider` wraps your app
- Check browser console for validation errors
- Verify CSS variables are loaded with `areThemeVariablesLoaded()`

### Custom config not persisting

- Check localStorage quota
- Verify `configStorageKey` is unique
- Ensure config passes validation

### Colors look wrong

- Verify color format (hex, rgb, rgba)
- Check if dark mode overrides are correct
- Test with default config first
