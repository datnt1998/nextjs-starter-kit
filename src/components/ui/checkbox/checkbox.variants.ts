import { cva, type VariantProps } from "class-variance-authority";

export const checkboxRootVariants = cva(
  "inline-flex items-center gap-2 cursor-pointer group",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const checkboxIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 bg-white dark:bg-neutral-900",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 dark:border-neutral-700 data-[checked]:bg-primary-600 data-[checked]:border-primary-600 dark:data-[checked]:bg-primary-500 dark:data-[checked]:border-primary-500 data-[indeterminate]:bg-primary-600 data-[indeterminate]:border-primary-600 dark:data-[indeterminate]:bg-primary-500 dark:data-[indeterminate]:border-primary-500 hover:border-primary-400",
        error:
          "border-error-500 dark:border-error-600 data-[checked]:bg-error-600 data-[checked]:border-error-600 dark:data-[checked]:bg-error-500 dark:data-[checked]:border-error-500 data-[indeterminate]:bg-error-600 data-[indeterminate]:border-error-600 dark:data-[indeterminate]:bg-error-500 dark:data-[indeterminate]:border-error-500 hover:border-error-400",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

export const checkboxLabelVariants = cva(
  "text-neutral-900 dark:text-neutral-100 select-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export const checkboxDescriptionVariants = cva(
  "text-neutral-600 dark:text-neutral-400 select-none",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxIndicatorVariants>;
