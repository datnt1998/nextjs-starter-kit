"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
} from "@/components/ui/table";
import {
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconUser,
  IconShield,
  IconBriefcase,
} from "@tabler/icons-react";

// Sample data type
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
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    role: "Manager",
    status: "active",
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    role: "User",
    status: "pending",
    createdAt: "2024-04-05",
  },
];

// Status filter options
const statusOptions = [
  {
    value: "active",
    label: "Hoạt động",
    icon: IconCircleCheck,
  },
  {
    value: "inactive",
    label: "Không hoạt động",
    icon: IconCircleX,
  },
  {
    value: "pending",
    label: "Chờ xử lý",
    icon: IconClock,
  },
];

// Role filter options
const roleOptions = [
  { value: "Admin", label: "Quản trị viên", icon: IconShield },
  { value: "Manager", label: "Quản lý", icon: IconBriefcase },
  { value: "User", label: "Người dùng", icon: IconUser },
];

/**
 * Example component showing how to use DataTable with filters
 */
export function DataTableExample() {
  // Define columns with sorting
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên" />
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
        <DataTableColumnHeader column={column} title="Vai trò" />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const statusConfig = {
          active: {
            label: "Hoạt động",
            className:
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          },
          inactive: {
            label: "Không hoạt động",
            className:
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          },
          pending: {
            label: "Chờ xử lý",
            className:
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          },
        };

        const config = statusConfig[status as keyof typeof statusConfig];

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
          >
            {config.label}
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
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
    },
  ];

  // Store table instance to access columns for filters
  const [tableInstance, setTableInstance] = React.useState<any>(null);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Quản lý người dùng
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Danh sách người dùng với tính năng tìm kiếm, lọc và phân trang
        </p>
      </div>

      <DataTable
        columns={columns}
        data={sampleUsers}
        searchKey="name"
        searchPlaceholder="Tìm kiếm theo tên..."
        pageSize={5}
        pageSizeOptions={[5, 10, 15, 20]}
        striped
        toolbarContent={
          <>
            <DataTableFacetedFilter
              column={tableInstance?.getColumn("status")}
              title="Trạng thái"
              options={statusOptions}
            />
            <DataTableFacetedFilter
              column={tableInstance?.getColumn("role")}
              title="Vai trò"
              options={roleOptions}
            />
          </>
        }
      />
    </div>
  );
}
