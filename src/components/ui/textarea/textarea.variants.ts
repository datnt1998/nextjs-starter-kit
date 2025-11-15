import { cva, type VariantProps } from "class-variance-authority";

export const textareaVariants = cva(
  "w-full rounded-md border bg-white dark:bg-neutral-900 px-3 py-2 font-normal transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:border-primary-500 focus:ring-primary-500",
        error:
          "border-error-500 dark:border-error-600 text-neutral-900 dark:text-neutral-100 focus:border-error-600 focus:ring-error-500",
      },
      size: {
        sm: "text-sm min-h-[80px]",
        md: "text-base min-h-[100px]",
        lg: "text-lg min-h-[120px]",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      resize: "vertical",
    },
  }
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
