import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";
import { withTheme } from "./theme-decorator";
import { withNuqs } from "./nuqs-decorator";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0a0a0a",
        },
      ],
    },
  },
  decorators: [withNuqs, withTheme],
};

export default preview;
