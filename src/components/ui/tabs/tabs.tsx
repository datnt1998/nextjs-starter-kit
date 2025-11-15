"use client";

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cn } from "@/lib/utils";
import {
  tabsListVariants,
  tabVariants,
  tabPanelVariants,
  type TabsVariants,
} from "./tabs.variants";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
}

/**
 * Props for the Tabs component.
 */
export interface TabsProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof BaseTabs.Root>,
      "className" | "orientation"
    >,
    TabsVariants {
  /**
   * The tabs to display
   */
  tabs: TabItem[];
  /**
   * Additional className for the root wrapper
   */
  className?: string;
  /**
   * Additional className for the tabs list
   */
  listClassName?: string;
}

/**
 * A flexible, accessible tabs component with multiple variants and orientations.
 *
 * Built with Base-UI Tabs primitives and styled with Tailwind CSS. Supports
 * multiple visual variants (underline, pills, bordered), sizes, horizontal/vertical
 * orientations, and icon support. Fully accessible with proper ARIA attributes
 * and keyboard navigation.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <Tabs
 *   tabs={[
 *     { value: "1", label: "Tab 1", content: <div>Content 1</div> },
 *     { value: "2", label: "Tab 2", content: <div>Content 2</div> },
 *   ]}
 * />
 *
 * @example
 * // With icons
 * <Tabs
 *   tabs={[
 *     { value: "home", label: "Home", icon: <HomeIcon />, content: <div>Home</div> },
 *     { value: "settings", label: "Settings", icon: <SettingsIcon />, content: <div>Settings</div> },
 *   ]}
 * />
 *
 * @example
 * // Pills variant
 * <Tabs
 *   variant="pills"
 *   tabs={[...]}
 * />
 *
 * @example
 * // Vertical orientation
 * <Tabs
 *   orientation="vertical"
 *   tabs={[...]}
 * />
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      variant,
      orientation = "horizontal",
      size,
      className,
      listClassName,
      ...props
    },
    ref
  ) => {
    return (
      <BaseTabs.Root
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-row gap-4" : "flex-col",
          className
        )}
        {...props}
      >
        <BaseTabs.List
          className={cn(
            tabsListVariants({ variant, orientation, size }),
            listClassName
          )}
        >
          {tabs.map((tab) => (
            <BaseTabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className={cn(tabVariants({ variant, size }))}
            >
              {tab.icon && (
                <span className="inline-flex shrink-0" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </BaseTabs.Tab>
          ))}
        </BaseTabs.List>
        {tabs.map((tab) => (
          <BaseTabs.Panel
            key={tab.value}
            value={tab.value}
            className={cn(tabPanelVariants({ size }))}
          >
            {tab.content}
          </BaseTabs.Panel>
        ))}
      </BaseTabs.Root>
    );
  }
);

Tabs.displayName = "Tabs";
