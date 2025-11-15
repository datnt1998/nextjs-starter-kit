/**
 * Authentication hook providing comprehensive user authentication functionality.
 *
 * This hook manages authentication state and provides methods for user sign in,
 * sign up, and sign out operations. It automatically synchronizes with Supabase
 * authentication state and persists the session across page reloads.
 *
 * @module useAuth
 */

import { useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type {
  User,
  Session,
  SignInCredentials,
  SignUpCredentials,
  AuthError,
  AuthErrorCode,
} from "@/types/auth";
import { transformSupabaseSession } from "@/types/auth";

/**
 * Maps Supabase error messages to application-specific error codes.
 *
 * Transforms raw Supabase errors into structured AuthError objects with
 * user-friendly messages and error codes for consistent error handling.
 *
 * @param error - The error from Supabase (Error object or string)
 * @returns Structured AuthError with code, message, and details
 *
 * @internal
 */
function mapSupabaseError(error: unknown): AuthError {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const lowerMessage = errorMessage.toLowerCase();

  let code: AuthErrorCode = "unknown_error";
  let message = "An unexpected error occurred";

  if (
    lowerMessage.includes("invalid login credentials") ||
    lowerMessage.includes("invalid credentials")
  ) {
    code = "invalid_credentials";
    message = "Invalid email or password";
  } else if (lowerMessage.includes("user not found")) {
    code = "user_not_found";
    message = "User not found";
  } else if (
    lowerMessage.includes("user already registered") ||
    lowerMessage.includes("already exists")
  ) {
    code = "email_already_exists";
    message = "An account with this email already exists";
  } else if (
    lowerMessage.includes("password") &&
    (lowerMessage.includes("weak") || lowerMessage.includes("short"))
  ) {
    code = "weak_password";
    message = "Password is too weak. Please use at least 6 characters";
  } else if (
    lowerMessage.includes("network") ||
    lowerMessage.includes("fetch")
  ) {
    code = "network_error";
    message = "Network error. Please check your connection";
  }

  return {
    code,
    message,
    details: error,
  };
}

export interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Custom hook for managing user authentication state and operations.
 *
 * Provides a complete authentication interface including user state, session management,
 * and authentication methods. The hook automatically initializes on mount, listens for
 * auth state changes, and synchronizes with Supabase authentication.
 *
 * @returns Authentication state and methods
 *
 * @example
 * // Basic usage in a component
 * function LoginForm() {
 *   const { signIn, isLoading, isAuthenticated } = useAuth();
 *
 *   const handleSubmit = async (email: string, password: string) => {
 *     try {
 *       await signIn({ email, password });
 *       // User is now authenticated
 *     } catch (error) {
 *       console.error('Login failed:', error);
 *     }
 *   };
 *
 *   if (isAuthenticated) {
 *     return <div>Already logged in</div>;
 *   }
 *
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 *
 * @example
 * // Accessing user information
 * function UserProfile() {
 *   const { user, signOut } = useAuth();
 *
 *   if (!user) return null;
 *
 *   return (
 *     <div>
 *       <p>Email: {user.email}</p>
 *       <button onClick={signOut}>Sign Out</button>
 *     </div>
 *   );
 * }
 *
 * @example
 * // Sign up new user
 * function SignUpForm() {
 *   const { signUp, isLoading } = useAuth();
 *
 *   const handleSignUp = async (email: string, password: string, name: string) => {
 *     try {
 *       await signUp({ email, password, name });
 *       // User account created
 *     } catch (error) {
 *       if (error.code === 'email_already_exists') {
 *         alert('This email is already registered');
 *       }
 *     }
 *   };
 *
 *   return <form>...</form>;
 * }
 */
export function useAuth(): UseAuthReturn {
  const supabase = createClient();
  const {
    user,
    session,
    isLoading,
    isAuthenticated,
    setSession,
    setLoading,
    clearAuth,
  } = useAuthStore();

  /**
   * Initializes authentication state and sets up listener for auth changes.
   *
   * On mount:
   * 1. Retrieves the current session from Supabase
   * 2. Updates the auth store with session data
   * 3. Sets up a listener for auth state changes (login, logout, token refresh)
   *
   * The listener automatically updates the store when auth state changes,
   * ensuring the UI stays synchronized with the authentication state.
   */
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (initialSession) {
          setSession(transformSupabaseSession(initialSession));
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (currentSession) {
        setSession(transformSupabaseSession(currentSession));
      } else {
        clearAuth();
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setSession, clearAuth, setLoading]);

  /**
   * Signs in a user with email and password credentials.
   *
   * @param credentials - User email and password
   * @throws {AuthError} If credentials are invalid or network error occurs
   *
   * @example
   * await signIn({ email: 'user@example.com', password: 'password123' });
   */
  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      try {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error) {
          throw mapSupabaseError(error);
        }

        if (data.session) {
          setSession(transformSupabaseSession(data.session));
        }
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    [supabase, setSession, setLoading]
  );

  /**
   * Creates a new user account with email, password, and optional name.
   *
   * Note: Depending on Supabase email confirmation settings, the user may need
   * to verify their email before the session is created.
   *
   * @param credentials - User email, password, and optional name
   * @throws {AuthError} If email already exists or password is too weak
   *
   * @example
   * await signUp({
   *   email: 'user@example.com',
   *   password: 'securePassword123',
   *   name: 'John Doe'
   * });
   */
  const signUp = useCallback(
    async (credentials: SignUpCredentials) => {
      try {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            data: {
              name: credentials.name,
            },
          },
        });

        if (error) {
          throw mapSupabaseError(error);
        }

        // Note: Depending on Supabase settings, user might need to confirm email
        // before session is created
        if (data.session) {
          setSession(transformSupabaseSession(data.session));
        } else {
          // User created but needs to confirm email
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    [supabase, setSession, setLoading]
  );

  /**
   * Signs out the current user and clears the authentication state.
   *
   * Removes the session from Supabase and clears all auth data from the store.
   *
   * @throws {AuthError} If sign out fails (rare)
   *
   * @example
   * await signOut();
   * // User is now signed out and will be redirected by middleware
   */
  const signOut = useCallback(async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw mapSupabaseError(error);
      }

      clearAuth();
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [supabase, clearAuth, setLoading]);

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };
}
