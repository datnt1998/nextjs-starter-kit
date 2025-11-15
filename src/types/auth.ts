/**
 * Authentication types for user and session management
 */

import type {
  User as SupabaseUser,
  Session as SupabaseSession,
} from "@supabase/supabase-js";

/**
 * User model representing an authenticated user
 */
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Session model containing authentication tokens and user data
 */
export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}

/**
 * Credentials for signing in
 */
export interface SignInCredentials {
  email: string;
  password: string;
}

/**
 * Credentials for signing up
 */
export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

/**
 * Authentication error types
 */
export type AuthErrorCode =
  | "invalid_credentials"
  | "user_not_found"
  | "email_already_exists"
  | "weak_password"
  | "network_error"
  | "unknown_error";

/**
 * Authentication error with code and message
 */
export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: unknown;
}

/**
 * Transform Supabase user to application User model
 */
export function transformSupabaseUser(supabaseUser: SupabaseUser): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    emailVerified: !!supabaseUser.email_confirmed_at,
    name: supabaseUser.user_metadata?.name,
    avatar: supabaseUser.user_metadata?.avatar_url,
    createdAt: supabaseUser.created_at,
    updatedAt: supabaseUser.updated_at || supabaseUser.created_at,
  };
}

/**
 * Transform Supabase session to application Session model
 */
export function transformSupabaseSession(
  supabaseSession: SupabaseSession
): Session {
  return {
    accessToken: supabaseSession.access_token,
    refreshToken: supabaseSession.refresh_token,
    expiresAt: supabaseSession.expires_at || 0,
    user: transformSupabaseUser(supabaseSession.user),
  };
}
