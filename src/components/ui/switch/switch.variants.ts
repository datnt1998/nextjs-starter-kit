import { cva, type VariantProps } from "class-variance-authority";

export const switchRootVariants = cva(
  "relative inline-flex appearance-none border-0 m-0 p-0.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-300 data-checked:bg-primary-600 hover:bg-neutral-400 data-checked:hover:bg-primary-700",
        success:
          "bg-neutral-300 data-checked:bg-success-600 hover:bg-neutral-400 data-checked:hover:bg-success-700",
        danger:
          "bg-neutral-300 data-checked:bg-error-600 hover:bg-neutral-400 data-checked:hover:bg-error-700",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
      loading: {
        true: "cursor-wait",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
      loading: false,
    },
  }
);

export const switchThumbVariants = cva(
  "block rounded-full bg-white shadow-sm transition-transform ease-in-out duration-150",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-checked:translate-x-4",
        md: "h-5 w-5 data-checked:translate-x-5",
        lg: "h-6 w-6 data-checked:translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const switchWrapperVariants = cva(
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

export const switchLabelVariants = cva("text-neutral-900 select-none", {
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

export const switchDescriptionVariants = cva("text-neutral-600 select-none", {
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

export type SwitchVariants = VariantProps<typeof switchRootVariants>;
