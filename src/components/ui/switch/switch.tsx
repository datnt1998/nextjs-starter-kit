"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import { cn } from "@/lib/utils";
import {
  switchRootVariants,
  switchWrapperVariants,
  switchThumbVariants,
  switchLabelVariants,
  switchDescriptionVariants,
  type SwitchVariants,
} from "./switch.variants";

/**
 * Props for the Switch component.
 */
export interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
      "className" | "disabled"
    >,
    SwitchVariants {
  /**
   * Label text for the switch
   */
  label?: string;
  /**
   * Description text to display below the label
   */
  description?: string;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Whether the switch is in a loading state
   */
  loading?: boolean;
  /**
   * Additional className for the wrapper div
   */
  wrapperClassName?: string;
  /**
   * Additional className for the switch root
   */
  className?: string;
  /**
   * Additional className for the label
   */
  labelClassName?: string;
}

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="12"
    height="12"
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
 * A flexible, accessible switch/toggle component with multiple variants and states.
 *
 * Built with Base-UI Switch primitives and styled with Tailwind CSS. Supports
 * multiple visual variants, sizes, loading state, and label/description support.
 * Fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Switch label="Enable notifications" />
 *
 * @example
 * // With description
 * <Switch
 *   label="Dark mode"
 *   description="Use dark theme across the application"
 * />
 *
 * @example
 * // Different variants
 * <Switch label="Enable" variant="success" />
 * <Switch label="Delete" variant="danger" />
 *
 * @example
 * // With loading state
 * <Switch label="Saving..." loading={isSaving} />
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      wrapperClassName,
      className,
      labelClassName,
      variant,
      size,
      label,
      description,
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const switchId = React.useId();
    const descriptionId = `${switchId}-description`;
    const isDisabled = disabled || loading;

    return (
      <div className={cn("flex flex-col gap-1", wrapperClassName)}>
        <label
          className={cn(
            switchWrapperVariants({ disabled: isDisabled }),
            labelClassName
          )}
        >
          <BaseSwitch.Root
            ref={ref}
            disabled={isDisabled}
            className={cn(
              switchRootVariants({
                variant,
                size,
                disabled: isDisabled,
                loading,
              }),
              className
            )}
            aria-describedby={description ? descriptionId : undefined}
            {...props}
          >
            <BaseSwitch.Thumb className={cn(switchThumbVariants({ size }))}>
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Spinner />
                </span>
              )}
            </BaseSwitch.Thumb>
          </BaseSwitch.Root>
          {(label || description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <span
                  className={cn(
                    switchLabelVariants({ size, disabled: isDisabled })
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span
                  id={descriptionId}
                  className={switchDescriptionVariants({ size })}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Switch.displayName = "Switch";
