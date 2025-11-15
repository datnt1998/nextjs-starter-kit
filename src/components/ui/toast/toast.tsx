"use client";

import * as React from "react";
import { Toast as BaseToast } from "@base-ui-components/react/toast";
import { cn } from "@/lib/utils";
import {
  toastRootVariants,
  toastContentVariants,
  toastTitleVariants,
  toastDescriptionVariants,
  toastCloseVariants,
  type ToastVariants,
} from "./toast.variants";

/**
 * Toast data structure
 */
export interface ToastData extends ToastVariants {
  title: string;
  description?: string;
  duration?: number;
}

/**
 * Promise toast messages
 */
export interface PromiseToastMessages<T> {
  loading: string | { title: string; description?: string };
  success:
    | string
    | { title: string; description?: string }
    | ((data: T) => string | { title: string; description?: string });
  error:
    | string
    | { title: string; description?: string }
    | ((error: Error) => string | { title: string; description?: string });
}

/**
 * Props for the ToastProvider component
 */
export interface ToastProviderProps {
  children: React.ReactNode;
  /**
   * Position of the toast viewport
   * @default "bottom-right"
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Props for the Toaster component (internal)
 */
interface ToasterProps {
  variant?: ToastVariants["variant"];
}

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const positionClasses = {
  "top-left": "fixed z-10 top-[1rem] left-[1rem] sm:top-[2rem] sm:left-[2rem]",
  "top-right":
    "fixed z-10 top-[1rem] right-[1rem] sm:top-[2rem] sm:right-[2rem]",
  "bottom-left":
    "fixed z-10 bottom-[1rem] left-[1rem] sm:bottom-[2rem] sm:left-[2rem]",
  "bottom-right":
    "fixed z-10 bottom-[1rem] right-[1rem] sm:bottom-[2rem] sm:right-[2rem]",
};

/**
 * Toast Provider component that wraps your app or component tree.
 *
 * @component
 *
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export function ToastProvider({
  children,
  position = "bottom-right",
}: ToastProviderProps) {
  return (
    <BaseToast.Provider>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport
          className={cn(
            "mx-auto flex w-[250px] sm:w-[300px]",
            positionClasses[position]
          )}
        >
          <Toaster />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

/**
 * Internal Toaster component that renders the toast list
 */
function Toaster({ variant: defaultVariant }: ToasterProps) {
  const { toasts } = BaseToast.useToastManager();

  return (
    <>
      {toasts.map((toast) => {
        const toastData = toast as ToastData;
        const variant = toastData.variant || defaultVariant || "default";

        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            className={cn(toastRootVariants({ variant }))}
          >
            <BaseToast.Content className={cn(toastContentVariants())}>
              <BaseToast.Title
                className={cn(toastTitleVariants({ variant }))}
              />
              <BaseToast.Description
                className={cn(toastDescriptionVariants({ variant }))}
              />
              <BaseToast.Close
                className={cn(toastCloseVariants({ variant }))}
                aria-label="Close"
              >
                <XIcon />
              </BaseToast.Close>
            </BaseToast.Content>
          </BaseToast.Root>
        );
      })}
    </>
  );
}

/**
 * Hook to access the toast manager
 *
 * @example
 * const toast = useToast();
 *
 * toast.success({
 *   title: "Success!",
 *   description: "Your changes have been saved."
 * });
 *
 * @example
 * // Promise toast
 * toast.promise(
 *   fetchData(),
 *   {
 *     loading: "Loading...",
 *     success: "Data loaded!",
 *     error: "Failed to load data"
 *   }
 * );
 */
export function useToast() {
  const toastManager = BaseToast.useToastManager();

  const normalizeMessage = (
    message: string | { title: string; description?: string }
  ): { title: string; description?: string } => {
    return typeof message === "string" ? { title: message } : message;
  };

  return {
    /**
     * Show a default toast
     */
    show: (data: Omit<ToastData, "variant">) => {
      toastManager.add({ ...data, variant: "default" } as ToastData);
    },
    /**
     * Show an info toast
     */
    info: (data: Omit<ToastData, "variant">) => {
      toastManager.add({ ...data, variant: "info" } as ToastData);
    },
    /**
     * Show a success toast
     */
    success: (data: Omit<ToastData, "variant">) => {
      toastManager.add({ ...data, variant: "success" } as ToastData);
    },
    /**
     * Show a warning toast
     */
    warning: (data: Omit<ToastData, "variant">) => {
      toastManager.add({ ...data, variant: "warning" } as ToastData);
    },
    /**
     * Show an error toast
     */
    error: (data: Omit<ToastData, "variant">) => {
      toastManager.add({ ...data, variant: "error" } as ToastData);
    },
    /**
     * Show a promise toast that automatically updates based on promise state
     *
     * @example
     * toast.promise(
     *   fetchData(),
     *   {
     *     loading: "Loading data...",
     *     success: (data) => `Loaded ${data.length} items`,
     *     error: (err) => `Error: ${err.message}`
     *   }
     * );
     */
    promise: async <T,>(
      promise: Promise<T>,
      messages: PromiseToastMessages<T>
    ): Promise<T> => {
      const loadingMessage = normalizeMessage(messages.loading);

      // Show loading toast
      toastManager.add({
        ...loadingMessage,
        variant: "info",
        duration: Infinity,
      } as ToastData);

      try {
        const data = await promise;

        // Show success toast
        const successMessage =
          typeof messages.success === "function"
            ? messages.success(data)
            : messages.success;
        const successData = normalizeMessage(successMessage);
        toastManager.add({
          ...successData,
          variant: "success",
        } as ToastData);

        return data;
      } catch (err) {
        // Show error toast
        const error = err instanceof Error ? err : new Error(String(err));
        const errorMessage =
          typeof messages.error === "function"
            ? messages.error(error)
            : messages.error;
        const errorData = normalizeMessage(errorMessage);
        toastManager.add({
          ...errorData,
          variant: "error",
        } as ToastData);

        throw err;
      }
    },
  };
}
