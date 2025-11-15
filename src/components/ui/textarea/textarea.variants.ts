import { cva, type VariantProps } from "class-variance-authority";

export const textareaVariants = cva(
  "w-full rounded-md border bg-white px-3 py-2 font-normal transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 text-neutral-900 focus:border-primary-500 focus:ring-primary-500",
        error:
          "border-error-500 text-neutral-900 focus:border-error-600 focus:ring-error-500",
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
