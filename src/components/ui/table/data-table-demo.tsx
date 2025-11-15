"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader } from "@/components/ui/table";

// Sample data type
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

// Sample data
const products: Product[] = [
  { id: "1", name: "Laptop", category: "Electronics", price: 999, stock: 15 },
  { id: "2", name: "Mouse", category: "Electronics", price: 29, stock: 50 },
  { id: "3", name: "Keyboard", category: "Electronics", price: 79, stock: 30 },
  { id: "4", name: "Monitor", category: "Electronics", price: 299, stock: 20 },
  { id: "5", name: "Desk", category: "Furniture", price: 399, stock: 10 },
  { id: "6", name: "Chair", category: "Furniture", price: 199, stock: 25 },
  { id: "7", name: "Lamp", category: "Furniture", price: 49, stock: 40 },
  { id: "8", name: "Notebook", category: "Stationery", price: 5, stock: 100 },
  { id: "9", name: "Pen", category: "Stationery", price: 2, stock: 200 },
  { id: "10", name: "Pencil", category: "Stationery", price: 1, stock: 300 },
];

/**
 * Demo component showing DataTable with sorting
 */
export function DataTableDemo() {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product Name" />
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return <span>${price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock" />
      ),
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return (
          <span
            className={
              stock < 20
                ? "text-red-600 dark:text-red-400"
                : stock < 50
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-green-600 dark:text-green-400"
            }
          >
            {stock}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Product Inventory
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Click on column headers to sort. Try sorting by price or stock!
        </p>
      </div>

      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        searchPlaceholder="Search products..."
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        enableSorting={true}
        striped
      />
    </div>
  );
}
