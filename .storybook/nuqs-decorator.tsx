import type { Decorator } from "@storybook/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";

/**
 * Decorator to wrap stories with NuqsTestingAdapter for URL state management
 * This is required for components that use nuqs hooks like useQueryState
 *
 * We use the testing adapter instead of next/app adapter because Storybook
 * doesn't have the Next.js App Router context.
 *
 * The testing adapter provides:
 * - In-memory URL state management
 * - No actual URL updates (isolated from browser history)
 * - Perfect for component testing in Storybook
 */
export const withNuqs: Decorator = (Story) => {
  return (
    <NuqsTestingAdapter>
      <Story />
    </NuqsTestingAdapter>
  );
};
