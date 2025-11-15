# Storybook Configuration

Configuration files for Storybook setup with custom decorators and providers.

## Files

### `main.ts`

Main Storybook configuration file that defines:

- Stories location patterns
- Addons to use
- Framework configuration (Next.js)
- Build settings

### `preview.ts`

Preview configuration that sets up:

- Global parameters (controls, backgrounds)
- Decorators (theme, nuqs)
- Default story settings

### Decorators

#### `theme-decorator.tsx`

Provides theme switching functionality for all stories.

**Features:**

- Light/Dark theme toggle
- ThemeProvider wrapper
- Automatic theme class application to document
- Theme switcher UI in stories

**Usage:**
Automatically applied to all stories via `preview.ts`.

#### `nuqs-decorator.tsx`

Provides NuqsTestingAdapter for URL state management in Storybook.

**Features:**

- Wraps stories with NuqsTestingAdapter (testing adapter, not next/app)
- Enables `useQueryState` and other nuqs hooks
- In-memory URL state (no actual browser URL updates)
- Isolated from browser history (perfect for testing)
- Required for components using URL state synchronization

**Why Testing Adapter?**

- Storybook doesn't have Next.js App Router context
- The `next/app` adapter throws "invariant expected app router to be mounted"
- Testing adapter provides a mock implementation that works in isolation

**Usage:**
Automatically applied to all stories via `preview.ts`.

**Components that need this:**

- DataTable (uses `useQueryState` for pagination, sorting, search)
- DataTableWithFilters (uses URL state)
- Any component using nuqs hooks

## Order of Decorators

Decorators are applied in the order specified in `preview.ts`:

```typescript
decorators: [withNuqs, withTheme];
```

This means:

1. `withNuqs` wraps the story first (outermost)
2. `withTheme` wraps inside nuqs (innermost)

The final structure is:

```tsx
<NuqsTestingAdapter>
  <ThemeProvider>
    <Story />
  </ThemeProvider>
</NuqsTestingAdapter>
```

## Adding New Decorators

To add a new decorator:

1. Create a new file: `.storybook/your-decorator.tsx`
2. Export a decorator function:

   ```tsx
   import type { Decorator } from "@storybook/react";

   export const withYourDecorator: Decorator = (Story) => {
     return (
       <YourProvider>
         <Story />
       </YourProvider>
     );
   };
   ```

3. Import and add to `preview.ts`:

   ```typescript
   import { withYourDecorator } from "./your-decorator";

   decorators: [withNuqs, withTheme, withYourDecorator];
   ```

## Testing Components with URL State

Components using `useQueryState` from nuqs will now work in Storybook:

```tsx
// This will work in Storybook
export const MyStory: Story = {
  render: () => <DataTable columns={columns} data={data} />,
};
```

The NuqsTestingAdapter provides an in-memory URL state management that allows nuqs hooks to function properly in the isolated Storybook environment without requiring Next.js App Router.

## Troubleshooting

### "useQueryState is not a function" error

Make sure `withNuqs` decorator is included in `preview.ts` and is listed before other decorators that might need it.

### "invariant expected app router to be mounted" error

This happens when using `nuqs/adapters/next/app` instead of `nuqs/adapters/testing`. Make sure the decorator imports from the testing adapter:

```tsx
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
```

### Theme not applying

Check that `withTheme` decorator is included and that your component uses Tailwind's dark mode classes.

### Stories not loading

Check the console for errors and ensure all decorators are properly imported and exported.
