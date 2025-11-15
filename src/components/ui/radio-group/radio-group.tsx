"use client";

import * as React from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { cn } from "@/lib/utils";
import {
  radioGroupRootVariants,
  radioItemVariants,
  radioRootVariants,
  radioIndicatorVariants,
  radioLabelVariants,
  radioDescriptionVariants,
  type RadioGroupVariants,
  type RadioGroupOrientation,
} from "./radio-group.variants";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

/**
 * Props for the RadioGroup component.
 */
export interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseRadioGroup>,
      "className" | "disabled"
    >,
    RadioGroupVariants {
  /**
   * The radio options to display
   */
  options: RadioOption[];
  /**
   * Label for the radio group
   */
  label?: string;
  /**
   * Description text for the radio group
   */
  description?: string;
  /**
   * Error message to display below the radio group
   */
  error?: string;
  /**
   * Layout orientation
   */
  orientation?: RadioGroupOrientation;
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  /**
   * Additional className for the root wrapper
   */
  className?: string;
  /**
   * Additional className for the radio group container
   */
  groupClassName?: string;
}

/**
 * A flexible, accessible radio group component with multiple variants and states.
 *
 * Built with Base-UI RadioGroup primitives and styled with Tailwind CSS. Supports
 * multiple visual variants, sizes, horizontal/vertical layouts, and label/description support.
 * Fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <RadioGroup
 *   options={[
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" },
 *   ]}
 * />
 *
 * @example
 * // With label and description
 * <RadioGroup
 *   label="Choose a plan"
 *   description="Select the plan that works best for you"
 *   options={[
 *     { value: "free", label: "Free", description: "Basic features" },
 *     { value: "pro", label: "Pro", description: "Advanced features" },
 *   ]}
 * />
 *
 * @example
 * // Horizontal layout
 * <RadioGroup
 *   orientation="horizontal"
 *   options={[
 *     { value: "yes", label: "Yes" },
 *     { value: "no", label: "No" },
 *   ]}
 * />
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      label,
      description,
      error,
      orientation = "vertical",
      variant,
      size,
      disabled = false,
      className,
      groupClassName,
      ...props
    },
    ref
  ) => {
    const groupId = React.useId();
    const descriptionId = `${groupId}-description`;
    const errorId = `${groupId}-error`;
    const hasError = !!error;
    const finalVariant = hasError ? "error" : variant;

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)}>
        {label && (
          <label
            className={cn(
              "text-sm font-medium text-neutral-900",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}
        {description && !hasError && (
          <p
            id={descriptionId}
            className={cn("text-sm text-neutral-600", disabled && "opacity-50")}
          >
            {description}
          </p>
        )}
        <BaseRadioGroup
          disabled={disabled}
          className={cn(
            radioGroupRootVariants({ orientation }),
            groupClassName
          )}
          aria-describedby={
            hasError ? errorId : description ? descriptionId : undefined
          }
          {...props}
        >
          {options.map((option: RadioOption) => {
            const isDisabled = disabled || option.disabled;
            return (
              <label
                key={option.value}
                className={cn(radioItemVariants({ disabled: isDisabled }))}
              >
                <BaseRadio.Root
                  value={option.value}
                  disabled={isDisabled}
                  className={cn(
                    radioRootVariants({
                      variant: finalVariant,
                      size,
                      disabled: isDisabled,
                    })
                  )}
                >
                  <BaseRadio.Indicator
                    className={cn(radioIndicatorVariants({ size }))}
                  />
                </BaseRadio.Root>
                <div className="flex flex-col gap-0.5">
                  <span
                    className={radioLabelVariants({
                      size,
                      disabled: isDisabled,
                    })}
                  >
                    {option.label}
                  </span>
                  {option.description && (
                    <span className={radioDescriptionVariants({ size })}>
                      {option.description}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </BaseRadioGroup>
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

RadioGroup.displayName = "RadioGroup";
