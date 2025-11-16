import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        elevated: "bg-background border-border",
        outlined: "bg-transparent border-2 border-border",
        ghost: "bg-muted/50 border-transparent",
        gradient: "bg-gradient-to-br !text-white border-transparent",
        glass: "bg-background/80 backdrop-blur-sm border-border/50",
        interactive:
          "bg-background border-border cursor-pointer hover:-translate-y-1",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      gradient: {
        none: "",
        primary: "from-primary-500 to-primary-700",
        secondary: "from-secondary-500 to-secondary-700",
        success: "from-success-500 to-success-700",
        accent: "from-orange-500 to-red-500",
      },
      shadow: {
        none: "shadow-none",
        xs: "shadow-xs",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
      },
      shadowColor: {
        none: "",
        primary: "shadow-primary",
        success: "shadow-success",
        accent: "shadow-accent",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      gradient: "none",
      shadow: "none",
      shadowColor: "none",
    },
  }
);

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
  "text-2xl font-semibold leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "text-foreground",
        gradient: "!text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const cardDescriptionVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      gradient: "!text-white/90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

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
