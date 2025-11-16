import { cva, type VariantProps } from "class-variance-authority";

export const dialogContentVariants = cva(
  [
    "relative bg-white dark:bg-neutral-900 rounded-lg",
    "flex flex-col max-h-[90vh]",
  ],
  {
    variants: {
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
        "2xl": "w-full max-w-2xl",
        full: "w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]",
      },
      shadow: {
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
      },
    },
    defaultVariants: {
      size: "md",
      shadow: "2xl",
    },
  }
);

export const dialogHeaderVariants = cva(
  [
    "flex items-start justify-between p-6 border-b",
    "transition-colors duration-200",
    "rounded-t-lg", // Match dialog's border-radius to prevent gradient overflow
  ],
  {
    variants: {
      gradient: {
        none: "border-neutral-200 dark:border-neutral-800",
        primary:
          "bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white border-transparent",
        secondary:
          "bg-gradient-to-r from-[var(--gradient-secondary-from)] to-[var(--gradient-secondary-to)] text-white border-transparent",
        success:
          "bg-gradient-to-r from-[var(--gradient-success-from)] to-[var(--gradient-success-to)] text-white border-transparent",
        accent:
          "bg-gradient-to-r from-[var(--gradient-accent-from)] to-[var(--gradient-accent-to)] text-white border-transparent",
        hero: "bg-gradient-to-r from-[var(--gradient-hero-from)] via-[var(--gradient-hero-via-1)] to-[var(--gradient-hero-to)] text-white border-transparent",
      },
    },
    defaultVariants: {
      gradient: "none",
    },
  }
);

export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;
export type DialogHeaderVariants = VariantProps<typeof dialogHeaderVariants>;
