# Zustand Stores

This directory contains Zustand stores for global state management.

## Available Stores

- **Auth Store** - Authentication state management
- **UI Store** - UI state management (sidebar, modals, preferences)

## Auth Store

The `useAuthStore` manages authentication state across the application.

### Usage

The auth store is primarily used internally by the `useAuth` hook, but can be accessed directly if needed:

```tsx
import { useAuthStore } from "@/stores";

function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.name}</p>
    </div>
  );
}
```

### State

- `user: User | null` - The currently authenticated user
- `session: Session | null` - The current session with tokens
- `isAuthenticated: boolean` - Whether a user is authenticated
- `isLoading: boolean` - Loading state for auth operations

### Actions

- `setUser(user: User | null)` - Set the current user
- `setSession(session: Session | null)` - Set the current session (also updates user)
- `setLoading(isLoading: boolean)` - Set loading state
- `clearAuth()` - Clear all auth state (logout)

### Best Practices

1. **Use the `useAuth` hook** instead of accessing the store directly for authentication operations
2. **Use selectors** to prevent unnecessary re-renders:

   ```tsx
   // Good - only re-renders when user changes
   const user = useAuthStore((state) => state.user);

   // Bad - re-renders on any state change
   const { user } = useAuthStore();
   ```

3. **Don't mutate state directly** - always use the provided actions

### Implementation Notes

The auth store is intentionally simple and focused on state management. All business logic (API calls, error handling) is handled in the `useAuth` hook, keeping the store as a pure state container.

## UI Store

The `useUIStore` manages UI state including sidebar visibility, modal stack, and user preferences with localStorage persistence.

### Usage

```tsx
import { useUIStore } from "@/stores";

function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <aside className={sidebarOpen ? "open" : "closed"}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      {/* Sidebar content */}
    </aside>
  );
}

function ModalExample() {
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const isOpen = useUIStore((state) => state.isModalOpen("settings"));

  return (
    <>
      <button onClick={() => openModal("settings")}>Open Settings</button>
      {isOpen && (
        <div className="modal">
          <h2>Settings</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
}

function PreferencesExample() {
  const compactMode = useUIStore((state) => state.preferences.compactMode);
  const setPreference = useUIStore((state) => state.setPreference);

  return (
    <label>
      <input
        type="checkbox"
        checked={compactMode}
        onChange={(e) => setPreference("compactMode", e.target.checked)}
      />
      Compact Mode
    </label>
  );
}
```

### State

- `sidebarOpen: boolean` - Whether the sidebar is currently open (not persisted)
- `sidebarCollapsed: boolean` - Whether the sidebar is collapsed (persisted)
- `modalStack: string[]` - Stack of open modal IDs (not persisted)
- `preferences: UIPreferences` - User UI preferences (persisted)
  - `sidebarCollapsed: boolean` - Sidebar collapsed state
  - `tablePageSize: number` - Default page size for tables
  - `compactMode: boolean` - Whether to use compact UI mode

### Actions

#### Sidebar Actions

- `toggleSidebar()` - Toggle sidebar open/closed state
- `setSidebarOpen(open: boolean)` - Set sidebar open state
- `toggleSidebarCollapsed()` - Toggle sidebar collapsed state (persisted)
- `setSidebarCollapsed(collapsed: boolean)` - Set sidebar collapsed state (persisted)

#### Modal Actions

- `openModal(modalId: string)` - Add a modal to the stack
- `closeModal()` - Close the topmost modal
- `closeAllModals()` - Close all modals
- `isModalOpen(modalId: string)` - Check if a specific modal is open

#### Preferences Actions

- `setPreference(key, value)` - Update a specific preference
- `resetPreferences()` - Reset all preferences to defaults

### Persistence

The UI store uses Zustand's `persist` middleware to save certain state to localStorage:

- **Persisted**: `sidebarCollapsed`, `preferences`
- **Not Persisted**: `sidebarOpen`, `modalStack`

This ensures user preferences are maintained across sessions while transient UI state resets on page load.

### Best Practices

1. **Use selectors** to prevent unnecessary re-renders:

   ```tsx
   // Good - only re-renders when sidebarOpen changes
   const sidebarOpen = useUIStore((state) => state.sidebarOpen);

   // Bad - re-renders on any state change
   const { sidebarOpen } = useUIStore();
   ```

2. **Modal stack management** - Use unique modal IDs and always close modals properly:

   ```tsx
   // Open modal
   openModal("user-settings");

   // Check if open
   if (isModalOpen("user-settings")) {
     // Modal is open
   }

   // Close topmost modal
   closeModal();
   ```

3. **Preferences** - Use type-safe preference updates:

   ```tsx
   // TypeScript ensures key and value types match
   setPreference("tablePageSize", 20); // ✓ Valid
   setPreference("tablePageSize", "20"); // ✗ Type error
   ```

### Implementation Notes

The UI store uses the `persist` middleware with `partialize` to selectively persist only the state that should survive page reloads. Transient UI state like modal visibility and sidebar open state resets on each page load for a consistent user experience.
