import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  /* Base styles - Modern SaaS card with smooth transitions */
  "rounded-xl border transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-card border-border shadow-sm hover:shadow-md",
        elevated:
          "bg-card border-border-light shadow-md hover:shadow-lg",
        outlined:
          "bg-transparent border-2 border-border hover:border-primary-300 dark:hover:border-primary-700",
        ghost:
          "bg-muted/40 border-transparent hover:bg-muted/60",
        gradient:
          "bg-gradient-to-br !text-white border-transparent shadow-lg",
        glass:
          "bg-card/70 backdrop-blur-md border-border/30 shadow-md",
        interactive:
          "bg-card border-border shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
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
        primary: "shadow-primary-md",
        success: "shadow-success-md",
        accent: "shadow-accent-md",
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

export const cardHeaderVariants = cva("flex flex-col space-y-2", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardTitleVariants = cva(
  /* Modern typography with strong hierarchy */
  "text-xl font-semibold leading-tight tracking-tight text-foreground",
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

export const cardDescriptionVariants = cva(
  "text-sm leading-relaxed text-muted-foreground",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        gradient: "!text-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const cardContentVariants = cva("text-foreground", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-4 pt-0",
      md: "p-6 pt-0",
      lg: "p-8 pt-0",
      xl: "p-10 pt-0",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardFooterVariants = cva(
  "flex items-center border-t border-border-light pt-4",
  {
    variants: {
      padding: {
        none: "p-0 border-none",
        sm: "px-4 pb-4 pt-4",
        md: "px-6 pb-6 pt-4",
        lg: "px-8 pb-8 pt-4",
        xl: "px-10 pb-10 pt-4",
      },
    },
    defaultVariants: {
      padding: "md",
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;
export type CardContentVariants = VariantProps<typeof cardContentVariants>;
export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;
