import { cva, type VariantProps } from "class-variance-authority";

export const popoverPopupVariants = cva(
  "relative z-50 origin-[var(--transform-origin)] rounded-lg bg-white px-6 py-4 text-neutral-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:bg-neutral-800 dark:text-white dark:shadow-none dark:-outline-offset-1 dark:outline-gray-700",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const popoverArrowVariants = cva("absolute flex", {
  variants: {},
  defaultVariants: {},
});

export const popoverBackdropVariants = cva(
  "fixed inset-0 z-40 bg-black/50 data-closed:animate-out data-closed:fade-out-0 animate-in fade-in-0",
  {
    variants: {},
    defaultVariants: {},
  }
);

export type PopoverVariants = VariantProps<typeof popoverPopupVariants>;
