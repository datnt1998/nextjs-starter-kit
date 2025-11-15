import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { middlewareConfig, matchesRoute } from "@/lib/auth/middleware-config";

/**
 * NextJS Middleware for authentication and route protection.
 *
 * This middleware runs on every request (except static files) and:
 * 1. Refreshes the user's Supabase session using cookies
 * 2. Checks if the requested route requires authentication
 * 3. Redirects users based on their authentication status and the route type
 *
 * Route Types:
 * - Public: Accessible to everyone (e.g., home page)
 * - Auth: Only for unauthenticated users (e.g., login, signup)
 * - Protected: Only for authenticated users (e.g., dashboard)
 *
 * @param request - The incoming NextJS request
 * @returns Response with updated session cookies or redirect
 */
export async function middleware(request: NextRequest) {
  // Create Supabase client and refresh the session
  // This ensures the session is always up-to-date and handles token refresh
  const { supabaseResponse, user } = await createClient(request);

  const pathname = request.nextUrl.pathname;
  const isAuthenticated = !!user;

  // Determine what type of route the user is trying to access
  // This is used to decide whether to allow access or redirect
  const isPublicRoute = matchesRoute(pathname, middlewareConfig.publicRoutes);
  const isAuthRoute = matchesRoute(pathname, middlewareConfig.authRoutes);
  const isProtectedRoute = matchesRoute(
    pathname,
    middlewareConfig.protectedRoutes
  );

  // Redirect authenticated users away from auth pages
  // Example: If logged in user tries to access /login, redirect to /dashboard
  if (isAuthenticated && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = middlewareConfig.redirects.afterLogin;
    return Response.redirect(redirectUrl);
  }

  // Redirect unauthenticated users away from protected pages
  // Example: If not logged in user tries to access /dashboard, redirect to /login
  // We also store the original URL so we can redirect back after successful login
  if (!isAuthenticated && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = middlewareConfig.redirects.afterLogout;
    // Preserve the intended destination for post-login redirect
    redirectUrl.searchParams.set("redirectTo", pathname);
    return Response.redirect(redirectUrl);
  }

  // Allow the request to proceed for:
  // - Public routes (accessible to everyone)
  // - Authenticated users accessing protected routes
  // - Unauthenticated users accessing auth routes
  // The response includes updated session cookies from Supabase
  return supabaseResponse;
}

/**
 * Matcher configuration for NextJS middleware
 * This tells NextJS which routes should run through the middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
