"use client";

import * as React from "react";
import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import { cn } from "@/lib/utils";

/**
 * Menu Root - Container for the menu
 */
export const MenuRoot = BaseMenu.Root;

/**
 * Menu Trigger - Button that opens the menu
 */
export const MenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseMenu.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
      "bg-background text-foreground border border-input",
      "hover:bg-muted hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-popup-open:bg-muted",
      className
    )}
    {...props}
  >
    {children}
  </BaseMenu.Trigger>
));
MenuTrigger.displayName = "MenuTrigger";

/**
 * Menu Portal - Renders menu in a portal
 */
export const MenuPortal = BaseMenu.Portal;

/**
 * Menu Positioner - Positions the menu popup
 */
export const MenuPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>
>(({ className, ...props }, ref) => (
  <BaseMenu.Positioner
    ref={ref}
    className={cn("outline-none z-50", className)}
    {...props}
  />
));
MenuPositioner.displayName = "MenuPositioner";

/**
 * Menu Popup - The menu content container
 */
export const MenuPopup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>
>(({ className, ...props }, ref) => (
  <BaseMenu.Popup
    ref={ref}
    className={cn(
      "min-w-32 overflow-hidden rounded-md border border-border bg-background p-1 shadow-lg",
      "origin-(--transform-origin)",
      "transition-[transform,scale,opacity] duration-200",
      "data-starting-style:scale-95 data-starting-style:opacity-0",
      "data-ending-style:scale-95 data-ending-style:opacity-0",
      className
    )}
    {...props}
  />
));
MenuPopup.displayName = "MenuPopup";

/**
 * Menu Item - Individual menu item
 */
export const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "transition-colors",
      "focus:bg-muted focus:text-foreground",
      "data-highlighted:bg-muted data-highlighted:text-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
MenuItem.displayName = "MenuItem";

/**
 * Menu Separator - Divider between menu items
 */
export const MenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>
>(({ className, ...props }, ref) => (
  <BaseMenu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
MenuSeparator.displayName = "MenuSeparator";

/**
 * Menu Arrow - Optional arrow pointing to trigger
 */
export const MenuArrow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Arrow>
>(({ className, children, ...props }, ref) => (
  <BaseMenu.Arrow
    ref={ref}
    className={cn(
      "data-[side=bottom]:top-[-8px]",
      "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
      "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
      className
    )}
    {...props}
  >
    {children || (
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        className="fill-background stroke-border"
      >
        <path d="M0 10 L10 0 L20 10" strokeWidth="1" />
      </svg>
    )}
  </BaseMenu.Arrow>
));
MenuArrow.displayName = "MenuArrow";

/**
 * Menu Label - Label for a group of menu items
 */
export const MenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      className
    )}
    {...props}
  />
));
MenuLabel.displayName = "MenuLabel";

// Export all components
export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Item: MenuItem,
  Separator: MenuSeparator,
  Arrow: MenuArrow,
  Label: MenuLabel,
};
