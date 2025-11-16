"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  alertVariants,
  alertTitleVariants,
  alertDescriptionVariants,
  type AlertVariants,
} from "./alert.variants";

/**
 * Props for the Alert component.
 */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AlertVariants {
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Title of the alert
   */
  title?: string;
  /**
   * Badge/label text to display in top-right corner
   */
  badge?: string;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const defaultIcons = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/**
 * A flexible alert component with multiple variants.
 *
 * Styled with Tailwind CSS using CVA for variants. Supports
 * different alert types with icons, badges, and dismissible functionality.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Alert variant="info">This is an info alert</Alert>
 *
 * @example
 * // With title and badge
 * <Alert variant="success" title="Success" badge="New">
 *   Your changes have been saved.
 * </Alert>
 *
 * @example
 * // Gradient variant
 * <Alert variant="gradient" gradient="primary" title="Public Search Mode" badge="0 left" dismissible>
 *   You're seeing estimated ride fares. Connect your accounts for personalized pricing.
 * </Alert>
 *
 * @example
 * // Dismissible
 * <Alert variant="warning" dismissible onDismiss={() => console.log('dismissed')}>
 *   Warning message
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      gradient,
      icon,
      title,
      badge,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const displayIcon =
      icon !== undefined
        ? icon
        : variant && variant !== "default" && variant !== "gradient"
          ? defaultIcons[variant as keyof typeof defaultIcons]
          : null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant, gradient, dismissible }),
          className
        )}
        {...props}
      >
        {displayIcon}
        <div className="flex-1">
          {title && (
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className={cn(alertTitleVariants())}>{title}</div>
              {badge && (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    variant === "gradient"
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  )}
                >
                  {badge}
                </span>
              )}
            </div>
          )}
          <div className={cn(alertDescriptionVariants())}>{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
              variant === "gradient"
                ? "text-white focus:ring-white/50"
                : "focus:ring-primary-500"
            )}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
