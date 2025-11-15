"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariants } from "./badge.variants";

/**
 * Props for the Badge component.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariants {
  /**
   * Whether to show a dot indicator
   */
  dot?: boolean;
  /**
   * Whether the badge is removable
   */
  removable?: boolean;
  /**
   * Callback when the remove button is clicked
   */
  onRemove?: () => void;
}

const RemoveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * A flexible badge component with multiple variants and sizes.
 *
 * Styled with Tailwind CSS using CVA for variants. Supports
 * color variants, sizes, dot indicator, and removable badges.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Badge>New</Badge>
 *
 * @example
 * // With variant
 * <Badge variant="success">Active</Badge>
 *
 * @example
 * // With dot indicator
 * <Badge dot variant="primary">Online</Badge>
 *
 * @example
 * // Removable badge
 * <Badge removable onRemove={() => console.log('removed')}>
 *   Tag
 * </Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      dot = false,
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "mr-1 h-1.5 w-1.5 rounded-full",
              variant === "primary" && "bg-primary-600",
              variant === "secondary" && "bg-secondary-600",
              variant === "success" && "bg-success-600",
              variant === "warning" && "bg-warning-600",
              variant === "error" && "bg-error-600",
              (variant === "default" || variant === "outline") &&
                "bg-neutral-600"
            )}
            aria-hidden="true"
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
            aria-label="Remove"
          >
            <RemoveIcon />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
