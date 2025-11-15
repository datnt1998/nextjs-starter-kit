# Authentication Middleware

This directory contains the authentication middleware configuration for route protection in the NextJS Starter Kit.

## Overview

The authentication middleware automatically:

- Refreshes user sessions on every request
- Protects routes based on authentication state
- Redirects users based on their authentication status
- Stores the original URL for post-login redirects

## Route Types

### Public Routes

Routes accessible to everyone (authenticated or not):

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/theme-demo` - Theme demo page

### Auth Routes

Routes only accessible when NOT authenticated (redirects to dashboard if logged in):

- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Forgot password page
- `/reset-password` - Reset password page

### Protected Routes

Routes only accessible when authenticated (redirects to login if not logged in):

- `/dashboard` - Dashboard page
- `/profile` - User profile page
- `/settings` - Settings page

## Configuration

You can customize the route configuration in `src/lib/auth/middleware-config.ts`:

```typescript
export const middlewareConfig: MiddlewareConfig = {
  publicRoutes: ["/", "/about", "/contact", "/theme-demo"],
  authRoutes: ["/login", "/signup", "/forgot-password", "/reset-password"],
  protectedRoutes: ["/dashboard", "/profile", "/settings"],
  redirects: {
    afterLogin: "/dashboard",
    afterLogout: "/login",
  },
};
```

## How It Works

1. **Session Refresh**: On every request, the middleware refreshes the user's session using Supabase
2. **Route Matching**: The middleware checks if the current path matches any configured route patterns
3. **Authentication Check**: Based on the user's authentication state and the route type, the middleware either:
   - Allows the request to continue
   - Redirects to the login page (for protected routes when not authenticated)
   - Redirects to the dashboard (for auth routes when authenticated)

## Route Matching

Routes are matched using two patterns:

- **Exact match**: `/dashboard` matches exactly `/dashboard`
- **Prefix match**: `/dashboard` also matches `/dashboard/settings`, `/dashboard/profile`, etc.

## Redirect Behavior

### Protected Routes

When an unauthenticated user tries to access a protected route:

- They are redirected to the login page
- The original URL is stored in the `redirectTo` query parameter
- After successful login, they can be redirected back to the original page

Example: `/dashboard` → `/login?redirectTo=/dashboard`

### Auth Routes

When an authenticated user tries to access an auth route (like login):

- They are redirected to the dashboard
- This prevents logged-in users from seeing the login page

## Usage in Components

To check authentication state in your components, use the `useAuth` hook (to be implemented in task 6):

```typescript
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.email}</div>;
}
```

## Middleware Matcher

The middleware runs on all routes except:

- Static files (`_next/static`)
- Image optimization files (`_next/image`)
- Favicon
- Public image files (svg, png, jpg, jpeg, gif, webp)

This is configured in the `matcher` export in `middleware.ts`.
