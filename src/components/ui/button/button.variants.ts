import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
        secondary:
          "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500",
        outline:
          "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500",
        ghost:
          "hover:bg-neutral-100 text-neutral-900 focus-visible:ring-neutral-500",
        danger:
          "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500",
      },
      size: {
        sm: "h-9 px-3 text-sm gap-1.5",
        md: "h-10 px-4 text-base gap-2",
        lg: "h-11 px-6 text-lg gap-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
