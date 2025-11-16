"use client";

import { Suspense } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock data type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
};

// Mock data
const mockUsers: User[] = [
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
    role: "Editor",
    status: "active",
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "active",
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
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-03-22",
  },
  {
    id: "8",
    name: "Fiona Green",
    email: "fiona@example.com",
    role: "Editor",
    status: "active",
    createdAt: "2024-01-30",
  },
  {
    id: "9",
    name: "George Miller",
    email: "george@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-04-12",
  },
  {
    id: "10",
    name: "Hannah Lee",
    email: "hannah@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-28",
  },
  {
    id: "11",
    name: "Ian Malcolm",
    email: "ian@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-03-15",
  },
  {
    id: "12",
    name: "Julia Roberts",
    email: "julia@example.com",
    role: "Editor",
    status: "inactive",
    createdAt: "2024-01-18",
  },
];

// Column definitions
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-neutral-600 dark:text-neutral-600">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            role === "Admin"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
              : role === "Editor"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                : "bg-neutral-100 text-neutral-800 dark:bg-neutral-100 dark:text-neutral-700"
          }`}
        >
          {role}
        </span>
      );
    },
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
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-neutral-600 dark:text-neutral-600">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert(`Edit user: ${user.name}`)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert(`Delete user: ${user.name}`)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Container } from "@/components/ui/container";

function TablesContent() {
  return (
    <div className="space-y-8">
          {/* Full-featured table */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Full-Featured Table (with URL state)
            </h2>
            <DataTable
              columns={columns}
              data={mockUsers}
              searchKey="name"
              searchPlaceholder="Search by name..."
              pageSize={5}
              enableSorting={true}
              enableFiltering={true}
              enablePagination={true}
              enableUrlState={true}
            />
          </div>

          {/* Striped table without URL state */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Striped Table (without URL state)
            </h2>
            <DataTable
              columns={columns}
              data={mockUsers}
              searchKey="email"
              searchPlaceholder="Search by email..."
              pageSize={5}
              enableSorting={true}
              enableFiltering={true}
              enablePagination={true}
              enableUrlState={false}
              striped={true}
            />
          </div>

          {/* Simple table without pagination */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Simple Table (no pagination)
            </h2>
            <DataTable
              columns={columns}
              data={mockUsers.slice(0, 5)}
              enableSorting={true}
              enableFiltering={false}
              enablePagination={false}
              enableUrlState={false}
            />
          </div>
    </div>
  );
}

export default function TableDemoPage() {
  return (
    <DashboardLayout>
      <Container size="2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">DataTable Demo</h1>
          <p className="text-neutral-600 dark:text-neutral-600">
            A demonstration of the DataTable component with sorting, filtering,
            and pagination.
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TablesContent />
        </Suspense>
      </Container>
    </DashboardLayout>
  );
}
