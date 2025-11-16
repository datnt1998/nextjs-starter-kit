import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  /* Modern input with clean focus states */
  "w-full rounded-xl border bg-card px-4 py-2.5 font-normal text-foreground shadow-sm transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1 focus:ring-offset-background focus:border-primary-500 hover:border-primary-300 dark:hover:border-primary-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
  {
    variants: {
      variant: {
        default: "border-border",
        error:
          "border-error-500 focus:ring-error-500 focus:border-error-600 hover:border-error-600",
        success:
          "border-success-500 focus:ring-success-500 focus:border-success-600",
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm rounded-lg",
        md: "h-11 px-4 py-2.5 text-base rounded-xl",
        lg: "h-13 px-5 py-3 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
