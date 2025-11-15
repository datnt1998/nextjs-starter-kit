import { cva, type VariantProps } from "class-variance-authority";

export const toastRootVariants = cva(
  "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] rounded-lg border bg-clip-padding p-4 shadow-lg select-none after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[ending-style]:opacity-0 data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)] data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] h-[var(--height)] data-[expanded]:h-[var(--toast-height)] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
        info: "bg-primary-50 dark:bg-primary-950 border-primary-200 dark:border-primary-800",
        success:
          "bg-success-50 dark:bg-success-950 border-success-200 dark:border-success-800",
        warning:
          "bg-warning-50 dark:bg-warning-950 border-warning-200 dark:border-warning-800",
        error:
          "bg-error-50 dark:bg-error-950 border-error-200 dark:border-error-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const toastContentVariants = cva(
  "overflow-hidden transition-opacity [transition-duration:250ms] data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100"
);

export const toastTitleVariants = cva("text-[0.975rem] leading-5 font-medium", {
  variants: {
    variant: {
      default: "text-neutral-950 dark:text-neutral-50",
      info: "text-primary-900 dark:text-primary-100",
      success: "text-success-900 dark:text-success-100",
      warning: "text-warning-900 dark:text-warning-100",
      error: "text-error-900 dark:text-error-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const toastDescriptionVariants = cva("text-[0.925rem] leading-5", {
  variants: {
    variant: {
      default: "text-neutral-700 dark:text-neutral-300",
      info: "text-primary-700 dark:text-primary-300",
      success: "text-success-700 dark:text-success-300",
      warning: "text-warning-700 dark:text-warning-300",
      error: "text-error-700 dark:text-error-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const toastCloseVariants = cva(
  "absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded border-none bg-transparent transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
        info: "text-primary-500 hover:bg-primary-100 hover:text-primary-700 dark:text-primary-400 dark:hover:bg-primary-900 dark:hover:text-primary-200",
        success:
          "text-success-500 hover:bg-success-100 hover:text-success-700 dark:text-success-400 dark:hover:bg-success-900 dark:hover:text-success-200",
        warning:
          "text-warning-500 hover:bg-warning-100 hover:text-warning-700 dark:text-warning-400 dark:hover:bg-warning-900 dark:hover:text-warning-200",
        error:
          "text-error-500 hover:bg-error-100 hover:text-error-700 dark:text-error-400 dark:hover:bg-error-900 dark:hover:text-error-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ToastVariants = VariantProps<typeof toastRootVariants>;
