import { useEffect, useState } from "react";
import type { Decorator } from "@storybook/react";
import { ThemeProvider } from "../src/lib/theme/theme-provider";

export const withTheme: Decorator = (Story) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Apply theme class to body
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProvider defaultTheme={theme}>
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1 rounded ${
              theme === "light" ? "bg-primary-600 text-white" : "bg-neutral-200"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1 rounded ${
              theme === "dark" ? "bg-primary-600 text-white" : "bg-neutral-200"
            }`}
          >
            Dark
          </button>
        </div>
        <Story />
      </div>
    </ThemeProvider>
  );
};
