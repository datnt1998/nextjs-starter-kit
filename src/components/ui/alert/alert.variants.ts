import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-950",
  {
    variants: {
      variant: {
        default: "bg-white text-neutral-950 border-neutral-200",
        info: "bg-primary-50 text-primary-900 border-primary-200 [&>svg]:text-primary-600",
        success:
          "bg-success-50 text-success-900 border-success-200 [&>svg]:text-success-600",
        warning:
          "bg-warning-50 text-warning-900 border-warning-200 [&>svg]:text-warning-600",
        error:
          "bg-error-50 text-error-900 border-error-200 [&>svg]:text-error-600",
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
