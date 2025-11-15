import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Sidebar,
  SidebarBackdrop,
  SidebarTrigger,
  SidebarContent,
  type SidebarNavItem,
} from "./sidebar";
import { Button } from "../button";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items
const sampleItems: SidebarNavItem[] = [
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
    name: "Users",
    href: "/users",
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    badge: 12,
  },
  {
    name: "Settings",
    href: "/settings",
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/analytics",
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    badge: "New",
  },
  {
    name: "Reports",
    href: "/reports",
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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    name: "Coming Soon",
    href: "/coming-soon",
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    disabled: true,
  },
];

// Interactive wrapper component
function SidebarDemo({ items }: { items: SidebarNavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <SidebarBackdrop open={open} onClose={() => setOpen(false)} />
      <Sidebar
        items={items}
        open={open}
        onClose={() => setOpen(false)}
        logo={
          <div className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
            My App
          </div>
        }
        footer={
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  JD
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">
                  John Doe
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                  john@example.com
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Sign out
            </Button>
          </div>
        }
      />
      <SidebarContent>
        <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <SidebarTrigger onClick={() => setOpen(true)} />
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Dashboard
            </h1>
            <div className="w-6" />
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Welcome to your dashboard
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Click the menu icon on mobile to open the sidebar. On desktop, the
              sidebar is always visible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                    Card {i}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    This is a sample card to demonstrate the layout with
                    sidebar.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </SidebarContent>
    </div>
  );
}

export const Default: Story = {
  args: {
    items: sampleItems,
  },
  render: () => <SidebarDemo items={sampleItems} />,
};

export const WithBadges: Story = {
  args: {
    items: sampleItems.map((item, i) =>
      i % 2 === 0 ? { ...item, badge: i + 1 } : item
    ),
  },
  render: () => (
    <SidebarDemo
      items={sampleItems.map((item, i) =>
        i % 2 === 0 ? { ...item, badge: i + 1 } : item
      )}
    />
  ),
};

export const MinimalItems: Story = {
  args: {
    items: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  render: () => (
    <SidebarDemo
      items={[
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ]}
    />
  ),
};
