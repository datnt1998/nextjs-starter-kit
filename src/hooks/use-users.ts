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

  // Mock data
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      createdAt: new Date().toISOString(),
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
