"use client";

import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full shrink-0",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    AvatarVariantProps {
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback content (usually initials)
   */
  fallback?: React.ReactNode;
  /**
   * Status indicator
   */
  status?: "online" | "offline" | "away" | "busy" | "none";
  /**
   * Show status indicator
   */
  showStatus?: boolean;
}

/**
 * Avatar component built with Base UI
 *
 * Displays user profile images with fallback to initials.
 * Supports status indicators and multiple sizes.
 *
 * @example
 * // With image
 * <Avatar src="https://..." alt="John Doe" fallback="JD" />
 *
 * @example
 * // With status
 * <Avatar fallback="JD" status="online" showStatus />
 *
 * @example
 * // Different sizes
 * <Avatar fallback="JD" size="lg" />
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      fallback,
      status = "none",
      showStatus = false,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const statusColors = {
      online: "bg-success-500",
      offline: "bg-neutral-400",
      away: "bg-warning-500",
      busy: "bg-error-500",
      none: "",
    };

    return (
      <BaseAvatar.Root
        ref={ref}
        className={cn(
          avatarVariants({ size }),
          "relative bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium select-none",
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          {src && (
            <BaseAvatar.Image
              src={src}
              alt={alt}
              className="size-full object-cover"
            />
          )}
          <BaseAvatar.Fallback className="flex size-full items-center justify-center">
            {fallback}
          </BaseAvatar.Fallback>
        </span>

        {showStatus && status !== "none" && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background z-10",
              statusColors[status],
              size === "xs" && "w-2 h-2",
              size === "sm" && "w-2.5 h-2.5",
              size === "md" && "w-3 h-3",
              size === "lg" && "w-3.5 h-3.5",
              size === "xl" && "w-4 h-4"
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </BaseAvatar.Root>
    );
  }
);

Avatar.displayName = "Avatar";
