"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { avatarVariants, type AvatarVariantProps } from "./avatar.variants";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
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

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
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
    const [imageError, setImageError] = React.useState(false);

    const statusColors = {
      online: "bg-success-500",
      offline: "bg-neutral-400",
      away: "bg-warning-500",
      busy: "bg-error-500",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), "relative", className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">
            {fallback}
          </div>
        )}

        {showStatus && status !== "none" && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
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
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
