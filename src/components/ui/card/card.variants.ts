import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva("rounded-lg border transition-colors", {
  variants: {
    variant: {
      default: "bg-background border-border",
      elevated: "bg-background border-border shadow-md hover:shadow-lg",
      outlined: "bg-transparent border-2 border-border",
      ghost: "bg-muted/50 border-transparent",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardTitleVariants = cva(
  "text-2xl font-semibold leading-none tracking-tight text-foreground"
);

export const cardDescriptionVariants = cva("text-sm text-muted-foreground");

export const cardContentVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3 pt-0",
      md: "p-4 pt-0",
      lg: "p-6 pt-0",
      xl: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardFooterVariants = cva("flex items-center", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3 pt-0",
      md: "p-4 pt-0",
      lg: "p-6 pt-0",
      xl: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;
export type CardContentVariants = VariantProps<typeof cardContentVariants>;
export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;
