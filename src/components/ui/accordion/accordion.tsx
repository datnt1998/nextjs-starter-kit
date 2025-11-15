"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { cn } from "@/lib/utils";
import {
  accordionRootVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionPanelVariants,
  accordionContentVariants,
  type AccordionVariants,
} from "./accordion.variants";

export interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

/**
 * Props for the Accordion component.
 */
export interface AccordionProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>,
      "className"
    >,
    AccordionVariants {
  /**
   * The accordion items to display
   */
  items: AccordionItem[];
  /**
   * Additional className for the root
   */
  className?: string;
}

const ChevronDownIcon = () => (
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
    className="transition-transform duration-200 data-panel-open:rotate-180"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * A flexible, accessible accordion component with multiple variants.
 *
 * Built with Base-UI Accordion primitives and styled with Tailwind CSS. Supports
 * single and multiple expansion modes, different visual variants, and icon indicators.
 * Fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Accordion
 *   items={[
 *     { value: "1", trigger: "Item 1", content: <div>Content 1</div> },
 *     { value: "2", trigger: "Item 2", content: <div>Content 2</div> },
 *   ]}
 * />
 *
 * @example
 * // Multiple expansion mode
 * <Accordion
 *   openMultiple
 *   items={[...]}
 * />
 *
 * @example
 * // Bordered variant
 * <Accordion
 *   variant="bordered"
 *   items={[...]}
 * />
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, variant, className, ...props }, ref) => {
    return (
      <BaseAccordion.Root
        ref={ref}
        className={cn(accordionRootVariants({ variant }), className)}
        {...props}
      >
        {items.map((item) => (
          <BaseAccordion.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(accordionItemVariants({ variant }))}
          >
            <BaseAccordion.Header>
              <BaseAccordion.Trigger
                className={cn(accordionTriggerVariants({ variant }))}
              >
                <span className="flex-1 text-left">{item.trigger}</span>
                <ChevronDownIcon />
              </BaseAccordion.Trigger>
            </BaseAccordion.Header>
            <BaseAccordion.Panel
              className={cn(accordionPanelVariants({ variant }))}
            >
              <div className={cn(accordionContentVariants())}>
                {item.content}
              </div>
            </BaseAccordion.Panel>
          </BaseAccordion.Item>
        ))}
      </BaseAccordion.Root>
    );
  }
);

Accordion.displayName = "Accordion";
