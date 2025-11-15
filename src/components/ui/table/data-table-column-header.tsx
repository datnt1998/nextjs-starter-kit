"use client";

import * as React from "react";
import { Column } from "@tanstack/react-table";
import {
  IconArrowUp,
  IconArrowDown,
  IconArrowsSort,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * Column header component with sorting functionality
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sorted = column.getIsSorted();

  return (
    <div
      className={cn(
        "flex items-center gap-2 cursor-pointer select-none hover:text-neutral-900 dark:hover:text-neutral-100",
        className
      )}
      onClick={column.getToggleSortingHandler()}
    >
      <span>{title}</span>
      {sorted === "asc" && (
        <IconArrowUp
          size={16}
          className="text-neutral-600 dark:text-neutral-400"
        />
      )}
      {sorted === "desc" && (
        <IconArrowDown
          size={16}
          className="text-neutral-600 dark:text-neutral-400"
        />
      )}
      {!sorted && (
        <IconArrowsSort
          size={16}
          className="text-neutral-400 dark:text-neutral-600"
        />
      )}
    </div>
  );
}
