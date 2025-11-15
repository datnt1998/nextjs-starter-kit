"use client";

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { cn } from "@/lib/utils";
import {
  checkboxRootVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
  checkboxDescriptionVariants,
  type CheckboxVariants,
} from "./checkbox.variants";

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>,
      "className" | "disabled"
    >,
    CheckboxVariants {
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Description text to display below the label
   */
  description?: string;
  /**
   * Error message to display below the checkbox
   */
  error?: string;
  /**
   * Additional className for the root wrapper
   */
  className?: string;
  /**
   * Additional className for the checkbox indicator
   */
  indicatorClassName?: string;
  /**
   * Additional className for the label
   */
  labelClassName?: string;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-full w-full text-white", className)}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IndeterminateIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-full w-full text-white", className)}
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * A flexible, accessible checkbox component with multiple variants and states.
 *
 * Built with Base-UI Checkbox primitives and styled with Tailwind CSS. Supports
 * multiple visual variants, sizes, indeterminate state, and label/description support.
 * Fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Checkbox label="Accept terms" />
 *
 * @example
 * // With description
 * <Checkbox
 *   label="Enable notifications"
 *   description="Receive email updates about your account"
 * />
 *
 * @example
 * // With error state
 * <Checkbox
 *   label="I agree"
 *   variant="error"
 *   error="You must accept the terms"
 * />
 *
 * @example
 * // Indeterminate state
 * <Checkbox
 *   label="Select all"
 *   indeterminate={true}
 * />
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      indicatorClassName,
      labelClassName,
      variant,
      size,
      label,
      description,
      error,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId();
    const descriptionId = `${checkboxId}-description`;
    const errorId = `${checkboxId}-error`;
    const hasError = !!error;
    const finalVariant = hasError ? "error" : variant;

    return (
      <div className="flex flex-col gap-1">
        <BaseCheckbox.Root
          ref={ref}
          disabled={disabled}
          className={cn(checkboxRootVariants({ disabled }), className)}
          aria-describedby={
            hasError ? errorId : description ? descriptionId : undefined
          }
          {...props}
        >
          <BaseCheckbox.Indicator
            className={cn(
              checkboxIndicatorVariants({
                variant: finalVariant,
                size,
                disabled,
              }),
              indicatorClassName
            )}
            render={(
              _props: React.HTMLAttributes<HTMLSpanElement>,
              state: { checked: boolean; indeterminate: boolean }
            ) => (
              <>
                {state.indeterminate && <IndeterminateIcon />}
                {!state.indeterminate && state.checked && <CheckIcon />}
              </>
            )}
          />
          {(label || description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <span
                  className={cn(
                    checkboxLabelVariants({ size, disabled }),
                    labelClassName
                  )}
                >
                  {label}
                </span>
              )}
              {description && !hasError && (
                <span
                  id={descriptionId}
                  className={checkboxDescriptionVariants({ size })}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </BaseCheckbox.Root>
        {hasError && (
          <p
            id={errorId}
            className="text-sm text-error-600 ml-7"
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

Checkbox.displayName = "Checkbox";
