import { cva, type VariantProps } from "class-variance-authority";

export const avatarVariants = cva(
  "inline-flex items-center justify-center overflow-hidden rounded-full shrink-0",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
