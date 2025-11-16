import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  /* Base styles - Modern SaaS aesthetic with smooth transitions */
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-600 focus-visible:ring-focus-ring",
        secondary:
          "bg-secondary-600 text-white shadow-sm hover:bg-secondary-700 hover:shadow-md dark:bg-secondary-500 dark:hover:bg-secondary-600 focus-visible:ring-secondary-500",
        outline:
          "border-2 border-border bg-transparent text-foreground hover:bg-muted hover:border-primary-600 dark:hover:border-primary-500 focus-visible:ring-focus-ring",
        ghost:
          "bg-transparent text-foreground hover:bg-muted hover:text-foreground focus-visible:ring-muted-foreground",
        danger:
          "bg-error-600 text-white shadow-sm hover:bg-error-700 hover:shadow-md dark:bg-error-500 dark:hover:bg-error-600 focus-visible:ring-error-500",
        gradient:
          "text-white shadow-md hover:shadow-lg hover-gradient-brighten focus-visible:ring-primary-500 disabled:gradient-disabled",
        link: "text-primary-600 underline-offset-4 hover:underline dark:text-primary-400 focus-visible:ring-primary-500",
      },
      size: {
        sm: "h-9 px-4 text-sm gap-2",
        md: "h-11 px-6 text-base gap-2.5",
        lg: "h-13 px-8 text-lg gap-3",
      },
      gradient: {
        none: "",
        primary: "bg-gradient-primary",
        success: "bg-gradient-success",
        accent: "bg-gradient-accent",
      },
    },
    compoundVariants: [
      {
        variant: "gradient",
        gradient: "none",
        className: "bg-gradient-primary",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      gradient: "none",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
