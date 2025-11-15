import { cva, type VariantProps } from "class-variance-authority";

export const progressRootVariants = cva("relative w-full", {
  variants: {},
  defaultVariants: {},
});

export const progressTrackVariants = cva(
  "relative overflow-hidden rounded-full bg-neutral-200",
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
        default: "bg-primary-600",
        success: "bg-success-600",
        warning: "bg-warning-600",
        error: "bg-error-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ProgressVariants = VariantProps<typeof progressIndicatorVariants> &
  VariantProps<typeof progressTrackVariants>;
