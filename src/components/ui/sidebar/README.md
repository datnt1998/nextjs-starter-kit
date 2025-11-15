# Sidebar Component

A flexible and reusable sidebar component with mobile support, dark mode, and customizable navigation items.

## Features

- ✅ Responsive design (mobile drawer + desktop sidebar)
- ✅ Dark mode support
- ✅ Icon support for navigation items
- ✅ Badge support (numbers or text)
- ✅ Disabled items
- ✅ Active state highlighting
- ✅ Customizable logo/brand
- ✅ Footer section for user profile
- ✅ Smooth animations
- ✅ Accessible (keyboard navigation, ARIA labels)

## Components

### Sidebar

Main sidebar component with navigation items.

```tsx
import { Sidebar } from "@/components/ui/sidebar";

<Sidebar
  items={navigationItems}
  open={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  logo={<div>My App</div>}
  footer={<UserProfile />}
/>;
```

### SidebarBackdrop

Backdrop overlay for mobile sidebar.

```tsx
import { SidebarBackdrop } from "@/components/ui/sidebar";

<SidebarBackdrop open={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
```

### SidebarTrigger

Button to open sidebar on mobile.

```tsx
import { SidebarTrigger } from "@/components/ui/sidebar";

<SidebarTrigger onClick={() => setSidebarOpen(true)} />;
```

### SidebarContent

Wrapper for main content with proper offset.

```tsx
import { SidebarContent } from "@/components/ui/sidebar";

<SidebarContent>
  <main>{children}</main>
</SidebarContent>;
```

## Usage Example

### Basic Setup

```tsx
"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarBackdrop,
  SidebarTrigger,
  SidebarContent,
  type SidebarNavItem,
} from "@/components/ui/sidebar";

const navigation: SidebarNavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    href: "/users",
    icon: <UsersIcon />,
    badge: 12,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <SidebarBackdrop
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Sidebar
        items={navigation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        logo={<div className="text-xl font-bold">My App</div>}
        footer={
          <div>
            <UserProfile />
            <SignOutButton />
          </div>
        }
      />

      <SidebarContent>
        <header>
          <SidebarTrigger onClick={() => setSidebarOpen(true)} />
          <h1>Page Title</h1>
        </header>
        <main>{children}</main>
      </SidebarContent>
    </div>
  );
}
```

### With Icons and Badges

```tsx
const navigation: SidebarNavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: "Messages",
    href: "/messages",
    icon: <MessageIcon />,
    badge: 5, // Number badge
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: <AnalyticsIcon />,
    badge: "New", // Text badge
  },
  {
    name: "Coming Soon",
    href: "/coming-soon",
    icon: <LockIcon />,
    disabled: true, // Disabled item
  },
];
```

### Custom Width

```tsx
<Sidebar
  items={navigation}
  width="w-72" // Custom width (default is w-64)
  // ... other props
/>

<SidebarContent offset="lg:pl-72">
  {/* Content with matching offset */}
</SidebarContent>
```

### Without Close Button

```tsx
<Sidebar
  items={navigation}
  showCloseButton={false}
  // ... other props
/>
```

## Props

### Sidebar Props

| Prop              | Type               | Default  | Description                         |
| ----------------- | ------------------ | -------- | ----------------------------------- |
| `items`           | `SidebarNavItem[]` | required | Navigation items to display         |
| `logo`            | `React.ReactNode`  | -        | Logo or brand element               |
| `footer`          | `React.ReactNode`  | -        | Footer content (e.g., user profile) |
| `open`            | `boolean`          | `false`  | Whether sidebar is open (mobile)    |
| `onClose`         | `() => void`       | -        | Callback when sidebar should close  |
| `className`       | `string`           | -        | Additional CSS classes              |
| `width`           | `string`           | `"w-64"` | Width of the sidebar                |
| `showCloseButton` | `boolean`          | `true`   | Show close button on mobile         |

### SidebarNavItem

```tsx
interface SidebarNavItem {
  name: string; // Display name
  href: string; // Link URL
  icon?: React.ReactNode; // Optional icon
  badge?: string | number; // Optional badge
  disabled?: boolean; // Disable the item
}
```

### SidebarBackdrop Props

| Prop        | Type         | Default | Description                       |
| ----------- | ------------ | ------- | --------------------------------- |
| `open`      | `boolean`    | `false` | Whether backdrop is visible       |
| `onClose`   | `() => void` | -       | Callback when backdrop is clicked |
| `className` | `string`     | -       | Additional CSS classes            |

### SidebarTrigger Props

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`

| Prop        | Type              | Default   | Description            |
| ----------- | ----------------- | --------- | ---------------------- |
| `children`  | `React.ReactNode` | Menu icon | Custom trigger content |
| `className` | `string`          | -         | Additional CSS classes |

### SidebarContent Props

| Prop        | Type              | Default      | Description                         |
| ----------- | ----------------- | ------------ | ----------------------------------- |
| `children`  | `React.ReactNode` | required     | Content to display                  |
| `className` | `string`          | -            | Additional CSS classes              |
| `offset`    | `string`          | `"lg:pl-64"` | Left padding to match sidebar width |

## Styling

The sidebar uses Tailwind CSS classes and supports dark mode out of the box. All colors automatically adapt to the current theme.

### Customizing Colors

You can customize the active state colors by modifying the Tailwind config or using custom classes:

```tsx
<Sidebar
  items={navigation}
  className="bg-blue-900 border-blue-800" // Custom background
/>
```

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus management
- Semantic HTML structure

## Best Practices

1. **Keep navigation items concise** - Use short, clear labels
2. **Use icons consistently** - Either use icons for all items or none
3. **Limit badge usage** - Only show badges for important notifications
4. **Organize items logically** - Group related items together
5. **Handle mobile properly** - Always include backdrop and trigger
6. **Match offsets** - Ensure SidebarContent offset matches Sidebar width

## Examples

See `sidebar.stories.tsx` for more examples and interactive demos.
