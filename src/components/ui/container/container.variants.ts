import { cva, type VariantProps } from "class-variance-authority";

export const containerVariants = cva("mx-auto w-full transition-all", {
  variants: {
    size: {
      sm: "max-w-screen-sm", // 640px
      md: "max-w-screen-md", // 768px
      lg: "max-w-screen-lg", // 1024px
      xl: "max-w-screen-xl", // 1280px
      "2xl": "max-w-screen-2xl", // 1536px
      full: "max-w-full",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-12",
    },
    centered: {
      true: "flex flex-col items-center",
      false: "",
    },
    background: {
      none: "",
      muted: "bg-muted",
      card: "bg-card",
      gradient: "bg-gradient-to-br",
      glass: "bg-background/80 backdrop-blur-sm border border-border/50",
    },
    gradient: {
      none: "",
      primary:
        "from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5",
      secondary:
        "from-secondary-500/10 to-pink-500/10 dark:from-secondary-500/5 dark:to-pink-500/5",
      success:
        "from-success-500/10 to-success-700/10 dark:from-success-500/5 dark:to-success-700/5",
      accent:
        "from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5",
      subtle: "from-background to-muted",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "md",
    centered: false,
    background: "none",
    gradient: "none",
    rounded: "lg", // Default to lg (16px) for modern look
  },
});

export type ContainerVariants = VariantProps<typeof containerVariants>;
