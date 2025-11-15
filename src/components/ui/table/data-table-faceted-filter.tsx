"use client";

import * as React from "react";
import { Column } from "@tanstack/react-table";
import { IconCheck, IconFilter, IconX } from "@tabler/icons-react";
import { Button } from "../button";
import { cn } from "@/lib/utils";

export interface DataTableFacetedFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: DataTableFacetedFilterOption[];
}

/**
 * Faceted filter component for data table columns
 */
export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSelect = (value: string) => {
    const newSelectedValues = new Set(selectedValues);
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value);
    } else {
      newSelectedValues.add(value);
    }
    const filterValues = Array.from(newSelectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  const handleClear = () => {
    column?.setFilterValue(undefined);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-9 border-dashed"
      >
        <IconFilter size={16} />
        {title}
        {selectedValues.size > 0 && (
          <>
            <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 mx-1" />
            <div className="rounded-sm bg-primary-100 dark:bg-primary-900 px-1.5 py-0.5 text-xs font-semibold text-primary-700 dark:text-primary-300">
              {selectedValues.size}
            </div>
          </>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 z-50 min-w-[200px] rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {title}
                </span>
                {selectedValues.size > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                const count = facets?.get(option.value) || 0;

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      isSelected &&
                        "bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-100"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border",
                        isSelected
                          ? "border-primary-600 bg-primary-600 text-white"
                          : "border-neutral-300 dark:border-neutral-700"
                      )}
                    >
                      {isSelected && <IconCheck size={12} />}
                    </div>
                    {option.icon && (
                      <option.icon className="h-4 w-4 text-neutral-500" />
                    )}
                    <span className="flex-1">{option.label}</span>
                    {count > 0 && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {count}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
