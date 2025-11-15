# TanStack Query Setup

This directory contains the TanStack Query (React Query) configuration and setup for server state management.

## Overview

TanStack Query provides powerful data fetching, caching, and synchronization capabilities for React applications. It handles loading states, error handling, caching, and background refetching automatically.

## Configuration

### Query Client Setup

The query client is configured with sensible defaults in `query-client.ts`:

- **staleTime**: 60 seconds - Data is considered fresh for 1 minute
- **gcTime**: 5 minutes - Unused data is garbage collected after 5 minutes
- **refetchOnWindowFocus**: Enabled in production only
- **retry**: 1 - Failed requests are retried once
- **refetchOnMount**: Enabled - Refetch stale data on component mount

### Provider Setup

The `QueryProvider` component wraps your application and provides the query client to all components. It also includes React Query Devtools in development mode.

```tsx
import { QueryProvider } from "@/lib/query";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

## Usage Patterns

### Basic Query Hook

```tsx
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// In component
function UsersList() {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Query with Parameters

```tsx
export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // Only run if id exists
  });
}
```

### Mutation Hook (Create)

```tsx
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });
}

// In component
function CreateUserForm() {
  const createUser = useCreateUser();

  const handleSubmit = async (data) => {
    try {
      await createUser.mutateAsync(data);
      // Success!
    } catch (error) {
      // Error handled by onError
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createUser.isPending}>
        {createUser.isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

### Mutation with Optimistic Updates

```tsx
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users", id] });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(["users", id]);

      // Optimistically update
      if (previousUser) {
        queryClient.setQueryData(["users", id], {
          ...previousUser,
          ...data,
        });
      }

      return { previousUser };
    },
    onError: (error, { id }, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(["users", id], context.previousUser);
      }
    },
    onSettled: (data, error, { id }) => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
}
```

## Error Handling

### Query Errors

Queries automatically handle errors and expose them through the `isError` and `error` properties:

```tsx
const { data, isError, error } = useUsers();

if (isError) {
  return (
    <div className="error">
      <h2>Error Loading Data</h2>
      <p>{error.message}</p>
      <button onClick={() => refetch()}>Try Again</button>
    </div>
  );
}
```

### Mutation Errors

Mutations provide error handling through callbacks:

```tsx
const mutation = useMutation({
  mutationFn: createUser,
  onError: (error) => {
    // Handle error (show toast, log, etc.)
    console.error("Mutation failed:", error);
  },
  onSuccess: (data) => {
    // Handle success
    console.log("Mutation succeeded:", data);
  },
});
```

## Loading States

### Query Loading

```tsx
const { data, isLoading, isFetching } = useUsers();

// isLoading: true on first load (no cached data)
// isFetching: true whenever fetching (including background refetch)

if (isLoading) {
  return <Spinner />;
}

return (
  <div>
    {isFetching && <div className="loading-indicator">Updating...</div>}
    {/* render data */}
  </div>
);
```

### Mutation Loading

```tsx
const mutation = useCreateUser();

return (
  <button disabled={mutation.isPending}>
    {mutation.isPending ? "Creating..." : "Create User"}
  </button>
);
```

## Best Practices

1. **Use Query Keys Consistently**: Query keys should be arrays that uniquely identify the data

   - `['users']` - List of users
   - `['users', id]` - Single user
   - `['users', { status: 'active' }]` - Filtered users

2. **Invalidate Related Queries**: When mutating data, invalidate related queries

   ```tsx
   queryClient.invalidateQueries({ queryKey: ["users"] });
   ```

3. **Use Optimistic Updates**: For better UX, update the UI immediately and rollback on error

4. **Handle Loading and Error States**: Always provide feedback to users

5. **Enable Queries Conditionally**: Use the `enabled` option to control when queries run

   ```tsx
   useQuery({
     queryKey: ["user", id],
     queryFn: () => fetchUser(id),
     enabled: !!id,
   });
   ```

6. **Use Proper TypeScript Types**: Type your query and mutation functions
   ```tsx
   async function fetchUsers(): Promise<User[]> {
     // implementation
   }
   ```

## React Query Devtools

In development mode, the React Query Devtools are available at the bottom of the screen. They provide:

- Query cache inspection
- Query invalidation
- Mutation tracking
- Performance monitoring

Toggle the devtools by clicking the React Query icon in the bottom corner.

## Example Implementation

See `src/hooks/use-users.ts` for a complete example implementation with:

- Query hooks for fetching data
- Mutation hooks for creating, updating, and deleting
- Optimistic updates
- Error handling
- TypeScript types

See `src/app/query-demo/page.tsx` for a complete UI example demonstrating:

- Loading states
- Error states
- CRUD operations
- Optimistic updates
- Form integration
