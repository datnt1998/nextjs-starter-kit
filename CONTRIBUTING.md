# Contributing to NextJS Starter Kit

Thank you for your interest in contributing to the NextJS Starter Kit! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect everyone to:

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository**

   Click the "Fork" button on GitHub to create your own copy.

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/nextjs-starter-kit.git
   cd nextjs-starter-kit
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/original-owner/nextjs-starter-kit.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Run Storybook**

   ```bash
   npm run storybook
   ```

## Development Workflow

### Creating a New Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-toast-component`)
- `fix/` - Bug fixes (e.g., `fix/button-loading-state`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-auth-hook`)
- `test/` - Adding or updating tests (e.g., `test/add-button-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Keeping Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch on upstream/main
git rebase upstream/main

# If there are conflicts, resolve them and continue
git rebase --continue
```

## Coding Standards

### TypeScript

- **Use TypeScript for all code** - No JavaScript files
- **Enable strict mode** - Already configured in `tsconfig.json`
- **Avoid `any` type** - Use proper types or `unknown` if necessary
- **Export types** - Make types reusable across the codebase

```typescript
// ✅ Good
interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
}

// ❌ Bad
interface ButtonProps {
  variant: any;
  onClick: any;
}
```

### Code Style

The project uses ESLint and Prettier for code formatting. These run automatically on commit via Husky.

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### File Naming

- **Components**: PascalCase (e.g., `Button.tsx`, `DataTable.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `cn.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useTheme.ts`)
- **Types**: camelCase (e.g., `auth.ts`, `components.ts`)
- **Stories**: Component name + `.stories.tsx` (e.g., `Button.stories.tsx`)

### Import Order

Organize imports in the following order:

1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Internal utilities and hooks
5. Types
6. Styles

```typescript
// 1. React/Next.js
import { useState } from "react";
import Link from "next/link";

// 2. Third-party
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// 3. Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 4. Utilities/Hooks
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

// 5. Types
import type { User } from "@/types/auth";

// 6. Styles
import styles from "./styles.module.css";
```

## Component Guidelines

### Component Structure

```typescript
// 1. Imports
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 2. Variants (if using CVA)
const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'variant-classes',
    },
  },
})

// 3. Types
interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

// 4. Component
export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant }), className)}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'
```

### Component Best Practices

1. **Use forwardRef** for components that wrap HTML elements
2. **Spread props** to allow customization
3. **Use cn utility** for className merging
4. **Set displayName** for better debugging
5. **Export from index.ts** for cleaner imports
6. **Create Storybook stories** for all UI components
7. **Add JSDoc comments** for complex props

### Accessibility

All components must meet WCAG 2.1 Level AA standards:

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast
- Provide focus indicators

```typescript
// ✅ Good - Accessible button
<button
  type="button"
  aria-label="Close dialog"
  onClick={onClose}
>
  <CloseIcon aria-hidden="true" />
</button>

// ❌ Bad - Not accessible
<div onClick={onClose}>
  <CloseIcon />
</div>
```

## Commit Guidelines

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semicolons, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(button): add loading state with spinner"

# Bug fix
git commit -m "fix(auth): resolve token refresh issue"

# Documentation
git commit -m "docs(readme): add deployment instructions"

# With body
git commit -m "feat(table): add sorting functionality

- Add sort icons to column headers
- Implement ascending/descending sort
- Sync sort state with URL params"
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add feature" not "added feature")
- Keep the subject line under 72 characters
- Reference issues in the footer (e.g., "Closes #123")
- Make atomic commits (one logical change per commit)

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest changes from `main`
2. **Run all checks** locally:
   ```bash
   npm run lint
   npm run type-check
   npm run format:check
   npm run build
   ```
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Add or update tests** for new features

### Creating a Pull Request

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a pull request** on GitHub

3. **Fill out the PR template** with:
   - Description of changes
   - Related issues
   - Screenshots (for UI changes)
   - Testing instructions
   - Checklist completion

### PR Title Format

Use the same format as commit messages:

```
feat(component): add new feature
fix(auth): resolve login issue
docs(readme): update installation steps
```

### Review Process

- At least one maintainer must approve the PR
- All CI checks must pass
- Address all review comments
- Keep the PR focused and reasonably sized
- Be responsive to feedback

### After Approval

Once approved, a maintainer will merge your PR. Your contribution will be included in the next release!

## Testing Guidelines

### Writing Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Test Coverage

- Aim for high test coverage on utility functions
- Test component behavior, not implementation details
- Include accessibility tests
- Test error states and edge cases

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

### Code Documentation

Use JSDoc comments for complex functions and components:

```typescript
/**
 * Formats a date string into a human-readable format
 *
 * @param date - The date to format (ISO string or Date object)
 * @param format - The desired format ('short' | 'long' | 'relative')
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15', 'short') // '01/15/2024'
 * formatDate(new Date(), 'relative') // '2 hours ago'
 */
export function formatDate(
  date: string | Date,
  format: "short" | "long" | "relative" = "short"
): string {
  // Implementation
}
```

### Component Documentation

Create Storybook stories for all UI components:

```typescript
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
      description: "The visual style of the button",
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

### README Updates

When adding new features, update the README with:

- Usage examples
- Configuration options
- API documentation
- Migration guides (for breaking changes)

## Questions?

If you have questions or need help:

- Check existing issues and discussions
- Ask in the project's Discord/Slack channel
- Open a new issue with the "question" label

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🎉
