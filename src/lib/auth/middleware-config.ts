/**
 * Authentication middleware configuration
 *
 * This file defines which routes require authentication, which are public,
 * and which are only accessible to unauthenticated users.
 */

export interface MiddlewareConfig {
  publicRoutes: string[];
  authRoutes: string[];
  protectedRoutes: string[];
  redirects: {
    afterLogin: string;
    afterLogout: string;
  };
}

/**
 * Default middleware configuration
 *
 * You can customize these routes based on your application's needs:
 * - publicRoutes: Accessible to everyone (authenticated or not)
 * - authRoutes: Only accessible when NOT authenticated (login, signup, etc.)
 * - protectedRoutes: Only accessible when authenticated
 */
export const middlewareConfig: MiddlewareConfig = {
  // Routes that don't require authentication
  publicRoutes: ["/", "/about", "/contact", "/theme-demo"],

  // Routes that are only accessible when NOT authenticated (e.g., login, signup)
  authRoutes: ["/login", "/signup", "/forgot-password", "/reset-password"],

  // Routes that require authentication
  protectedRoutes: ["/dashboard", "/profile", "/settings"],

  // Redirect paths
  redirects: {
    afterLogin: "/dashboard",
    afterLogout: "/login",
  },
};

/**
 * Checks if a path matches any of the given route patterns
 *
 * @param pathname - The pathname to check
 * @param routes - Array of route patterns to match against
 * @returns true if the pathname matches any of the routes
 */
export function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Exact match
    if (pathname === route) return true;

    // Prefix match (e.g., /dashboard matches /dashboard/*)
    if (pathname.startsWith(route + "/")) return true;

    return false;
  });
}
