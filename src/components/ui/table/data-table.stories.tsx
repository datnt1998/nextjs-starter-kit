import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { IconCircleCheck, IconCircleX, IconClock } from "@tabler/icons-react";
import { Button } from "../button";

const meta = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
};

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Manager",
    status: "active",
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "pending",
    createdAt: "2024-04-05",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-02-14",
  },
  {
    id: "7",
    name: "Eve Davis",
    email: "eve@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-03-22",
  },
  {
    id: "8",
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Manager",
    status: "active",
    createdAt: "2024-01-30",
  },
  {
    id: "9",
    name: "Grace Lee",
    email: "grace@example.com",
    role: "User",
    status: "pending",
    createdAt: "2024-04-12",
  },
  {
    id: "10",
    name: "Henry Wilson",
    email: "henry@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-28",
  },
  {
    id: "11",
    name: "Ivy Chen",
    email: "ivy@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-03-15",
  },
  {
    id: "12",
    name: "Jack Taylor",
    email: "jack@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-01-20",
  },
];

// Status filter options
const statusOptions = [
  {
    value: "active",
    label: "Active",
    icon: IconCircleCheck,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: IconCircleX,
  },
  {
    value: "pending",
    label: "Pending",
    icon: IconClock,
  },
];

// Role filter options
const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "User", label: "User" },
];

// Basic columns
const basicColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : status === "inactive"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

// Sortable columns with custom headers
const sortableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : status === "inactive"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {status}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
];

/**
 * Basic data table with default settings
 */
export const Default: Story = {
  args: {
    columns: basicColumns as any,
    data: sampleUsers,
  },
};

/**
 * Data table with search functionality
 */
export const WithSearch: Story = {
  args: {
    columns: sortableColumns as any,
    data: sampleUsers,
    searchKey: "name",
    searchPlaceholder: "Search by name...",
  },
};

/**
 * Data table with faceted filters
 */
export const WithFilters: Story = {
  args: {
    columns: sortableColumns as any,
    data: sampleUsers,
    searchKey: "name",
    searchPlaceholder: "Search users...",
  },
};

/**
 * Data table with custom page sizes
 */
export const CustomPageSizes: Story = {
  args: {
    columns: sortableColumns as any,
    data: sampleUsers,
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20],
    searchKey: "name",
  },
};

/**
 * Data table with striped rows
 */
export const StripedRows: Story = {
  args: {
    columns: sortableColumns as any,
    data: sampleUsers,
    striped: true,
    searchKey: "name",
  },
};

/**
 * Data table without pagination
 */
export const WithoutPagination: Story = {
  args: {
    columns: sortableColumns as any,
    data: sampleUsers.slice(0, 5),
    enablePagination: false,
    searchKey: "name",
  },
};

/**
 * Minimal data table without sorting and filtering
 */
export const Minimal: Story = {
  args: {
    columns: basicColumns as any,
    data: sampleUsers.slice(0, 5),
    enableSorting: false,
    enableFiltering: false,
    enablePagination: false,
  },
};

/**
 * Data table with all features enabled
 */
export const FullFeatured: Story = {
  args: {
    columns: sortableColumns as any,
    data: sampleUsers,
    searchKey: "name",
    searchPlaceholder: "Search users...",
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20],
    striped: true,
  },
};
