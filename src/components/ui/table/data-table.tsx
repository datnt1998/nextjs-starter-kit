"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "../button";
import { Input } from "../input";

/**
 * Props for the DataTable component.
 *
 * Generic type parameters:
 * - TData: The type of data objects in the table
 * - TValue: The type of cell values (usually inferred)
 */
export interface DataTableProps<TData, TValue> {
  /** Column definitions for the table (from TanStack Table) */
  columns: ColumnDef<TData, TValue>[];
  /** Array of data objects to display in the table */
  data: TData[];
  /** Key of the data object to use for search filtering */
  searchKey?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Number of rows to display per page */
  pageSize?: number;
  /** Enable column sorting functionality */
  enableSorting?: boolean;
  /** Enable search/filter functionality */
  enableFiltering?: boolean;
  /** Enable pagination controls */
  enablePagination?: boolean;
  /** Sync table state (page, sort, filters) with URL params using Nuqs */
  enableUrlState?: boolean;
  /** Apply zebra striping to table rows for better readability */
  striped?: boolean;
}

/**
 * A powerful, feature-rich data table component built with TanStack Table.
 *
 * Provides sorting, filtering, pagination, and URL state synchronization out of the box.
 * The table state can be synchronized with URL parameters, making it shareable and
 * bookmarkable. Fully typed with TypeScript generics for type-safe column definitions.
 *
 * @component
 *
 * @example
 * // Basic usage
 * const columns: ColumnDef<User>[] = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ];
 *
 * <DataTable columns={columns} data={users} />
 *
 * @example
 * // With search and custom page size
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   searchKey="name"
 *   searchPlaceholder="Search by name..."
 *   pageSize={20}
 * />
 *
 * @example
 * // Minimal table without pagination or sorting
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   enablePagination={false}
 *   enableSorting={false}
 *   enableFiltering={false}
 * />
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  pageSize = 10,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableUrlState = true,
  striped = false,
}: DataTableProps<TData, TValue>) {
  // Synchronize pagination state with URL parameters
  // This allows users to share or bookmark specific pages
  const [urlPage, setUrlPage] = useQueryState("page", {
    defaultValue: "1",
    parse: (value) => value,
    serialize: (value) => value,
    shallow: false,
  });

  const [urlSort, setUrlSort] = useQueryState("sort", {
    defaultValue: "",
    parse: (value) => value,
    serialize: (value) => value,
    shallow: false,
  });

  const [urlSearch, setUrlSearch] = useQueryState("search", {
    defaultValue: "",
    parse: (value) => value,
    serialize: (value) => value,
    shallow: false,
  });

  // Parse URL sort state
  const parseSortFromUrl = (sortString: string): SortingState => {
    if (!sortString) return [];
    const [id, desc] = sortString.split(":");
    return [{ id, desc: desc === "desc" }];
  };

  const serializeSortToUrl = (sorting: SortingState): string => {
    if (sorting.length === 0) return "";
    const { id, desc } = sorting[0];
    return `${id}:${desc ? "desc" : "asc"}`;
  };

  // Local state
  const [sorting, setSorting] = React.useState<SortingState>(
    enableUrlState ? parseSortFromUrl(urlSort || "") : []
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Sync sorting with URL
  React.useEffect(() => {
    if (enableUrlState && enableSorting) {
      const sortString = serializeSortToUrl(sorting);
      if (sortString !== urlSort) {
        setUrlSort(sortString || null);
      }
    }
  }, [sorting, enableUrlState, enableSorting]);

  // Sync search with URL
  React.useEffect(() => {
    if (enableUrlState && enableFiltering && searchKey) {
      const searchValue =
        columnFilters.find((f) => f.id === searchKey)?.value || "";
      if (searchValue !== urlSearch) {
        setUrlSearch(searchValue ? String(searchValue) : null);
      }
    }
  }, [columnFilters, enableUrlState, enableFiltering, searchKey]);

  // Initialize search from URL
  React.useEffect(() => {
    if (enableUrlState && urlSearch && searchKey) {
      setColumnFilters([{ id: searchKey, value: urlSearch }]);
    }
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: enablePagination
        ? {
            pageIndex: enableUrlState ? parseInt(urlPage || "1") - 1 : 0,
            pageSize,
          }
        : undefined,
    },
    initialState: {
      pagination: enablePagination
        ? {
            pageIndex: 0,
            pageSize,
          }
        : undefined,
    },
  });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (enableUrlState) {
      setUrlPage(String(newPage + 1));
    }
    table.setPageIndex(newPage);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search/Filter Bar */}
      {enableFiltering && searchKey && (
        <div className="flex items-center gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border border-neutral-200 dark:border-neutral-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} hoverable={false}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center gap-2 cursor-pointer select-none"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {enableSorting && header.column.getCanSort() && (
                            <span className="text-neutral-400">
                              {{
                                asc: "↑",
                                desc: "↓",
                              }[header.column.getIsSorted() as string] ?? "↕"}
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  striped={striped}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow hoverable={false}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-neutral-500 dark:text-neutral-400">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(table.getState().pagination.pageIndex - 1)
                }
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(table.getState().pagination.pageIndex + 1)
                }
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
