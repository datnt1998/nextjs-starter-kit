"use client";

import * as React from "react";
import { Popover as BasePopover } from "@base-ui-components/react/popover";
import { cn } from "@/lib/utils";
import {
  popoverPopupVariants,
  popoverArrowVariants,
  popoverBackdropVariants,
  type PopoverVariants,
} from "./popover.variants";

/**
 * Props for the Popover component.
 */
export interface PopoverProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BasePopover.Root>,
      "children"
    >,
    PopoverVariants {
  /**
   * The element that triggers the popover
   */
  trigger: React.ReactNode;
  /**
   * The content to display in the popover
   */
  children: React.ReactNode;
  /**
   * The side of the trigger to place the popover
   */
  side?: "top" | "bottom" | "left" | "right";
  /**
   * Whether to show an arrow pointing to the trigger
   */
  showArrow?: boolean;
  /**
   * Whether to show a backdrop
   */
  showBackdrop?: boolean;
  /**
   * Whether to show a close button
   */
  showClose?: boolean;
  /**
   * Additional className for the popup
   */
  className?: string;
}

const ArrowSvg = (props: React.ComponentProps<"svg">) => (
  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
    <path
      d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      className="fill-white dark:fill-neutral-800"
    />
    <path
      d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
      className="fill-gray-200 dark:fill-none"
    />
    <path
      d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
      className="dark:fill-gray-700"
    />
  </svg>
);

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

/**
 * A flexible, accessible popover component.
 *
 * Built with Base-UI Popover primitives and styled with Tailwind CSS. Supports
 * multiple placement options, arrow indicator, backdrop, and close button.
 * Fully accessible with proper ARIA attributes.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Popover trigger={<button>Open</button>}>
 *   <div>Popover content</div>
 * </Popover>
 *
 * @example
 * // With backdrop
 * <Popover trigger={<button>Open</button>} showBackdrop>
 *   <div>Popover content</div>
 * </Popover>
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      side = "bottom",
      showArrow = true,
      showBackdrop = false,
      showClose = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <BasePopover.Root {...props}>
        <BasePopover.Trigger>{trigger}</BasePopover.Trigger>
        <BasePopover.Portal>
          {showBackdrop && (
            <BasePopover.Backdrop className={cn(popoverBackdropVariants())} />
          )}
          <BasePopover.Positioner side={side} sideOffset={8}>
            <BasePopover.Popup
              ref={ref}
              className={cn(popoverPopupVariants(), className)}
            >
              {showArrow && (
                <BasePopover.Arrow
                  className={cn(
                    popoverArrowVariants(),
                    "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180"
                  )}
                >
                  <ArrowSvg />
                </BasePopover.Arrow>
              )}
              {showClose && (
                <BasePopover.Close className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  <CloseIcon />
                  <span className="sr-only">Close</span>
                </BasePopover.Close>
              )}
              {children}
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      </BasePopover.Root>
    );
  }
);

Popover.displayName = "Popover";

// Export sub-components for advanced usage
export const PopoverTitle = BasePopover.Title;
export const PopoverDescription = BasePopover.Description;
