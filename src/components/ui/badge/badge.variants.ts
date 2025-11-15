import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        primary: "bg-primary-100 text-primary-700 hover:bg-primary-200",
        secondary: "bg-secondary-100 text-secondary-700 hover:bg-secondary-200",
        success: "bg-success-100 text-success-700 hover:bg-success-200",
        warning: "bg-warning-100 text-warning-700 hover:bg-warning-200",
        error: "bg-error-100 text-error-700 hover:bg-error-200",
        outline:
          "border border-neutral-300 text-neutral-700 hover:bg-neutral-50",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-base",
      },
      dot: {
        true: "pl-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      dot: false,
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
