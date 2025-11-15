import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-md border bg-white px-3 py-2 font-normal transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 text-neutral-900 focus:border-primary-500 focus:ring-primary-500",
        error:
          "border-error-500 text-neutral-900 focus:border-error-600 focus:ring-error-500",
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
