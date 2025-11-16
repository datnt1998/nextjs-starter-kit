import { cva, type VariantProps } from "class-variance-authority";

export const achievementCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300",
  {
    variants: {
      status: {
        locked:
          "bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 grayscale opacity-60",
        "in-progress":
          "bg-card border-border hover:shadow-md hover:-translate-y-0.5",
        unlocked:
          "bg-gradient-to-br border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer",
      },
      gradient: {
        none: "",
        primary: "from-primary-500 to-secondary-600",
        success: "from-success-500 to-success-700",
        accent: "from-orange-500 to-red-500",
      },
    },
    compoundVariants: [
      {
        status: "unlocked",
        gradient: "none",
        className: "from-primary-500 to-secondary-600",
      },
    ],
    defaultVariants: {
      status: "locked",
      gradient: "none",
    },
  }
);

export const achievementIconVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300",
  {
    variants: {
      status: {
        locked: "bg-neutral-200 dark:bg-neutral-800 text-neutral-400",
        "in-progress": "bg-primary-100 dark:bg-primary-900 text-primary-600",
        unlocked: "bg-white/20 text-white",
      },
      size: {
        sm: "h-10 w-10 text-lg",
        md: "h-12 w-12 text-xl",
        lg: "h-16 w-16 text-2xl",
      },
    },
    defaultVariants: {
      status: "locked",
      size: "md",
    },
  }
);

export type AchievementCardVariants = VariantProps<
  typeof achievementCardVariants
>;
export type AchievementIconVariants = VariantProps<
  typeof achievementIconVariants
>;
