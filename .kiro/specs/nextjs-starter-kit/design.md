# Design Document - NextJS Starter Kit

## Overview

The NextJS Starter Kit is a production-ready application template that combines modern frontend technologies into a cohesive, well-structured foundation. The design prioritizes developer experience, type safety, accessibility, and maintainability while providing flexibility for customization.

### Key Design Principles

1. **Type Safety First**: Leverage TypeScript throughout the stack with strict typing
2. **Composition Over Configuration**: Use composable primitives that can be combined flexibly
3. **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
4. **Progressive Enhancement**: Build on web standards with graceful degradation
5. **Developer Experience**: Optimize for fast feedback loops and intuitive APIs

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        NextJS App Router                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages &    │  │  API Routes  │  │  Middleware  │     │
│  │   Layouts    │  │              │  │   (Auth)     │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
├─────────┼──────────────────┼──────────────────┼─────────────┤
│         │                  │                  │              │
│  ┌──────▼───────────────────▼──────────────────▼───────┐   │
│  │              Application Layer                       │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │   │
│  │  │  Zustand   │  │   Nuqs     │  │  TanStack  │   │   │
│  │  │   Store    │  │  (URL)     │  │   Query    │   │   │
│  │  └────────────┘  └────────────┘  └────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              UI Component Layer                       │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │  Base-UI   │  │  Tailwind  │  │    CVA     │    │   │
│  │  │ Components │  │    CSS     │  │  Variants  │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  │  ┌────────────────────────────────────────────┐    │   │
│  │  │         Theme System (CSS Vars)            │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│                    External Services                          │
│  ┌────────────────────┐         ┌────────────────────┐      │
│  │  Supabase Auth     │         │  Supabase DB       │      │
│  └────────────────────┘         └────────────────────┘      │
└───────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
nextjs-starter-kit/
├── .storybook/                 # Storybook configuration
│   ├── main.ts
│   ├── preview.ts
│   └── theme-decorator.tsx
├── src/
│   ├── app/                    # NextJS App Router
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/       # Protected route group
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/               # API routes
│   │   │   └── auth/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # UI Components
│   │   ├── ui/               # Base UI components
│   │   │   ├── button/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── button.stories.tsx
│   │   │   │   └── button.variants.ts
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── dropdown/
│   │   │   ├── table/
│   │   │   └── form/
│   │   ├── features/         # Feature-specific components
│   │   │   ├── auth/
│   │   │   └── dashboard/
│   │   └── layouts/          # Layout components
│   ├── lib/                  # Core utilities and configs
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx
│   │   │   ├── theme-config.ts
│   │   │   └── use-theme.ts
│   │   ├── query/
│   │   │   └── query-provider.tsx
│   │   └── utils.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-table.ts
│   │   └── use-form.ts
│   ├── stores/               # Zustand stores
│   │   ├── auth-store.ts
│   │   └── ui-store.ts
│   ├── types/                # TypeScript types
│   │   ├── auth.ts
│   │   ├── database.ts
│   │   └── components.ts
│   └── styles/               # Style utilities
│       ├── themes/
│       │   ├── default.css
│       │   └── dark.css
│       └── tailwind.css
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── next.config.js           # NextJS configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Components and Interfaces

### 1. Authentication System

#### Supabase Client Configuration

```typescript
// lib/supabase/client.ts
interface SupabaseClientConfig {
  url: string;
  anonKey: string;
}

// lib/supabase/server.ts
interface SupabaseServerConfig extends SupabaseClientConfig {
  cookieOptions: CookieOptions;
}
```

**Design Decisions:**

- Separate client and server Supabase instances for optimal security
- Server-side client uses cookies for session management
- Client-side client for real-time subscriptions and client operations

#### Authentication Middleware

```typescript
// middleware.ts
interface AuthMiddlewareConfig {
  publicRoutes: string[];
  authRoutes: string[];
  protectedRoutes: string[];
  redirects: {
    afterLogin: string;
    afterLogout: string;
  };
}
```

**Design Decisions:**

- Route-based protection using NextJS middleware
- Automatic redirects based on authentication state
- Support for public, auth-only, and protected routes

#### Authentication Hook

```typescript
// hooks/use-auth.ts
interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}
```

### 2. Theme System

#### Theme Configuration

```typescript
// lib/theme/theme-config.ts
interface ThemeConfig {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
  };
  spacing: SpacingScale;
  typography: TypographyConfig;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
}

interface ColorScale {
  50: string;
  100: string;
  // ... through 900
  950: string;
}
```

**Design Decisions:**

- CSS variables for runtime theme switching
- Tailwind config extends theme variables
- Theme values stored in localStorage for persistence
- Support for custom theme creation

#### Theme Provider

```typescript
// lib/theme/theme-provider.tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
}

interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark" | "system") => void;
  systemTheme: "light" | "dark";
}
```

### 3. UI Component System

#### Base Component Pattern

All UI components follow this pattern:

```typescript
// components/ui/button/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**Design Decisions:**

- Base-UI provides headless functionality
- CVA manages variant classes
- Tailwind provides styling
- All components are fully typed
- Consistent API across all components

#### Component Variants with CVA

```typescript
// components/ui/button/button.variants.ts
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700",
        secondary: "bg-secondary-600 text-white hover:bg-secondary-700",
        outline:
          "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
        ghost: "hover:bg-neutral-100 text-neutral-900",
        danger: "bg-error-600 text-white hover:bg-error-700",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### 4. State Management Architecture

#### Zustand Store Pattern

```typescript
// stores/auth-store.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

// stores/ui-store.ts
interface UIState {
  sidebarOpen: boolean;
  modalStack: string[];
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}
```

**Design Decisions:**

- Zustand for client-side application state (UI state, user preferences)
- Separate stores by domain for better organization
- Minimal boilerplate with TypeScript inference

#### URL State with Nuqs

```typescript
// Example usage in components
import { useQueryState } from "nuqs";

// In component
const [search, setSearch] = useQueryState("search");
const [page, setPage] = useQueryState("page", { defaultValue: "1" });
const [sort, setSort] = useQueryState("sort", {
  defaultValue: "name",
  parse: (value) => value as SortOption,
});
```

**Design Decisions:**

- Nuqs for URL-based state (filters, pagination, search)
- Type-safe parsers for complex URL params
- Automatic URL synchronization

#### Server State with TanStack Query

```typescript
// lib/query/query-provider.tsx
interface QueryConfig {
  defaultOptions: {
    queries: {
      staleTime: number;
      cacheTime: number;
      refetchOnWindowFocus: boolean;
    };
  };
}

// Example query hook
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
```

**Design Decisions:**

- TanStack Query for all server data fetching
- Automatic caching and background refetching
- Optimistic updates for mutations
- Integration with Supabase client

### 5. Table System with TanStack Table

```typescript
// components/ui/table/data-table.tsx
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationConfig;
  sorting?: SortingConfig;
  filtering?: FilteringConfig;
}

interface PaginationConfig {
  pageSize: number;
  pageIndex: number;
  onPaginationChange: (pagination: PaginationState) => void;
}
```

**Design Decisions:**

- Headless table logic from TanStack Table
- Styled table components matching theme system
- URL state integration for pagination/sorting/filtering
- Responsive design with mobile-friendly layouts

### 6. Form System with React Hook Form

```typescript
// components/ui/form/form.tsx
interface FormProps<TFormValues extends FieldValues> {
  onSubmit: SubmitHandler<TFormValues>;
  schema: ZodSchema<TFormValues>;
  defaultValues?: DefaultValues<TFormValues>;
  children: React.ReactNode;
}

// Form field component
interface FormFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
}
```

**Design Decisions:**

- React Hook Form for form state management
- Zod for schema validation
- Automatic error handling and display
- Integration with UI components
- Type-safe form values

## Data Models

### User Model

```typescript
// types/auth.ts
interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}
```

### Theme Model

```typescript
// types/theme.ts
interface Theme {
  id: string;
  name: string;
  mode: "light" | "dark";
  colors: ThemeColors;
  isCustom: boolean;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  // ... additional color tokens
}
```

## Error Handling

### Error Boundary Strategy

```typescript
// components/error-boundary.tsx
interface ErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  children: React.ReactNode;
}
```

**Design Decisions:**

- React Error Boundaries for component-level errors
- NextJS error.tsx for route-level errors
- Custom error pages for 404, 500, etc.
- Sentry integration ready (optional)

### API Error Handling

```typescript
// lib/errors.ts
class APIError extends Error {
  constructor(message: string, public statusCode: number, public code: string) {
    super(message);
  }
}

interface ErrorResponse {
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}
```

**Design Decisions:**

- Consistent error format across API routes
- Type-safe error handling with discriminated unions
- User-friendly error messages
- Developer-friendly error logging

## Testing Strategy

### Unit Testing

**Tools**: Vitest + React Testing Library

**Coverage Areas**:

- Utility functions
- Custom hooks
- Component logic
- Store actions

### Component Testing

**Tools**: Storybook + Chromatic (optional)

**Coverage Areas**:

- Visual regression testing
- Component variants
- Interaction testing
- Accessibility testing

### Integration Testing

**Tools**: Playwright

**Coverage Areas**:

- Authentication flows
- Form submissions
- Data fetching and display
- Navigation and routing

### Testing File Structure

```
src/
├── components/
│   └── ui/
│       └── button/
│           ├── button.tsx
│           ├── button.test.tsx
│           └── button.stories.tsx
├── hooks/
│   ├── use-auth.ts
│   └── use-auth.test.ts
└── lib/
    ├── utils.ts
    └── utils.test.ts
```

## Performance Optimization

### Code Splitting Strategy

1. **Route-based splitting**: Automatic with NextJS App Router
2. **Component-based splitting**: Dynamic imports for heavy components
3. **Library splitting**: Separate chunks for large dependencies

### Image Optimization

- Use NextJS Image component for automatic optimization
- Lazy loading for below-fold images
- WebP format with fallbacks

### Font Optimization

- Use NextJS Font optimization
- Preload critical fonts
- Font subsetting for reduced file size

## Security Considerations

### Authentication Security

1. **HTTP-only cookies** for session tokens
2. **CSRF protection** via Supabase built-in mechanisms
3. **Secure cookie flags** in production
4. **Token refresh** handling

### API Security

1. **Rate limiting** on API routes
2. **Input validation** with Zod schemas
3. **SQL injection prevention** via Supabase client
4. **XSS prevention** via React's built-in escaping

### Environment Variables

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

## Deployment Configuration

### Vercel Deployment

**Configuration**:

- Automatic deployments from main branch
- Preview deployments for pull requests
- Environment variables configured in Vercel dashboard
- Edge middleware for authentication

**Build Configuration**:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### Environment Setup

**Required Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## Storybook Configuration

### Storybook Setup

**Addons**:

- @storybook/addon-essentials
- @storybook/addon-a11y
- @storybook/addon-interactions
- @storybook/addon-themes

### Story Pattern

```typescript
// components/ui/button/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};
```

### Theme Integration in Storybook

```typescript
// .storybook/preview.ts
import { ThemeProvider } from "../src/lib/theme/theme-provider";

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  themes: {
    default: "light",
    list: [
      { name: "light", class: "light", color: "#ffffff" },
      { name: "dark", class: "dark", color: "#000000" },
    ],
  },
};
```

## Developer Experience Enhancements

### TypeScript Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## Migration and Upgrade Path

### Version Management

- Lock file committed to repository
- Dependabot for automated dependency updates
- Semantic versioning for starter kit releases

### Breaking Changes

- Documented in CHANGELOG.md
- Migration guides for major versions
- Deprecation warnings before removal

## Documentation Strategy

### README Structure

1. **Quick Start**: Get running in 5 minutes
2. **Features**: Overview of included functionality
3. **Project Structure**: Directory organization
4. **Configuration**: Environment variables and settings
5. **Development**: Local development workflow
6. **Deployment**: Production deployment guide
7. **Customization**: How to customize the starter kit

### Code Documentation

- JSDoc comments for public APIs
- Inline comments for complex logic
- Type definitions serve as documentation
- Storybook for component documentation

## Future Extensibility

### Plugin Architecture

The starter kit is designed to be extended with:

- Additional authentication providers
- Alternative UI component libraries
- Different state management solutions
- Custom theme presets

### Customization Points

1. **Theme System**: Easy to add new themes or modify existing ones
2. **Component Library**: Can swap Base-UI for other headless libraries
3. **Backend**: Can replace Supabase with other backends
4. **Styling**: Can use CSS Modules or styled-components instead of Tailwind

This design provides a solid foundation while remaining flexible for future requirements and customizations.
