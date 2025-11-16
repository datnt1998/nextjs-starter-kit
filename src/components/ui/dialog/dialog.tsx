"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import { cn } from "@/lib/utils";
import {
  dialogContentVariants,
  dialogHeaderVariants,
  type DialogContentVariants,
  type DialogHeaderVariants,
} from "./dialog.variants";

export interface DialogProps extends DialogContentVariants {
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when the dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The content of the dialog
   */
  children: React.ReactNode;
  /**
   * Additional className for the dialog content
   */
  className?: string;
  /**
   * Shadow elevation for the dialog
   */
  shadow?: "md" | "lg" | "xl" | "2xl";
}

export interface DialogHeaderProps extends DialogHeaderVariants {
  children: React.ReactNode;
  className?: string;
  /**
   * Custom gradient colors from the gradient system
   * Provide an object with 'from' and 'to' colors (and optionally 'via')
   * Example: { from: 'rgb(59, 130, 246)', to: 'rgb(147, 51, 234)' }
   */
  customGradient?: {
    from: string;
    to: string;
    via?: string;
    angle?: number;
  };
}

export interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Dialog = ({
  open,
  onOpenChange,
  children,
  size,
  shadow,
  className,
}: DialogProps) => {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={cn(
            "fixed inset-0 min-h-dvh bg-black/50 dark:bg-black/70 z-50",
            "transition-all duration-300 ease-in-out",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            "supports-[-webkit-touch-callout:none]:absolute"
          )}
        />
        <BaseDialog.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50",
            "-translate-x-1/2 -translate-y-1/2",
            "transition-all duration-300 ease-in-out",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            "data-starting-style:scale-95 data-starting-style:opacity-0"
          )}
        >
          <div
            className={cn(
              dialogContentVariants({ size, shadow }),
              "max-w-[calc(100vw-2rem)]",
              className
            )}
          >
            {children}
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};

export const DialogHeader = ({
  children,
  className,
  gradient = "none",
  customGradient,
}: DialogHeaderProps) => {
  // Build custom gradient style if provided
  const customGradientStyle = customGradient
    ? {
        background: customGradient.via
          ? `linear-gradient(${customGradient.angle || 135}deg, ${customGradient.from}, ${customGradient.via}, ${customGradient.to})`
          : `linear-gradient(${customGradient.angle || 135}deg, ${customGradient.from}, ${customGradient.to})`,
        color: "white",
        borderColor: "transparent",
      }
    : undefined;

  return (
    <div
      className={cn(dialogHeaderVariants({ gradient }), className)}
      style={customGradientStyle}
    >
      <div className="flex-1">{children}</div>
    </div>
  );
};

export const DialogBody = ({ children, className }: DialogBodyProps) => {
  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)}>
      {children}
    </div>
  );
};

export const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 p-6 border-t border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <BaseDialog.Title
      className={cn(
        "text-lg font-semibold text-neutral-900 dark:text-neutral-100",
        // Support for gradient headers - white text
        "[.bg-gradient-to-r_&]:text-white",
        className
      )}
    >
      {children}
    </BaseDialog.Title>
  );
};

export const DialogDescription = ({
  children,
  className,
}: DialogDescriptionProps) => {
  return (
    <BaseDialog.Description
      className={cn(
        "text-sm text-neutral-600 dark:text-neutral-400 mt-1",
        // Support for gradient headers - white text with slight transparency
        "[.bg-gradient-to-r_&]:text-white/90",
        className
      )}
    >
      {children}
    </BaseDialog.Description>
  );
};

export const DialogClose = ({
  children,
  className,
  ...props
}: DialogCloseProps) => {
  return (
    <BaseDialog.Close
      className={cn(
        "absolute right-4 top-4 p-1 rounded-md z-10",
        "text-neutral-500 dark:text-neutral-400",
        "hover:text-neutral-900 dark:hover:text-neutral-100",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        // Support for gradient headers - white text and hover state
        "[.bg-gradient-to-r_&]:text-white/80 [.bg-gradient-to-r_&]:hover:text-white",
        "[.bg-gradient-to-r_&]:hover:bg-white/20",
        "transition-colors",
        "focus-visible:outline-2 focus-visible:-outline-offset-1",
        "focus-visible:outline-primary-600 dark:focus-visible:outline-primary-500",
        "[.bg-gradient-to-r_&]:focus-visible:outline-white",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children || <CloseIcon />}
      <span className="sr-only">Close</span>
    </BaseDialog.Close>
  );
};

export const DialogTrigger = ({
  children,
  className,
  asChild,
  ...props
}: DialogTriggerProps) => {
  return (
    <BaseDialog.Trigger className={className} {...props}>
      {children}
    </BaseDialog.Trigger>
  );
};

Dialog.displayName = "Dialog";
DialogHeader.displayName = "DialogHeader";
DialogBody.displayName = "DialogBody";
DialogFooter.displayName = "DialogFooter";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";
DialogClose.displayName = "DialogClose";
DialogTrigger.displayName = "DialogTrigger";
