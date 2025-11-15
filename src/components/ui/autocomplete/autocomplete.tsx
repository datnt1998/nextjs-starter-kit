"use client";

import * as React from "react";
import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import { IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface AutocompleteOption {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteProps {
  /**
   * Array of options to display
   */
  options: AutocompleteOption[];
  /**
   * Label for the autocomplete input
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
  onValueChange?: (value: AutocompleteOption | null) => void;
  /**
   * Default value
   */
  defaultValue?: AutocompleteOption;
}

const Autocomplete = ({
  options,
  label,
  placeholder = "Type to search...",
  emptyMessage = "No results found.",
  className,
  wrapperClassName,
  clearable = true,
  onValueChange,
  defaultValue,
}: AutocompleteProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <AutocompletePrimitive.Root
        items={options}
        onValueChange={(value) =>
          onValueChange?.(value as unknown as AutocompleteOption | null)
        }
      >
        {label && (
          <label className="text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
            {label}
          </label>
        )}
        <AutocompletePrimitive.Input
          placeholder={placeholder}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background px-3.5 text-base text-foreground",
            "focus:outline-2 focus:-outline-offset-1 focus:outline-ring",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        />

        {clearable && (
          <AutocompletePrimitive.Clear className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-sm opacity-50 hover:opacity-100 transition-opacity">
            <IconX className="h-4 w-4" />
          </AutocompletePrimitive.Clear>
        )}

        <AutocompletePrimitive.Portal>
          <AutocompletePrimitive.Positioner
            className="outline-none"
            sideOffset={4}
          >
            <AutocompletePrimitive.Popup
              className={cn(
                "w-(--anchor-width) max-h-[min(var(--available-height),23rem)] max-w-(--available-width)",
                "overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain",
                "rounded-md bg-popover py-2 text-popover-foreground shadow-lg border border-border",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
              )}
            >
              <AutocompletePrimitive.Empty className="px-4 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0">
                {emptyMessage}
              </AutocompletePrimitive.Empty>
              <AutocompletePrimitive.List>
                {(option: AutocompleteOption) => (
                  <AutocompletePrimitive.Item
                    key={option.id}
                    className={cn(
                      "relative flex cursor-default items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none",
                      "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                      "data-disabled:pointer-events-none data-disabled:opacity-50"
                    )}
                    value={option}
                  >
                    <span className="flex h-4 w-4 items-center justify-center">
                      <IconCheck className="h-4 w-4 opacity-0 data-selected:opacity-100" />
                    </span>
                    {option.label}
                  </AutocompletePrimitive.Item>
                )}
              </AutocompletePrimitive.List>
            </AutocompletePrimitive.Popup>
          </AutocompletePrimitive.Positioner>
        </AutocompletePrimitive.Portal>
      </AutocompletePrimitive.Root>
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";

export { Autocomplete };
