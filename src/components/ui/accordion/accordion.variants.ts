import { cva, type VariantProps } from "class-variance-authority";

export const accordionRootVariants = cva("w-full", {
  variants: {
    variant: {
      default: "space-y-2",
      bordered:
        "border border-neutral-200 dark:border-neutral-800 rounded-lg divide-y divide-neutral-200 dark:divide-neutral-800",
      separated: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "",
      bordered: "",
      separated:
        "border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 px-4 text-left font-medium transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-b border-neutral-200 dark:border-neutral-800 data-panel-open:border-b-0",
        bordered: "",
        separated: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionPanelVariants = cva(
  "overflow-hidden transition-all data-closed:animate-accordion-up data-open:animate-accordion-down",
  {
    variants: {
      variant: {
        default: "border-b border-neutral-200 dark:border-neutral-800",
        bordered: "",
        separated: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionContentVariants = cva("px-4 pb-4 pt-0", {
  variants: {},
  defaultVariants: {},
});

export type AccordionVariants = VariantProps<typeof accordionRootVariants>;
