/**
 * Zustand store for authentication state management
 */

import { create } from "zustand";
import type { User, Session } from "@/types/auth";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAuth: () => void;
}

/**
 * Authentication store using Zustand
 * Manages user and session state across the application
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setSession: (session) =>
    set({
      session,
      user: session?.user || null,
      isAuthenticated: !!session,
    }),

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  clearAuth: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
