"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarProps {
  /**
   * Navigation items to display
   */
  items: SidebarNavItem[];
  /**
   * Logo or brand element
   */
  logo?: React.ReactNode;
  /**
   * Footer content (e.g., user profile, sign out button)
   */
  footer?: React.ReactNode;
  /**
   * Whether the sidebar is open (for mobile)
   */
  open?: boolean;
  /**
   * Callback when sidebar should close (for mobile)
   */
  onClose?: () => void;
  /**
   * Additional className for the sidebar
   */
  className?: string;
  /**
   * Width of the sidebar (default: w-64)
   */
  width?: string;
  /**
   * Whether to show close button on mobile
   */
  showCloseButton?: boolean;
  /**
   * Whether the sidebar is collapsed (desktop only)
   */
  collapsed?: boolean;
  /**
   * Callback when sidebar collapse state changes
   */
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      logo,
      footer,
      open = false,
      onClose,
      className,
      width = "w-64",
      showCloseButton = true,
      collapsed = false,
      onCollapsedChange,
    },
    ref
  ) => {
    const pathname = usePathname();

    return (
      <aside
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-neutral-200 dark:border-neutral-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 shadow-lg",
          collapsed ? "lg:w-20" : width,
          open ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          {logo && (
            <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200 dark:border-neutral-200">
              <div
                className={cn(
                  "transition-opacity duration-300",
                  collapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                )}
              >
                {logo}
              </div>
              {showCloseButton && onClose && (
                <button
                  onClick={onClose}
                  className="lg:hidden text-primary transition-colors"
                  aria-label="Close sidebar"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {onCollapsedChange && (
                <button
                  onClick={() => onCollapsedChange(!collapsed)}
                  className="hidden lg:block text-neutral-600 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-900 transition-colors"
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <svg
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      collapsed && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const isActive = pathname === item.href;
              const isDisabled = item.disabled;

              if (isDisabled) {
                return (
                  <div
                    key={item.name}
                    className={cn(
                      "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50",
                      "text-neutral-400 dark:text-neutral-500"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <span className="shrink-0">{item.icon}</span>
                      )}
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-100 text-neutral-600 dark:text-neutral-700">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-all duration-200 ease-in-out group relative",
                    isActive
                      ? "bg-primary-100 dark:bg-primary-900/40 text-primary-900 dark:text-primary-100 shadow-sm"
                      : "text-neutral-700 dark:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-100 hover:translate-x-1",
                    collapsed
                      ? "lg:justify-center lg:px-3 py-2"
                      : "justify-between px-4 py-2"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <div
                    className={cn(
                      "flex items-center transition-all duration-300",
                      !collapsed && "gap-3"
                    )}
                  >
                    {item.icon && (
                      <span className="shrink-0 transition-transform duration-200">
                        {item.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        "whitespace-nowrap transition-all duration-300",
                        collapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.badge && !collapsed && (
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full transition-colors duration-200 whitespace-nowrap",
                        isActive
                          ? "bg-primary-200 dark:bg-primary-800/50 text-primary-800 dark:text-primary-200"
                          : "bg-neutral-100 dark:bg-neutral-100 text-neutral-600 dark:text-neutral-700"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          {footer && (
            <div className="border-t border-neutral-200 dark:border-neutral-200">
              {footer}
            </div>
          )}
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

/**
 * Sidebar backdrop for mobile
 */
export interface SidebarBackdropProps {
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export const SidebarBackdrop = ({
  open = false,
  onClose,
  className,
}: SidebarBackdropProps) => {
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-neutral-900/50 lg:hidden",
        className
      )}
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

SidebarBackdrop.displayName = "SidebarBackdrop";

/**
 * Sidebar trigger button for mobile
 */
export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "lg:hidden text-neutral-600 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-900 transition-colors",
        className
      )}
      aria-label="Open sidebar"
      {...props}
    >
      {children || (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";

/**
 * Sidebar content wrapper - use this to offset content when sidebar is visible
 */
export interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Width offset to match sidebar width (default: lg:pl-64)
   * Can be dynamically changed based on collapsed state
   */
  offset?: string;
}

export const SidebarContent = ({
  children,
  className,
  offset = "lg:pl-64",
}: SidebarContentProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        offset,
        className
      )}
    >
      {children}
    </div>
  );
};

SidebarContent.displayName = "SidebarContent";
