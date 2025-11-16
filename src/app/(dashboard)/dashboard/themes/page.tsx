"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/lib/theme/use-theme";

export default function ThemeDemoPage() {
  const { theme, resolvedTheme, systemTheme } = useTheme();

  return (
    <DashboardLayout>
      <Container size="2xl">
        <main className="min-h-screen">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Theme System Demo</h1>
              <p className="text-muted-foreground">
                Demonstrating the theme system with provider, hooks, and toggle
                component
              </p>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Theme Controls</h2>
              <ThemeToggle />

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>Current Theme Mode:</strong> {theme}
                </p>
                <p>
                  <strong>Resolved Theme:</strong> {resolvedTheme}
                </p>
                <p>
                  <strong>System Theme:</strong> {systemTheme}
                </p>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Color Palette</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Primary Colors</h3>
                  <div className="grid grid-cols-11 gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                      (shade) => (
                        <div key={shade} className="space-y-1">
                          <div
                            className={`h-12 rounded bg-primary-${shade} border border-border`}
                          />
                          <p className="text-xs text-center">{shade}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Secondary Colors</h3>
                  <div className="grid grid-cols-11 gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                      (shade) => (
                        <div key={shade} className="space-y-1">
                          <div
                            className={`h-12 rounded bg-secondary-${shade} border border-border`}
                          />
                          <p className="text-xs text-center">{shade}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Semantic Colors</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="h-12 rounded bg-success-500 border border-border" />
                      <p className="text-sm text-center">Success</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded bg-warning-500 border border-border" />
                      <p className="text-sm text-center">Warning</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded bg-error-500 border border-border" />
                      <p className="text-sm text-center">Error</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Typography</h2>
              <div className="space-y-2">
                <p className="text-5xl font-bold">Heading 1</p>
                <p className="text-4xl font-bold">Heading 2</p>
                <p className="text-3xl font-semibold">Heading 3</p>
                <p className="text-2xl font-semibold">Heading 4</p>
                <p className="text-xl font-medium">Heading 5</p>
                <p className="text-lg">Large text</p>
                <p className="text-base">Base text</p>
                <p className="text-sm">Small text</p>
                <p className="text-xs">Extra small text</p>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">
                Background & Foreground
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background border border-border rounded">
                  <p className="text-foreground">
                    Background with Foreground text
                  </p>
                </div>
                <div className="p-4 bg-muted border border-border rounded">
                  <p className="text-muted-foreground">
                    Muted background with Muted foreground text
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Shadows</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-background shadow-sm border border-border rounded">
                  <p className="text-sm">Shadow SM</p>
                </div>
                <div className="p-4 bg-background shadow border border-border rounded">
                  <p className="text-sm">Shadow Base</p>
                </div>
                <div className="p-4 bg-background shadow-md border border-border rounded">
                  <p className="text-sm">Shadow MD</p>
                </div>
                <div className="p-4 bg-background shadow-lg border border-border rounded">
                  <p className="text-sm">Shadow LG</p>
                </div>
                <div className="p-4 bg-background shadow-xl border border-border rounded">
                  <p className="text-sm">Shadow XL</p>
                </div>
                <div className="p-4 bg-background shadow-2xl border border-border rounded">
                  <p className="text-sm">Shadow 2XL</p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Theme persistence to localStorage</li>
                <li>System theme detection and automatic switching</li>
                <li>Smooth transitions between themes (0.3s ease)</li>
                <li>Support for light, dark, and system modes</li>
                <li>No flash of unstyled content (FOUC)</li>
                <li>TypeScript support with full type safety</li>
                <li>React Context API for theme state management</li>
                <li>Custom hook (useTheme) for easy access</li>
              </ul>
            </div>
          </div>
        </main>
      </Container>
    </DashboardLayout>
  );
}
