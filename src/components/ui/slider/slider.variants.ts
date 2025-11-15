import { cva, type VariantProps } from "class-variance-authority";

export const sliderRootVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800",
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

export const sliderIndicatorVariants = cva(
  "absolute h-full bg-primary-600 dark:bg-primary-500",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const sliderThumbVariants = cva(
  "block rounded-full border-2 border-primary-600 dark:border-primary-500 bg-white dark:bg-neutral-900 ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type SliderVariants = VariantProps<typeof sliderTrackVariants>;
