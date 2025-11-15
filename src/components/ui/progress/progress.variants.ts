import { cva, type VariantProps } from "class-variance-authority";

export const progressRootVariants = cva("relative w-full", {
  variants: {},
  defaultVariants: {},
});

export const progressTrackVariants = cva(
  "relative overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary-600 dark:bg-primary-500",
        success: "bg-success-600 dark:bg-success-500",
        warning: "bg-warning-600 dark:bg-warning-500",
        error: "bg-error-600 dark:bg-error-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ProgressVariants = VariantProps<typeof progressIndicatorVariants> &
  VariantProps<typeof progressTrackVariants>;
