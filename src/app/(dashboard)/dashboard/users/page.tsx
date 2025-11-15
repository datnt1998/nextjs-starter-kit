"use client";

/**
 * Users table page demonstrating full DataTable functionality
 * - Server-side pagination with Nuqs
 * - Sorting and filtering with URL state
 * - Search functionality
 * - CRUD operations with modals
 */

import { useState, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DataTableColumnHeader } from "@/components/ui/table";
import { DataTableWithFilters } from "@/components/ui/table/data-table-with-filters";
import { DataTableFacetedFilter } from "@/components/ui/table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  IconShield,
  IconUser,
  IconUsers,
  IconUserCog,
} from "@tabler/icons-react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  type User,
} from "@/hooks/use-users";

export default function UsersTablePage() {
  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  // Fetch users
  const { data: users = [], isLoading, error } = useUsers();

  // Mutations
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  // Role filter options
  const roleOptions = [
    { value: "Admin", label: "Admin", icon: IconShield },
    { value: "Manager", label: "Manager", icon: IconUserCog },
    { value: "User", label: "User", icon: IconUser },
    { value: "Guest", label: "Guest", icon: IconUsers },
  ];

  // Define columns
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ getValue }) => (
          <div className="font-medium text-neutral-900 dark:text-neutral-50">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ getValue }) => (
          <div className="text-neutral-600 dark:text-neutral-400">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ getValue }) => {
          const role = getValue() as string;
          const roleConfig: Record<
            string,
            { className: string; icon: React.ComponentType<any> }
          > = {
            Admin: {
              className:
                "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
              icon: IconShield,
            },
            Manager: {
              className:
                "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
              icon: IconUserCog,
            },
            User: {
              className:
                "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
              icon: IconUser,
            },
            Guest: {
              className:
                "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
              icon: IconUsers,
            },
          };

          const config = roleConfig[role] || roleConfig.User;
          const Icon = config.icon;

          return (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
            >
              <Icon size={14} />
              {role}
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
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ getValue }) => (
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date(getValue() as string).toLocaleDateString()}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteClick(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Handlers
  const handleCreate = () => {
    setFormData({ name: "", email: "", role: "User" });
    setIsCreateModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCreateSubmit = async () => {
    try {
      await createMutation.mutateAsync(formData);
      setIsCreateModalOpen(false);
      setFormData({ name: "", email: "", role: "" });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!selectedUser) return;
    try {
      await updateMutation.mutateAsync({
        id: selectedUser.id,
        data: formData,
      });
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setFormData({ name: "", email: "", role: "" });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    try {
      await deleteMutation.mutateAsync(selectedUser.id);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Loading users...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            Users
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage users with full table functionality including sorting,
            filtering, and pagination
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-error-600 dark:text-error-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-error-900 dark:text-error-200">
                  Failed to load users
                </h3>
                <p className="text-sm text-error-700 dark:text-error-300 mt-1">
                  {error instanceof Error ? error.message : "An error occurred"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {users.length} total users
            </div>
            <Button onClick={handleCreate}>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add User
            </Button>
          </div>
        </div>

        {/* Table with built-in search, sorting, filtering, and pagination */}
        <DataTableWithFilters
          columns={columns}
          data={users}
          searchKey="name"
          searchPlaceholder="Search by name..."
          enableSorting={true}
          enableFiltering={true}
          enablePagination={true}
          enableUrlState={true}
          striped={true}
          renderFilters={(table) => (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              title="Role"
              options={roleOptions}
            />
          )}
        />
      </div>

      {/* Create Modal */}
      <Modal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        size="md"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6">
            Create User
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Role
              </label>
              <Input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="Enter role"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleCreateSubmit}
              isLoading={createMutation.isPending}
              disabled={!formData.name || !formData.email || !formData.role}
            >
              Create
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} size="md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6">
            Edit User
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Role
              </label>
              <Input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="Enter role"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleUpdateSubmit}
              isLoading={updateMutation.isPending}
              disabled={!formData.name || !formData.email || !formData.role}
            >
              Update
            </Button>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        size="sm"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
            Delete User
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Are you sure you want to delete {selectedUser?.name}? This action
            cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={deleteMutation.isPending}
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
