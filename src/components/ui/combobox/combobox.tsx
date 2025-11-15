"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui-components/react/combobox";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  /**
   * Array of options to display
   */
  options: ComboboxOption[];
  /**
   * Label for the combobox
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Message to display when no results found
   */
  emptyMessage?: string;
  /**
   * Additional className for the input
   */
  className?: string;
  /**
   * Additional className for the wrapper
   */
  wrapperClassName?: string;
  /**
   * Whether to show clear button
   */
  clearable?: boolean;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: ComboboxOption | null) => void;
  /**
   * Default value
   */
  defaultValue?: ComboboxOption;
}

const Combobox = ({
  options,
  label,
  placeholder = "Select an option...",
  emptyMessage = "No results found.",
  className,
  wrapperClassName,
  clearable = true,
  onValueChange,
  defaultValue,
}: ComboboxProps) => {
  const id = React.useId();

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <ComboboxPrimitive.Root
        items={options}
        onValueChange={(value) =>
          onValueChange?.(value as unknown as ComboboxOption | null)
        }
      >
        <div className="relative flex flex-col gap-1 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
          {label && <label htmlFor={id}>{label}</label>}
          <ComboboxPrimitive.Input
            placeholder={placeholder}
            id={id}
            className={cn(
              "h-10 w-full rounded-md border border-input bg-background px-3.5 pr-16 text-base font-normal text-foreground",
              "focus:outline-2 focus:-outline-offset-1 focus:outline-ring",
              "placeholder:text-muted-foreground",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
          />
          <div className="absolute bottom-0 right-2 flex h-10 items-center justify-center text-muted-foreground">
            {clearable && (
              <ComboboxPrimitive.Clear
                className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0 hover:text-foreground transition-colors"
                aria-label="Clear selection"
              >
                <IconX className="h-4 w-4" />
              </ComboboxPrimitive.Clear>
            )}
            <ComboboxPrimitive.Trigger
              className="flex h-10 w-6 items-center justify-center rounded bg-transparent p-0 hover:text-foreground transition-colors"
              aria-label="Open popup"
            >
              <IconChevronDown className="h-4 w-4" />
            </ComboboxPrimitive.Trigger>
          </div>
        </div>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner className="outline-none" sideOffset={4}>
            <ComboboxPrimitive.Popup
              className={cn(
                "w-(--anchor-width) max-h-[min(var(--available-height),23rem)] max-w-(--available-width)",
                "origin-(--transform-origin) overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain",
                "rounded-md bg-popover py-2 text-popover-foreground shadow-lg border border-border",
                "transition-[transform,scale,opacity]",
                "data-ending-style:scale-95 data-ending-style:opacity-0",
                "data-starting-style:scale-95 data-starting-style:opacity-0"
              )}
            >
              <ComboboxPrimitive.Empty className="px-4 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0">
                {emptyMessage}
              </ComboboxPrimitive.Empty>
              <ComboboxPrimitive.List>
                {(item: ComboboxOption) => (
                  <ComboboxPrimitive.Item
                    key={item.id}
                    value={item}
                    className={cn(
                      "grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none",
                      "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                      "data-disabled:pointer-events-none data-disabled:opacity-50"
                    )}
                  >
                    <ComboboxPrimitive.ItemIndicator className="col-start-1">
                      <IconCheck className="h-3 w-3" />
                    </ComboboxPrimitive.ItemIndicator>
                    <div className="col-start-2">{item.label}</div>
                  </ComboboxPrimitive.Item>
                )}
              </ComboboxPrimitive.List>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </div>
  );
};

Combobox.displayName = "Combobox";

export { Combobox };
