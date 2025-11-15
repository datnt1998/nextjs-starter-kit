# NextJS Starter Kit

A production-ready NextJS starter kit with TypeScript, Tailwind CSS, Supabase authentication, and comprehensive tooling for building modern web applications. This starter kit provides a solid foundation with pre-configured state management, data fetching, UI components, and developer tools to accelerate your development workflow.

## ✨ Features

### Core Technologies

- ⚡️ **NextJS 14+** with App Router - Modern React framework with server components
- 🔷 **TypeScript** - Strict type checking for better code quality
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom theme system
- 🔐 **Supabase** - Authentication and backend services

### UI & Components

- 🧩 **Base-UI** - Headless, accessible UI components from MUI team
- 🎭 **CVA** - Type-safe component variants with class-variance-authority
- 🌓 **Theme System** - Dark/light mode with CSS variables and localStorage persistence
- 📚 **Storybook** - Component development and documentation environment

### State Management

- 🔄 **Zustand** - Lightweight state management for client-side state
- 🔗 **Nuqs** - Type-safe URL search params state management
- 🚀 **TanStack Query** - Powerful data fetching and caching

### Data & Forms

- 📊 **TanStack Table** - Headless table library with sorting, filtering, and pagination
- 📝 **React Hook Form** - Performant form management
- ✅ **Zod** - TypeScript-first schema validation

### Developer Experience

- 🔍 **ESLint** - Code linting with NextJS and TypeScript rules
- 💅 **Prettier** - Consistent code formatting
- 🪝 **Husky** - Git hooks for pre-commit linting
- 📦 **Path Aliases** - Clean imports with @ prefix

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- **Supabase Account** (for authentication features)

### Installation

1. **Clone or use this template**

```bash
# Clone the repository
git clone <your-repo-url>
cd nextjs-starter-kit

# Or use as a template on GitHub
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Then update the values in `.env.local` with your Supabase credentials. See the [Environment Variables](#environment-variables) section for details.

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see your application.

### First Steps

After installation, you can:

- **Explore the demo pages** - Visit `/theme-demo`, `/form-demo`, `/table-demo`, and `/query-demo` to see examples
- **View components in Storybook** - Run `npm run storybook` and open [http://localhost:6006](http://localhost:6006)
- **Set up authentication** - Configure your Supabase project and test the login/signup pages
- **Start building** - Create new pages in `src/app/` and components in `src/components/`

## 📁 Project Structure

```
nextjs-starter-kit/
├── .husky/                    # Git hooks configuration
├── .kiro/                     # Kiro specs and documentation
│   └── specs/
│       └── nextjs-starter-kit/
├── .storybook/                # Storybook configuration
│   ├── main.ts               # Storybook main config
│   ├── preview.ts            # Global decorators and parameters
│   └── theme-decorator.tsx   # Theme provider for stories
├── public/                    # Static assets
├── src/
│   ├── app/                  # NextJS App Router
│   │   ├── (auth)/          # Authentication route group
│   │   │   ├── login/       # Login page
│   │   │   ├── signup/      # Signup page
│   │   │   └── layout.tsx   # Auth layout
│   │   ├── (dashboard)/     # Protected dashboard route group
│   │   │   ├── dashboard/   # Dashboard pages
│   │   │   └── layout.tsx   # Dashboard layout
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── button/      # Button component with variants
│   │   │   ├── input/       # Input component
│   │   │   ├── modal/       # Modal/Dialog component
│   │   │   ├── select/      # Select/Dropdown component
│   │   │   ├── form/        # Form components
│   │   │   └── table/       # Table components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── layouts/         # Layout components
│   ├── hooks/               # Custom React hooks
│   │   ├── use-auth.ts      # Authentication hook
│   │   ├── use-users.ts     # User data fetching hook
│   │   └── use-dashboard-stats.ts
│   ├── lib/                 # Core utilities and configurations
│   │   ├── auth/            # Authentication utilities
│   │   ├── query/           # TanStack Query configuration
│   │   ├── supabase/        # Supabase client configuration
│   │   ├── theme/           # Theme system
│   │   ├── validations/     # Zod validation schemas
│   │   ├── env.ts           # Environment variable validation
│   │   └── utils.ts         # Utility functions
│   ├── stores/              # Zustand stores
│   │   ├── auth-store.ts    # Authentication state
│   │   └── ui-store.ts      # UI state (sidebar, modals)
│   ├── styles/              # Style utilities
│   │   └── themes/          # Theme CSS files
│   │       ├── default.css  # Light theme
│   │       └── dark.css     # Dark theme
│   └── types/               # TypeScript type definitions
│       ├── auth.ts          # Authentication types
│       └── index.ts         # Exported types
├── .env.example             # Environment variables template
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── middleware.ts            # NextJS middleware (auth protection)
├── next.config.js           # NextJS configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Supabase Configuration

```bash
# Supabase Project URL
# Find this in your Supabase project settings: Settings > API > Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anonymous Key
# Find this in your Supabase project settings: Settings > API > Project API keys > anon public
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Application Configuration

```bash
# Application URL (used for redirects and absolute URLs)
# Development: http://localhost:3000
# Production: https://your-domain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project or select an existing one
3. Navigate to **Settings** > **API**
4. Copy the **Project URL** and **anon public** key
5. Paste them into your `.env.local` file

See `.env.example` for a complete template with descriptions.

## 🛠️ Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run Storybook for component development
npm run storybook

# Build Storybook for deployment
npm run build-storybook

# Linting
npm run lint          # Check for linting errors
npm run lint:fix      # Fix auto-fixable linting errors

# Formatting
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting without making changes

# Type checking
npm run type-check    # Run TypeScript compiler check
```

### TypeScript Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of: import { Button } from '../../../components/ui/button'
import { Button } from '@/components/ui/button'

// Available aliases:
import { ... } from '@/components/...'  // src/components
import { ... } from '@/lib/...'         // src/lib
import { ... } from '@/hooks/...'       // src/hooks
import { ... } from '@/stores/...'      // src/stores
import { ... } from '@/types/...'       // src/types
```

### Code Quality Tools

#### ESLint

ESLint is configured with NextJS, TypeScript, and React rules to catch errors and enforce best practices.

```bash
# Check for linting errors
npm run lint

# Automatically fix issues
npm run lint:fix
```

Configuration: `.eslintrc.json`

#### Prettier

Prettier ensures consistent code formatting across the entire codebase.

```bash
# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

Configuration: `.prettierrc`

#### Pre-commit Hooks

Husky and lint-staged automatically run linting and formatting on staged files before each commit:

- **ESLint** runs on `.ts` and `.tsx` files
- **Prettier** formats all staged files
- Commits are blocked if there are linting errors

This ensures only properly formatted and linted code enters the repository.

## 🎨 Theme System

The starter kit includes a flexible theme system with dark mode support.

### Using the Theme

```typescript
import { useTheme } from '@/lib/theme/use-theme'

function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle theme
    </button>
  )
}
```

### Theme Options

- `light` - Light theme
- `dark` - Dark theme
- `system` - Follow system preference

### Customizing Themes

Themes are defined using CSS variables in `src/styles/themes/`:

- `default.css` - Light theme colors
- `dark.css` - Dark theme colors

Modify these files to customize colors, spacing, and other design tokens.

## 🔐 Authentication

The starter kit includes Supabase authentication with protected routes.

### Using Authentication

```typescript
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, signIn, signOut, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (!user) {
    return <button onClick={() => signIn({ email, password })}>Sign In</button>
  }

  return <button onClick={signOut}>Sign Out</button>
}
```

### Protected Routes

Routes are protected using NextJS middleware (`middleware.ts`):

- **Public routes**: `/`, `/login`, `/signup`
- **Protected routes**: `/dashboard/*`
- **Auth routes**: Redirect to dashboard if already logged in

### Route Groups

- `(auth)` - Authentication pages (login, signup)
- `(dashboard)` - Protected dashboard pages

## 🧩 UI Components

All UI components are built with Base-UI (headless) and styled with Tailwind CSS. They support theming, variants, and are fully accessible.

### Button

```typescript
import { Button } from '@/components/ui/button'

<Button variant="primary" size="md">
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`  
**Sizes**: `sm`, `md`, `lg`

### Input

```typescript
import { Input } from '@/components/ui/input'

<Input
  label="Email"
  type="email"
  error="Invalid email"
/>
```

### Modal

```typescript
import { Modal } from '@/components/ui/modal'

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal>
```

### Select

```typescript
import { Select } from '@/components/ui/select'

<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

### Form Components

```typescript
import { Form, FormField } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <FormField name="email" label="Email" />
      <FormField name="password" label="Password" type="password" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

### Data Table

```typescript
import { DataTable } from '@/components/ui/table/data-table'

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' }
]

<DataTable columns={columns} data={users} />
```

## 📊 State Management

### Client State (Zustand)

For UI state and client-side application state:

```typescript
import { useUIStore } from '@/stores/ui-store'

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      <button onClick={toggleSidebar}>Toggle</button>
    </aside>
  )
}
```

### URL State (Nuqs)

For state that should be reflected in the URL (filters, pagination, search):

```typescript
import { useQueryState } from 'nuqs'

function SearchPage() {
  const [search, setSearch] = useQueryState('search')
  const [page, setPage] = useQueryState('page', { defaultValue: '1' })

  return (
    <input
      value={search || ''}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}
```

### Server State (TanStack Query)

For data fetching and caching:

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{/* Render users */}</div>
}
```

## 📚 Storybook

Storybook is configured for component development, testing, and documentation.

### Running Storybook

```bash
# Development mode
npm run storybook

# Build static Storybook
npm run build-storybook
```

Open [http://localhost:6006](http://localhost:6006) to view Storybook.

### Features

- 📖 **Auto-generated documentation** for all components
- 🎨 **Theme switching** between light and dark modes
- ♿️ **Accessibility testing** with a11y addon
- 🎮 **Interactive controls** for component props
- 📱 **Responsive viewport** testing

### Available Stories

All UI components have stories demonstrating their usage:

- **Button** - All variants, sizes, loading states, and icon support
- **Input** - Text inputs with labels, errors, and validation states
- **Select** - Dropdowns with search and multi-select
- **Modal** - Dialogs in various sizes with composition
- **Form** - Complete form examples with validation
- **Table** - Data tables with sorting, filtering, and pagination

### Creating New Stories

```typescript
// src/components/ui/my-component/my-component.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./my-component";

const meta: Meta<typeof MyComponent> = {
  title: "UI/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## 🧪 Testing

The starter kit is configured for testing with Vitest and React Testing Library (optional task 18).

### Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```typescript
// src/components/ui/button/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## 🚀 Deployment

### Deploying to Vercel

This starter kit is optimized for deployment on Vercel.

#### Quick Deploy

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect NextJS settings

3. **Configure Environment Variables**

In your Vercel project settings, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

4. **Deploy**

Vercel will automatically deploy your application. Future pushes to `main` will trigger automatic deployments.

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploying to Other Platforms

The starter kit can be deployed to any platform that supports NextJS:

- **Netlify**: Use the NextJS plugin
- **AWS Amplify**: Connect your repository
- **Docker**: Use the included Dockerfile (if added)
- **Self-hosted**: Build and run with `npm run build && npm start`

### Production Checklist

Before deploying to production:

- [ ] Set all environment variables
- [ ] Configure Supabase production project
- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Test authentication flow
- [ ] Run `npm run build` locally to check for errors
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)
- [ ] Configure error tracking (optional)

## 🎯 Usage Examples

### Creating a New Page

```typescript
// src/app/my-page/page.tsx
export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
    </div>
  )
}
```

### Creating a Protected Page

```typescript
// src/app/(dashboard)/my-protected-page/page.tsx
export default function MyProtectedPage() {
  // This page is automatically protected by middleware
  return (
    <div>
      <h1>Protected Content</h1>
    </div>
  )
}
```

### Creating a New Component

```typescript
// src/components/my-component.tsx
import { Button } from '@/components/ui/button'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

### Creating a Custom Hook

```typescript
// src/hooks/use-my-data.ts
import { useQuery } from "@tanstack/react-query";

export function useMyData() {
  return useQuery({
    queryKey: ["my-data"],
    queryFn: async () => {
      const response = await fetch("/api/my-data");
      return response.json();
    },
  });
}
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

MIT

## 🙏 Acknowledgments

This starter kit is built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Base-UI](https://base-ui.com/) - Headless UI components
- [Supabase](https://supabase.com/) - Backend services
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [TanStack Table](https://tanstack.com/table) - Table library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form management
- [Zod](https://zod.dev/) - Schema validation
- [Storybook](https://storybook.js.org/) - Component development

## 📞 Support

If you have questions or need help:

- Check the [documentation](https://github.com/your-repo/wiki)
- Open an [issue](https://github.com/your-repo/issues)
- Join our [Discord community](https://discord.gg/your-invite)

---

Built with ❤️ using NextJS and modern web technologies.
