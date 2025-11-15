import { cva, type VariantProps } from "class-variance-authority";

export const modalContentVariants = cva(
  "relative bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]",
  {
    variants: {
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
        full: "w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type ModalContentVariants = VariantProps<typeof modalContentVariants>;
