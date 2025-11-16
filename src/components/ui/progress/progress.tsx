"use client";

import * as React from "react";
import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import { cn } from "@/lib/utils";
import {
  progressRootVariants,
  progressTrackVariants,
  progressIndicatorVariants,
  type ProgressVariants,
} from "./progress.variants";

/**
 * Props for the Progress component.
 */
export interface ProgressProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseProgress.Root>,
      "className"
    >,
    ProgressVariants {
  /**
   * Label for the progress bar
   */
  label?: string;
  /**
   * Whether to show the percentage value
   */
  showValue?: boolean;
  /**
   * Additional className for the root
   */
  className?: string;
}

/**
 * A flexible, accessible progress component.
 *
 * Built with Base-UI Progress primitives and styled with Tailwind CSS. Supports
 * determinate and indeterminate states, multiple variants and sizes.
 * Fully accessible with proper ARIA attributes.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Progress value={50} />
 *
 * @example
 * // With label and value
 * <Progress value={75} label="Upload progress" showValue />
 *
 * @example
 * // Indeterminate state
 * <Progress />
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { value, label, showValue = false, variant, size, className, ...props },
    ref
  ) => {
    const percentage = typeof value === "number" ? Math.round(value) : undefined;

    return (
      <BaseProgress.Root
        ref={ref}
        value={value}
        className={cn(progressRootVariants(), className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <BaseProgress.Label className="text-sm font-medium text-neutral-900">
                {label}
              </BaseProgress.Label>
            )}
            {showValue && percentage !== undefined && (
              <BaseProgress.Value className="text-sm font-medium text-neutral-600">
                {() => `${percentage}%`}
              </BaseProgress.Value>
            )}
          </div>
        )}
        <BaseProgress.Track className={cn(progressTrackVariants({ size }))}>
          <BaseProgress.Indicator
            className={cn(progressIndicatorVariants({ variant }))}
            style={{
              transform: `translateX(-${100 - (percentage || 0)}%)`,
            }}
          />
        </BaseProgress.Track>
      </BaseProgress.Root>
    );
  }
);

Progress.displayName = "Progress";
