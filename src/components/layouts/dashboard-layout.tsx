"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarBackdrop,
  SidebarTrigger,
  SidebarContent,
  type SidebarNavItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  IconLayoutDashboard,
  IconUsers,
  IconTable,
  IconForms,
  IconPalette,
  IconComponents,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { UserNav } from "./user-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation: SidebarNavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <IconLayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <IconUsers className="w-5 h-5" />,
  },
  {
    name: "Tables",
    href: "/dashboard/tables",
    icon: <IconTable className="w-5 h-5" />,
  },
  {
    name: "Forms",
    href: "/dashboard/forms",
    icon: <IconForms className="w-5 h-5" />,
  },
  {
    name: "Themes",
    href: "/dashboard/themes",
    icon: <IconPalette className="w-5 h-5" />,
  },
  {
    name: "Showcase",
    href: "/dashboard/showcase",
    icon: <IconComponents className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <IconSettings className="w-5 h-5" />,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Load collapsed state from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-collapsed");
      return saved === "true";
    }
    return false;
  });
  const { user, signOut } = useAuth();

  // Handle sidebar collapse toggle
  const handleCollapsedChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    }
  };

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
      <SidebarBackdrop
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Sidebar
        items={navigation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onCollapsedChange={handleCollapsedChange}
        className="bg-linear-to-b from-primary-50/30 to-background dark:from-primary-950/20 dark:to-background"
        logo={
          <Link href="/dashboard" className="text-xl font-bold text-primary">
            Starter Kit
          </Link>
        }
        footer={
          <div className="space-y-3">
            <div
              className={cn(
                "flex items-center p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all duration-300",
                sidebarCollapsed ? "lg:justify-center" : "gap-3"
              )}
            >
              <Avatar
                fallback={user?.email?.[0].toUpperCase() || "U"}
                className="shrink-0"
              />
              <div
                className={cn(
                  "flex-1 min-w-0 transition-all duration-300",
                  sidebarCollapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                )}
              >
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate whitespace-nowrap">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate whitespace-nowrap">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className={cn(
                "w-full transition-all duration-300 hover:bg-error-50 hover:text-error-600 hover:border-error-200 dark:hover:bg-error-950/20 dark:hover:text-error-400 dark:hover:border-error-800",
                sidebarCollapsed && "lg:px-2 lg:justify-center"
              )}
              title={sidebarCollapsed ? "Sign out" : undefined}
            >
              <IconLogout
                className={cn(
                  "w-4 h-4 transition-all duration-300 shrink-0",
                  !sidebarCollapsed && "mr-2"
                )}
              />
              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-300",
                  sidebarCollapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                )}
              >
                Sign out
              </span>
            </Button>
          </div>
        }
      />

      <SidebarContent
        offset={sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}
        className="transition-all duration-300 ease-in-out"
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-linear-to-r from-background via-primary-50/20 to-background dark:from-background dark:via-primary-950/10 dark:to-background border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger onClick={() => setSidebarOpen(true)} />
              <button
                onClick={() => handleCollapsedChange(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                aria-label={
                  sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    sidebarCollapsed && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
                <UserNav />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-background transition-all duration-300 ease-in-out">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </SidebarContent>
    </div>
  );
}
