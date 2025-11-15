import { cva, type VariantProps } from "class-variance-authority";

export const tabsListVariants = cva("flex", {
  variants: {
    variant: {
      underline: "border-b border-neutral-200",
      pills: "gap-1 p-1 bg-neutral-100 rounded-lg",
      bordered: "gap-1 p-1 border border-neutral-200 rounded-lg bg-white",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "underline",
    orientation: "horizontal",
    size: "md",
  },
});

export const tabVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        underline:
          "border-b-2 border-transparent data-selected:border-primary-600 data-selected:text-primary-600 hover:text-primary-600 text-neutral-600",
        pills:
          "rounded-md data-selected:bg-white data-selected:shadow-sm data-selected:text-primary-600 hover:bg-white/50 text-neutral-600",
        bordered:
          "rounded-md border border-transparent data-selected:border-primary-600 data-selected:bg-primary-50 data-selected:text-primary-600 hover:bg-neutral-50 text-neutral-600",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  }
);

export const tabPanelVariants = cva("focus-visible:outline-none", {
  variants: {
    size: {
      sm: "pt-3",
      md: "pt-4",
      lg: "pt-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TabsVariants = VariantProps<typeof tabsListVariants>;
