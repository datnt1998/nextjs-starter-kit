import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        primary:
          "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800",
        secondary:
          "bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-800",
        success:
          "bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 hover:bg-success-200 dark:hover:bg-success-800",
        warning:
          "bg-warning-100 dark:bg-warning-900 text-warning-700 dark:text-warning-300 hover:bg-warning-200 dark:hover:bg-warning-800",
        error:
          "bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-300 hover:bg-error-200 dark:hover:bg-error-800",
        info: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800",
        accent:
          "bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 hover:bg-accent-200 dark:hover:bg-accent-800",
        neutral:
          "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        gradient:
          "bg-gradient-to-r !text-white hover:brightness-110 border-transparent shadow-sm",
        outlined:
          "border-2 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900",
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-4 py-2 text-base",
      },
      gradient: {
        none: "",
        primary: "from-primary-600 via-primary-500 to-secondary-600",
        success: "from-success-600 via-success-500 to-primary-600",
        accent: "from-orange-700 via-orange-600 to-red-600",
      },
      outlineColor: {
        default:
          "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300",
        primary: "border-primary-500 text-primary-700 dark:text-primary-400",
        secondary:
          "border-secondary-500 text-secondary-700 dark:text-secondary-400",
        success: "border-success-500 text-success-700 dark:text-success-400",
        warning: "border-warning-500 text-warning-700 dark:text-warning-400",
        error: "border-error-500 text-error-700 dark:text-error-400",
        info: "border-blue-500 text-blue-700 dark:text-blue-400",
        accent: "border-accent-500 text-accent-700 dark:text-accent-400",
      },
      dot: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "gradient",
        gradient: "none",
        className: "from-primary-600 via-primary-500 to-secondary-600",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      gradient: "none",
      outlineColor: "default",
      dot: false,
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
