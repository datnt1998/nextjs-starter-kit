"use client";

import * as React from "react";
import { Input as BaseInput } from "@base-ui-components/react/input";
import { cn } from "@/lib/utils";
import { inputVariants, type InputVariants } from "./input.variants";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariants {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Additional className for the wrapper div
   */
  wrapperClassName?: string;
}

/**
 * A flexible input component built with Base UI.
 *
 * Supports labels, helper text, error states, and multiple sizes.
 * Uses CSS variables for automatic dark mode support.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * @example
 * // With label and helper text
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email"
 * />
 *
 * @example
 * // With error state
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      error,
      wrapperClassName,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = !!error;
    const finalVariant = hasError ? "error" : variant;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-foreground",
              disabled && "opacity-50"
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-destructive" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <BaseInput
          ref={ref}
          id={inputId}
          className={cn(
            inputVariants({ variant: finalVariant, size }),
            className
          )}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />
        {helperText && !hasError && (
          <p
            id={helperTextId}
            className={cn(
              "text-sm text-muted-foreground",
              disabled && "opacity-50"
            )}
          >
            {helperText}
          </p>
        )}
        {hasError && (
          <p
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
