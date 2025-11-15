"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariants } from "./button.variants";

/**
 * Props for the Button component.
 *
 * Extends standard HTML button attributes and includes variant options
 * for styling and additional features like loading states and icons.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /**
   * If true, the button will show a loading spinner and be disabled.
   * Use this during async operations to prevent multiple submissions.
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * Icon to display on the left side of the button text.
   * Can be any React node (typically an icon component).
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of the button text.
   * Can be any React node (typically an icon component).
   */
  rightIcon?: React.ReactNode;
  /**
   * The content of the button (typically text).
   */
  children?: React.ReactNode;
}

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * A flexible, accessible button component with multiple variants and states.
 *
 * Built with Base-UI primitives and styled with Tailwind CSS. Supports multiple
 * visual variants, sizes, loading states, and icon placement. Fully accessible
 * with proper ARIA attributes and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Button variant="primary">Click me</Button>
 *
 * @example
 * // With loading state
 * <Button isLoading={isSubmitting} onClick={handleSubmit}>
 *   Submit
 * </Button>
 *
 * @example
 * // With icons
 * <Button leftIcon={<PlusIcon />} variant="secondary">
 *   Add Item
 * </Button>
 *
 * @example
 * // Different sizes and variants
 * <Button size="sm" variant="outline">Small</Button>
 * <Button size="lg" variant="danger">Delete</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <Spinner />}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
