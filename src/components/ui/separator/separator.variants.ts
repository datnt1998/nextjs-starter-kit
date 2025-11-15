import { cva, type VariantProps } from "class-variance-authority";

export const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    variant: {
      default: "bg-border",
      dashed: "border-dashed border-t border-border bg-transparent",
      dotted: "border-dotted border-t border-border bg-transparent",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "dashed",
      className: "border-t-0 border-l",
    },
    {
      orientation: "vertical",
      variant: "dotted",
      className: "border-t-0 border-l",
    },
  ],
});

export type SeparatorVariants = VariantProps<typeof separatorVariants>;
