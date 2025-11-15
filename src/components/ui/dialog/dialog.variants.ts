import { cva, type VariantProps } from "class-variance-authority";

export const dialogContentVariants = cva(
  [
    "relative bg-white dark:bg-neutral-900 rounded-lg shadow-xl",
    "flex flex-col max-h-[90vh]",
    "outline outline-1 outline-neutral-200 dark:outline-neutral-800",
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
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;
