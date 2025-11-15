"use client";

import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { Button } from "../button";
import { Select } from "../select";
import { cn } from "@/lib/utils";

export interface DataTablePaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalRows: number;
  selectedRowCount?: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

/**
 * Pagination controls for data table
 */
export function DataTablePagination({
  pageIndex,
  pageSize,
  pageCount,
  totalRows,
  selectedRowCount = 0,
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
}: DataTablePaginationProps) {
  const pageSizeSelectOptions = pageSizeOptions.map((size) => ({
    value: String(size),
    label: `${size} rows`,
  }));

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 px-2",
        className
      )}
    >
      <div className="flex-1 text-sm text-neutral-500 dark:text-neutral-400">
        {selectedRowCount > 0 ? (
          <span>
            {selectedRowCount} of {totalRows} row(s) selected
          </span>
        ) : (
          <span>
            Showing {pageIndex * pageSize + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, totalRows)} of {totalRows}{" "}
            results
          </span>
        )}
      </div>

      <div className="flex items-center gap-6">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Rows per page
            </span>
            <Select
              options={pageSizeSelectOptions}
              value={String(pageSize)}
              onValueChange={(value) =>
                onPageSizeChange(Number(value as string))
              }
              className="w-[120px]"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Page {pageIndex + 1} of {pageCount}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(0)}
            disabled={!canPreviousPage}
            className="h-8 w-8 p-0"
          >
            <IconChevronsLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={!canPreviousPage}
            className="h-8 w-8 p-0"
          >
            <IconChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!canNextPage}
            className="h-8 w-8 p-0"
          >
            <IconChevronRight size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={!canNextPage}
            className="h-8 w-8 p-0"
          >
            <IconChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
