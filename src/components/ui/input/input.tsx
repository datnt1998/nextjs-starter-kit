"use client";

import * as React from "react";
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
              "text-sm font-medium text-neutral-900",
              disabled && "opacity-50"
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-error-600" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <input
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
            className={cn("text-sm text-neutral-600", disabled && "opacity-50")}
          >
            {helperText}
          </p>
        )}
        {hasError && (
          <p
            id={errorId}
            className="text-sm text-error-600"
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
