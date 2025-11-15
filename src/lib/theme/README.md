# Theme System

A comprehensive theme system for NextJS with support for light, dark, and system themes.

## Features

- ✅ Theme persistence to localStorage
- ✅ System theme detection and automatic switching
- ✅ Smooth transitions between themes (0.3s ease)
- ✅ Support for light, dark, and system modes
- ✅ No flash of unstyled content (FOUC)
- ✅ TypeScript support with full type safety
- ✅ React Context API for theme state management
- ✅ Custom hook (useTheme) for easy access

## Usage

### 1. Wrap your app with ThemeProvider

The ThemeProvider is already set up in `src/app/layout.tsx`:

```tsx
import { ThemeProvider } from "@/lib/theme/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Use the useTheme hook

Access and update the theme from any component:

```tsx
"use client";

import { useTheme } from "@/lib/theme/use-theme";

export function MyComponent() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
```

### 3. Use the ThemeToggle component

A pre-built component for theme switching:

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## API Reference

### ThemeProvider Props

| Prop           | Type                            | Default        | Description                      |
| -------------- | ------------------------------- | -------------- | -------------------------------- |
| `children`     | `ReactNode`                     | -              | Child components                 |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"`     | Default theme mode               |
| `storageKey`   | `string`                        | `"theme-mode"` | localStorage key for persistence |

### useTheme Return Value

| Property        | Type                            | Description                                            |
| --------------- | ------------------------------- | ------------------------------------------------------ |
| `theme`         | `"light" \| "dark" \| "system"` | Current theme mode                                     |
| `setTheme`      | `(theme: ThemeMode) => void`    | Function to update theme                               |
| `resolvedTheme` | `"light" \| "dark"`             | Actual theme applied (resolves "system" to light/dark) |
| `systemTheme`   | `"light" \| "dark"`             | System's preferred theme                               |

## How It Works

### Theme Persistence

The theme preference is saved to localStorage with the key `theme-mode`. On page load, the theme is restored from localStorage.

### System Theme Detection

The system theme is detected using the `prefers-color-scheme` media query. When the theme is set to "system", the component automatically switches between light and dark based on the system preference.

### FOUC Prevention

A script in the `<head>` tag applies the theme class before the page renders, preventing a flash of unstyled content:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          const theme = localStorage.getItem('theme-mode') || 'system';
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          const resolvedTheme = theme === 'system' ? systemTheme : theme;
          if (resolvedTheme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        } catch (e) {}
      })();
    `,
  }}
/>
```

### Smooth Transitions

CSS transitions are applied to the `html` and `body` elements for smooth theme switching:

```css
html {
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## Customization

### Custom Storage Key

```tsx
<ThemeProvider storageKey="my-custom-theme-key">{children}</ThemeProvider>
```

### Custom Default Theme

```tsx
<ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
```

## Demo

Visit `/theme-demo` to see a comprehensive demonstration of the theme system with all color palettes, typography, and features.
