"use client";

import * as React from "react";
import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import { cn } from "@/lib/utils";
import {
  sliderRootVariants,
  sliderTrackVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
  type SliderVariants,
} from "./slider.variants";

/**
 * Props for the Slider component.
 */
export interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
      "className"
    >,
    SliderVariants {
  /**
   * Label for the slider
   */
  label?: string;
  /**
   * Whether to show the current value
   */
  showValue?: boolean;
  /**
   * Additional className for the root
   */
  className?: string;
}

/**
 * A flexible, accessible slider component.
 *
 * Built with Base-UI Slider primitives and styled with Tailwind CSS. Supports
 * single and range sliders, step values, and marks.
 * Fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Slider defaultValue={[50]} />
 *
 * @example
 * // With label and value
 * <Slider defaultValue={[75]} label="Volume" showValue />
 *
 * @example
 * // Range slider
 * <Slider defaultValue={[25, 75]} />
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      label,
      showValue = false,
      size,
      className,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const currentValue = value || defaultValue || [0];
    const displayValue = Array.isArray(currentValue)
      ? currentValue.length === 1
        ? currentValue[0]
        : `${currentValue[0]} - ${currentValue[1]}`
      : currentValue;

    return (
      <BaseSlider.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn(sliderRootVariants(), className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-2 w-full">
            {label && (
              <span className="text-sm font-medium text-neutral-900">
                {label}
              </span>
            )}
            {showValue && (
              <BaseSlider.Value className="text-sm font-medium text-neutral-600">
                {displayValue}
              </BaseSlider.Value>
            )}
          </div>
        )}
        <BaseSlider.Control className="relative flex w-full touch-none select-none items-center">
          <BaseSlider.Track className={cn(sliderTrackVariants({ size }))}>
            <BaseSlider.Indicator className={cn(sliderIndicatorVariants())} />
          </BaseSlider.Track>
          <BaseSlider.Thumb className={cn(sliderThumbVariants({ size }))} />
          {Array.isArray(currentValue) && currentValue.length > 1 && (
            <BaseSlider.Thumb className={cn(sliderThumbVariants({ size }))} />
          )}
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  }
);

Slider.displayName = "Slider";
