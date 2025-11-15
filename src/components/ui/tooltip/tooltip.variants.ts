import { cva, type VariantProps } from "class-variance-authority";

export const tooltipPopupVariants = cva(
  "relative z-50 flex origin-[var(--transform-origin)] flex-col rounded-md bg-neutral-900 text-white px-2 py-1 text-sm shadow-lg outline outline-1 outline-neutral-700 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:duration-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:bg-neutral-100 dark:text-neutral-900 dark:outline-neutral-300",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tooltipArrowVariants = cva("absolute flex", {
  variants: {},
  defaultVariants: {},
});

export type TooltipVariants = VariantProps<typeof tooltipPopupVariants>;
