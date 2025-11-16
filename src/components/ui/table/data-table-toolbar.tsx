"use client";

import * as React from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "../input";
import { Button } from "../button";
import { cn } from "@/lib/utils";

export interface DataTableToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Toolbar component for data table with search and filter controls
 */
export function DataTableToolbar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  children,
  className,
}: DataTableToolbarProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="flex flex-1 items-center gap-2">
        {onSearchChange && (
          <div className="relative max-w-sm flex-1">
            <IconSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
              size={18}
            />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <IconX size={16} />
              </Button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
