import { cva, type VariantProps } from "class-variance-authority";

export const radioGroupRootVariants = cva("flex gap-3", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const radioItemVariants = cva(
  "inline-flex items-center gap-2 cursor-pointer group",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const radioRootVariants = cva(
  "flex items-center justify-center rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 bg-transparent p-0 m-0",
  {
    variants: {
      variant: {
        default:
          "border-neutral-300 data-unchecked:border-neutral-300 data-checked:bg-primary-600 data-checked:border-primary-600 hover:border-primary-400",
        error:
          "border-error-500 data-unchecked:border-error-500 data-checked:bg-error-600 data-checked:border-error-600 hover:border-error-400",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

export const radioIndicatorVariants = cva(
  "flex items-center justify-center data-unchecked:hidden before:content-[''] before:block before:rounded-full before:bg-white",
  {
    variants: {
      size: {
        sm: "before:h-1.5 before:w-1.5",
        md: "before:h-2 before:w-2",
        lg: "before:h-2.5 before:w-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const radioLabelVariants = cva("text-neutral-900 select-none", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    disabled: {
      true: "cursor-not-allowed",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export const radioDescriptionVariants = cva("text-neutral-600 select-none", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioRootVariants>;
export type RadioGroupOrientation = VariantProps<
  typeof radioGroupRootVariants
>["orientation"];
