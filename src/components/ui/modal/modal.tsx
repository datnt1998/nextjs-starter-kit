"use client";

import * as React from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { cn } from "@/lib/utils";
import {
  modalContentVariants,
  type ModalContentVariants,
} from "./modal.variants";

export interface ModalProps extends ModalContentVariants {
  /**
   * Whether the modal is open
   */
  open?: boolean;
  /**
   * Callback when the modal open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The content of the modal
   */
  children: React.ReactNode;
  /**
   * Additional className for the modal content
   */
  className?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
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

export const Modal = ({
  open,
  onOpenChange,
  children,
  size,
  className,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 bg-black/50 z-50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
        >
          <div className={cn(modalContentVariants({ size }), className)}>
            {children}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const ModalHeader = ({ children, className }: ModalHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-start justify-between p-6 border-b border-neutral-200",
        className
      )}
    >
      <div className="flex-1">{children}</div>
    </div>
  );
};

export const ModalBody = ({ children, className }: ModalBodyProps) => {
  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 p-6 border-t border-neutral-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return (
    <Dialog.Title
      className={cn("text-lg font-semibold text-neutral-900", className)}
    >
      {children}
    </Dialog.Title>
  );
};

export const ModalDescription = ({
  children,
  className,
}: ModalDescriptionProps) => {
  return (
    <Dialog.Description
      className={cn("text-sm text-neutral-600 mt-1", className)}
    >
      {children}
    </Dialog.Description>
  );
};

export const ModalClose = ({
  children,
  className,
  ...props
}: ModalCloseProps) => {
  return (
    <Dialog.Close
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children || <CloseIcon />}
      <span className="sr-only">Close</span>
    </Dialog.Close>
  );
};

Modal.displayName = "Modal";
ModalHeader.displayName = "ModalHeader";
ModalBody.displayName = "ModalBody";
ModalFooter.displayName = "ModalFooter";
ModalTitle.displayName = "ModalTitle";
ModalDescription.displayName = "ModalDescription";
ModalClose.displayName = "ModalClose";
