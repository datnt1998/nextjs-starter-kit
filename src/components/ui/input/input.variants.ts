import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-md border bg-white dark:bg-neutral-900 px-3 py-2 font-normal transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-primary-500 focus:ring-primary-500",
        error:
          "border-error-500 dark:border-error-600 text-neutral-900 dark:text-neutral-100 focus:border-error-600 focus:ring-error-500",
      },
      size: {
        sm: "h-9 text-sm",
        md: "h-10 text-base",
        lg: "h-11 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
