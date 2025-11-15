"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui-components/react/select";
import { cn } from "@/lib/utils";
import {
  selectTriggerVariants,
  type SelectTriggerVariants,
} from "./select.variants";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectTriggerVariants {
  /**
   * The options to display in the select
   */
  options: SelectOption[];
  /**
   * The selected value(s)
   */
  value?: string | string[];
  /**
   * Callback when the value changes
   */
  onValueChange?: (value: string | string[]) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  /**
   * Error message to display below the select
   */
  error?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * Enable search/filter functionality
   */
  searchable?: boolean;
  /**
   * Enable multi-select
   */
  multiple?: boolean;
  /**
   * Additional className for the trigger
   */
  className?: string;
  /**
   * Additional className for the wrapper div
   */
  wrapperClassName?: string;
}

const ChevronIcon = ({ className }: { className?: string }) => (
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
    className={className}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
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
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Select = ({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  label,
  helperText,
  error,
  disabled,
  required,
  searchable = false,
  multiple = false,
  variant,
  size,
  className,
  wrapperClassName,
}: SelectProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const selectId = React.useId();
  const helperTextId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;
  const hasError = !!error;
  const finalVariant = hasError ? "error" : variant;

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  const selectedOptions = React.useMemo(() => {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return options.filter((opt) => values.includes(opt.value));
  }, [value, options]);

  const displayValue = React.useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (multiple) {
      return selectedOptions.map((opt) => opt.label).join(", ");
    }
    return selectedOptions[0]?.label || placeholder;
  }, [selectedOptions, placeholder, multiple]);

  const handleValueChange = React.useCallback(
    (newValue: string | string[] | null) => {
      if (!onValueChange) return;
      if (newValue === null) {
        onValueChange(multiple ? [] : "");
        return;
      }
      onValueChange(newValue);
    },
    [onValueChange, multiple]
  );

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium text-neutral-900 dark:text-neutral-100",
            disabled && "opacity-50"
          )}
        >
          {label}
          {required && (
            <span
              className="ml-1 text-error-600 dark:text-error-500"
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}

      <BaseSelect.Root
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        multiple={multiple}
        open={open}
        onOpenChange={setOpen}
      >
        <BaseSelect.Trigger
          id={selectId}
          className={cn(
            selectTriggerVariants({ variant: finalVariant, size }),
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : helperText ? helperTextId : undefined
          }
        >
          <BaseSelect.Value className="flex-1 text-left truncate">
            {displayValue}
          </BaseSelect.Value>
          <BaseSelect.Icon>
            <ChevronIcon
              className={cn("transition-transform", open && "rotate-180")}
            />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={4}>
            <BaseSelect.Popup
              className={cn(
                "z-50 min-w-32 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
              )}
            >
              {searchable && (
                <div className="p-2 border-b border-neutral-200 dark:border-neutral-800">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <div className="max-h-[300px] overflow-y-auto p-1">
                {filteredOptions.length === 0 ? (
                  <div className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;

                    return (
                      <BaseSelect.Item
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          "relative flex items-center w-full px-3 py-2 text-sm rounded-sm cursor-pointer select-none",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:outline-none",
                          "data-disabled:pointer-events-none data-disabled:opacity-50",
                          isSelected &&
                            "bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100"
                        )}
                      >
                        {multiple && (
                          <span className="mr-2 flex h-4 w-4 items-center justify-center rounded border border-neutral-300 dark:border-neutral-700">
                            {isSelected && <CheckIcon />}
                          </span>
                        )}
                        <BaseSelect.ItemText className="flex-1">
                          {option.label}
                        </BaseSelect.ItemText>
                        {!multiple && isSelected && (
                          <span className="ml-2">
                            <CheckIcon />
                          </span>
                        )}
                      </BaseSelect.Item>
                    );
                  })
                )}
              </div>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>

      {helperText && !hasError && (
        <p
          id={helperTextId}
          className={cn(
            "text-sm text-neutral-600 dark:text-neutral-400",
            disabled && "opacity-50"
          )}
        >
          {helperText}
        </p>
      )}
      {hasError && (
        <p
          id={errorId}
          className="text-sm text-error-600 dark:text-error-500"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

Select.displayName = "Select";
