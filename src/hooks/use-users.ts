"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Example User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// Example API functions (replace with actual API calls)
async function fetchUsers(): Promise<User[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data with various roles
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: new Date(2024, 0, 15).toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      createdAt: new Date(2024, 1, 20).toISOString(),
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
      createdAt: new Date(2024, 2, 10).toISOString(),
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
      role: "User",
      createdAt: new Date(2024, 0, 25).toISOString(),
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Guest",
      createdAt: new Date(2024, 3, 5).toISOString(),
    },
    {
      id: "6",
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Admin",
      createdAt: new Date(2024, 1, 14).toISOString(),
    },
    {
      id: "7",
      name: "Eve Davis",
      email: "eve@example.com",
      role: "User",
      createdAt: new Date(2024, 2, 22).toISOString(),
    },
    {
      id: "8",
      name: "Frank Miller",
      email: "frank@example.com",
      role: "Manager",
      createdAt: new Date(2024, 0, 30).toISOString(),
    },
    {
      id: "9",
      name: "Grace Lee",
      email: "grace@example.com",
      role: "User",
      createdAt: new Date(2024, 3, 12).toISOString(),
    },
    {
      id: "10",
      name: "Henry Wilson",
      email: "henry@example.com",
      role: "Guest",
      createdAt: new Date(2024, 1, 28).toISOString(),
    },
  ];
}

async function fetchUserById(id: string): Promise<User> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data
  return {
    id,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    createdAt: new Date().toISOString(),
  };
}

async function createUser(
  userData: Omit<User, "id" | "createdAt">
): Promise<User> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: Math.random().toString(36).substr(2, 9),
    ...userData,
    createdAt: new Date().toISOString(),
  };
}

async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id,
    name: userData.name || "Updated User",
    email: userData.email || "updated@example.com",
    role: userData.role || "User",
    createdAt: new Date().toISOString(),
  };
}

async function deleteUser(id: string): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
}

// Query hooks
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // Only run query if id is provided
  });
}

// Mutation hooks with optimistic updates
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUser(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users", id] });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData<User>(["users", id]);

      // Optimistically update to the new value
      if (previousUser) {
        queryClient.setQueryData<User>(["users", id], {
          ...previousUser,
          ...data,
        });
      }

      // Return context with previous value
      return { previousUser };
    },
    onError: (error, { id }, context) => {
      // Rollback to previous value on error
      if (context?.previousUser) {
        queryClient.setQueryData(["users", id], context.previousUser);
      }
      console.error("Failed to update user:", error);
    },
    onSettled: (data, error, { id }) => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["users", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot previous value
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      // Optimistically remove user from list
      if (previousUsers) {
        queryClient.setQueryData<User[]>(
          ["users"],
          previousUsers.filter((user) => user.id !== id)
        );
      }

      return { previousUsers };
    },
    onError: (error, id, context) => {
      // Rollback to previous value on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
      console.error("Failed to delete user:", error);
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
