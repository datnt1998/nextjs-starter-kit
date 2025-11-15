"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/use-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Users Table", href: "/dashboard/users" },
  { name: "Settings", href: "/dashboard/settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force hard redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200 dark:border-neutral-800">
            <Link
              href="/dashboard"
              className="text-xl font-bold text-neutral-900 dark:text-neutral-50"
            >
              Starter Kit
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {user?.email?.[0].toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex-1" />
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-neutral-50 dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
