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

export interface DataTableWithFiltersProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enablePageSizeSelector?: boolean;
  enableUrlState?: boolean;
  striped?: boolean;
  renderFilters?: (table: any) => React.ReactNode;
}

/**
 * DataTable variant that exposes table instance for custom filters
 */
export function DataTableWithFilters<TData, TValue>({
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
  renderFilters,
}: DataTableWithFiltersProps<TData, TValue>) {
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

  React.useEffect(() => {
    if (enableUrlState && enableSorting) {
      const sortString = serializeSortToUrl(sorting);
      if (sortString !== urlSort) {
        setUrlSort(sortString || null);
      }
    }
  }, [sorting, enableUrlState, enableSorting]);

  React.useEffect(() => {
    if (enableUrlState && enableFiltering && searchKey) {
      const searchValue =
        columnFilters.find((f) => f.id === searchKey)?.value || "";
      if (searchValue !== urlSearch) {
        setUrlSearch(searchValue ? String(searchValue) : null);
      }
    }
  }, [columnFilters, enableUrlState, enableFiltering, searchKey]);

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

  const handlePageChange = (newPage: number) => {
    if (enableUrlState) {
      setUrlPage(String(newPage + 1));
    }
    table.setPageIndex(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setCurrentPageSize(newPageSize);
    table.setPageSize(newPageSize);
    if (enableUrlState) {
      setUrlPageSize(String(newPageSize));
      setUrlPage("1");
    }
    table.setPageIndex(0);
  };

  return (
    <div className="w-full space-y-4">
      {(enableFiltering && searchKey) || renderFilters ? (
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
          {renderFilters?.(table)}
        </DataTableToolbar>
      ) : null}

      <div className="rounded-md border border-neutral-200 dark:border-neutral-700">
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
                  className="h-24 text-center text-neutral-500 dark:text-neutral-400"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
