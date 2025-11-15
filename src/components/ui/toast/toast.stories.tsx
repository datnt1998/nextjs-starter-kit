import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./toast";

const meta = {
  title: "UI/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const toast = useToast();

  // Simulate async operations
  const simulateSuccess = (): Promise<{ count: number }> =>
    new Promise((resolve) => setTimeout(() => resolve({ count: 42 }), 2000));

  const simulateError = (): Promise<never> =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Network error")), 2000)
    );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">Toast Examples</h3>

      <button
        type="button"
        className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
        onClick={() =>
          toast.show({
            title: "Default Toast",
            description: "This is a default toast notification.",
          })
        }
      >
        Show Default Toast
      </button>

      <button
        type="button"
        className="rounded-md border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50 dark:hover:bg-primary-900"
        onClick={() =>
          toast.info({
            title: "Info Toast",
            description: "This is an informational message.",
          })
        }
      >
        Show Info Toast
      </button>

      <button
        type="button"
        className="rounded-md border border-success-200 bg-success-50 px-4 py-2 text-sm font-medium text-success-900 hover:bg-success-100 dark:border-success-800 dark:bg-success-950 dark:text-success-50 dark:hover:bg-success-900"
        onClick={() =>
          toast.success({
            title: "Success!",
            description: "Your changes have been saved successfully.",
          })
        }
      >
        Show Success Toast
      </button>

      <button
        type="button"
        className="rounded-md border border-warning-200 bg-warning-50 px-4 py-2 text-sm font-medium text-warning-900 hover:bg-warning-100 dark:border-warning-800 dark:bg-warning-950 dark:text-warning-50 dark:hover:bg-warning-900"
        onClick={() =>
          toast.warning({
            title: "Warning",
            description: "Please review your input before proceeding.",
          })
        }
      >
        Show Warning Toast
      </button>

      <button
        type="button"
        className="rounded-md border border-error-200 bg-error-50 px-4 py-2 text-sm font-medium text-error-900 hover:bg-error-100 dark:border-error-800 dark:bg-error-950 dark:text-error-50 dark:hover:bg-error-900"
        onClick={() =>
          toast.error({
            title: "Error",
            description: "Something went wrong. Please try again.",
          })
        }
      >
        Show Error Toast
      </button>

      <button
        type="button"
        className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
        onClick={() =>
          toast.show({
            title: "Simple Toast",
          })
        }
      >
        Show Toast Without Description
      </button>

      <button
        type="button"
        className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
        onClick={() => {
          toast.success({ title: "Toast 1", description: "First toast" });
          toast.info({ title: "Toast 2", description: "Second toast" });
          toast.warning({ title: "Toast 3", description: "Third toast" });
        }}
      >
        Show Multiple Toasts
      </button>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-2">
        <h4 className="text-md font-semibold mb-2">Promise Toasts</h4>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="rounded-md border border-success-200 bg-success-50 px-4 py-2 text-sm font-medium text-success-900 hover:bg-success-100 dark:border-success-800 dark:bg-success-950 dark:text-success-50 dark:hover:bg-success-900"
            onClick={() =>
              toast.promise(simulateSuccess(), {
                loading: "Loading data...",
                success: (data: { count: number }) =>
                  `Successfully loaded ${data.count} items`,
                error: "Failed to load data",
              })
            }
          >
            Promise Toast (Success)
          </button>

          <button
            type="button"
            className="rounded-md border border-error-200 bg-error-50 px-4 py-2 text-sm font-medium text-error-900 hover:bg-error-100 dark:border-error-800 dark:bg-error-950 dark:text-error-50 dark:hover:bg-error-900"
            onClick={() =>
              toast.promise(simulateError(), {
                loading: "Processing request...",
                success: "Request completed",
                error: (err: Error) => `Error: ${err.message}`,
              })
            }
          >
            Promise Toast (Error)
          </button>

          <button
            type="button"
            className="rounded-md border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50 dark:hover:bg-primary-900"
            onClick={() =>
              toast.promise(simulateSuccess(), {
                loading: {
                  title: "Saving changes...",
                  description: "Please wait while we save your data",
                },
                success: {
                  title: "Changes saved!",
                  description: "Your data has been saved successfully",
                },
                error: {
                  title: "Save failed",
                  description: "Unable to save your changes",
                },
              })
            }
          >
            Promise Toast (With Descriptions)
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Default toast examples showing all variants
 */
export const Default: Story = {
  args: {
    children: <ToastDemo />,
  },
  render: (args) => <ToastProvider {...args} />,
};

/**
 * Toast positioned at top-right
 */
export const TopRight: Story = {
  args: {
    position: "top-right",
    children: <ToastDemo />,
  },
  render: (args) => <ToastProvider {...args} />,
};

/**
 * Toast positioned at top-left
 */
export const TopLeft: Story = {
  args: {
    position: "top-left",
    children: <ToastDemo />,
  },
  render: (args) => <ToastProvider {...args} />,
};

/**
 * Toast positioned at bottom-left
 */
export const BottomLeft: Story = {
  args: {
    position: "bottom-left",
    children: <ToastDemo />,
  },
  render: (args) => <ToastProvider {...args} />,
};
