import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-950 dark:[&>svg]:text-neutral-50",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 border-neutral-200 dark:border-neutral-800",
        info: "bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100 border-primary-200 dark:border-primary-800 [&>svg]:text-primary-600 dark:[&>svg]:text-primary-400",
        success:
          "bg-success-50 dark:bg-success-950 text-success-900 dark:text-success-100 border-success-200 dark:border-success-800 [&>svg]:text-success-600 dark:[&>svg]:text-success-400",
        warning:
          "bg-warning-50 dark:bg-warning-950 text-warning-900 dark:text-warning-100 border-warning-200 dark:border-warning-800 [&>svg]:text-warning-600 dark:[&>svg]:text-warning-400",
        error:
          "bg-error-50 dark:bg-error-950 text-error-900 dark:text-error-100 border-error-200 dark:border-error-800 [&>svg]:text-error-600 dark:[&>svg]:text-error-400",
      },
      dismissible: {
        true: "pr-12",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      dismissible: false,
    },
  }
);

export const alertTitleVariants = cva(
  "mb-1 font-medium leading-none tracking-tight",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed", {
  variants: {},
  defaultVariants: {},
});

export type AlertVariants = VariantProps<typeof alertVariants>;
