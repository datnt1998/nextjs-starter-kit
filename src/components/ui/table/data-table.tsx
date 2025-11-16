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
  getFacetedRowModel,
  getFacetedUniqueValues,
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
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";

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
  /** Available page size options for user selection */
  pageSizeOptions?: number[];
  /** Enable column sorting functionality */
  enableSorting?: boolean;
  /** Enable search/filter functionality */
  enableFiltering?: boolean;
  /** Enable pagination controls */
  enablePagination?: boolean;
  /** Enable page size selector */
  enablePageSizeSelector?: boolean;
  /** Sync table state (page, sort, filters) with URL params using Nuqs */
  enableUrlState?: boolean;
  /** Apply zebra striping to table rows for better readability */
  striped?: boolean;
  /** Custom toolbar content (filters, actions, etc.) */
  toolbarContent?: React.ReactNode;
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
 * // With faceted filters
 * <DataTable
 *   columns={columns}
 *   data={users}
 *   toolbarContent={
 *     <>
 *       <DataTableFacetedFilter
 *         column={table.getColumn("status")}
 *         title="Status"
 *         options={statusOptions}
 *       />
 *     </>
 *   }
 * />
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enablePageSizeSelector = true,
  enableUrlState = true,
  striped = false,
  toolbarContent,
}: DataTableProps<TData, TValue>) {
  // Synchronize pagination state with URL parameters
  // This allows users to share or bookmark specific pages
  const [urlPage, setUrlPage] = useQueryState("page", {
    defaultValue: "1",
    parse: (value) => value,
    serialize: (value) => value,
    shallow: false,
  });

  const [urlPageSize, setUrlPageSize] = useQueryState("pageSize", {
    defaultValue: String(pageSize),
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
  const [currentPageSize, setCurrentPageSize] = React.useState(
    enableUrlState ? parseInt(urlPageSize || String(pageSize)) : pageSize
  );

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
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
            pageSize: currentPageSize,
          }
        : undefined,
    },
    initialState: {
      pagination: enablePagination
        ? {
            pageIndex: 0,
            pageSize: currentPageSize,
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

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setCurrentPageSize(newPageSize);
    table.setPageSize(newPageSize);
    if (enableUrlState) {
      setUrlPageSize(String(newPageSize));
      setUrlPage("1"); // Reset to first page
    }
    table.setPageIndex(0);
  };

  return (
    <div className="w-full space-y-4">
      {/* Toolbar with Search and Filters */}
      {(enableFiltering && searchKey) || toolbarContent ? (
        <DataTableToolbar
          searchValue={
            (table.getColumn(searchKey || "")?.getFilterValue() as string) ?? ""
          }
          onSearchChange={
            searchKey
              ? (value) => table.getColumn(searchKey)?.setFilterValue(value)
              : undefined
          }
          searchPlaceholder={searchPlaceholder}
        >
          {toolbarContent}
        </DataTableToolbar>
      ) : null}

      {/* Table */}
      <div className="rounded-md border border-neutral-200 dark:border-neutral-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} hoverable={false}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  className="h-24 text-center text-neutral-500 dark:text-neutral-600"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <DataTablePagination
          pageIndex={table.getState().pagination?.pageIndex || 0}
          pageSize={currentPageSize}
          pageCount={table.getPageCount()}
          totalRows={table.getFilteredRowModel().rows.length}
          selectedRowCount={table.getFilteredSelectedRowModel().rows.length}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPageChange={handlePageChange}
          onPageSizeChange={
            enablePageSizeSelector ? handlePageSizeChange : undefined
          }
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}
