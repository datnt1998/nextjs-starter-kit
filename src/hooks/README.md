# Custom Hooks

This directory contains custom React hooks for the application.

## useAuth

The `useAuth` hook provides authentication functionality and state management.

### Usage

```tsx
import { useAuth } from "@/hooks";

function LoginForm() {
  const { signIn, isLoading, user, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await signIn({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (isAuthenticated) {
    return <div>Welcome, {user?.email}!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

### API

#### Return Values

- `user: User | null` - The currently authenticated user
- `session: Session | null` - The current session with tokens
- `isLoading: boolean` - Loading state for auth operations
- `isAuthenticated: boolean` - Whether a user is authenticated
- `signIn: (credentials: SignInCredentials) => Promise<void>` - Sign in with email/password
- `signUp: (credentials: SignUpCredentials) => Promise<void>` - Sign up with email/password
- `signOut: () => Promise<void>` - Sign out the current user

#### Error Handling

All authentication methods throw `AuthError` objects with the following structure:

```typescript
interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: unknown;
}
```

Error codes:

- `invalid_credentials` - Invalid email or password
- `user_not_found` - User does not exist
- `email_already_exists` - Email is already registered
- `weak_password` - Password does not meet requirements
- `network_error` - Network connection issue
- `unknown_error` - Unexpected error

### Features

- **Automatic Session Management**: Syncs with Supabase auth state changes
- **Type-Safe**: Full TypeScript support with proper types
- **Error Handling**: Comprehensive error mapping from Supabase errors
- **State Synchronization**: Uses Zustand store for global auth state
- **Real-time Updates**: Listens to auth state changes across tabs

### Implementation Details

The hook:

1. Initializes auth state on mount by fetching the current session
2. Sets up a listener for auth state changes (login, logout, token refresh)
3. Updates the Zustand store when auth state changes
4. Provides methods for sign in, sign up, and sign out operations
5. Maps Supabase errors to user-friendly error messages

The auth state is stored in a Zustand store (`useAuthStore`) which can be accessed directly if needed, but the `useAuth` hook is the recommended way to interact with authentication.
