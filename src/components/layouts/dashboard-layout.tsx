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
    <div className="min-h-screen bg-background">
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
        logo={
          <Link href="/dashboard" className="text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            Starter Kit
          </Link>
        }
        footer={
          <div className="space-y-3 p-4">
            {/* User Navigation */}
            {!sidebarCollapsed && (
              <div className="px-1">
                <UserNav />
              </div>
            )}

            {/* Collapsed: Avatar Only */}
            {sidebarCollapsed && (
              <div className="flex justify-center">
                <Avatar
                  fallback={user?.email?.[0].toUpperCase() || "U"}
                  className="ring-2 ring-border"
                  size="sm"
                />
              </div>
            )}

            {/* Pro Upgrade Banner */}
            {!sidebarCollapsed && (
              <div className="p-3 rounded-xl bg-linear-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 border border-primary-200 dark:border-primary-800">
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                    <svg
                      className="w-4 h-4 text-primary-600 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-primary-900 dark:text-primary-100">
                      Upgrade to Pro
                    </p>
                    <p className="text-xs text-primary-700 dark:text-primary-300 mt-0.5">
                      Unlock premium features
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full text-xs h-8 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Get Pro
                </Button>
              </div>
            )}

            {/* Storage Usage */}
            {!sidebarCollapsed && (
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-100 border border-neutral-200 dark:border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-neutral-700 dark:text-neutral-700">
                    Storage
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-600">
                    4.2 / 10 GB
                  </p>
                </div>
                <div className="h-1.5 bg-neutral-200 dark:bg-neutral-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 dark:bg-primary-400 rounded-full transition-all duration-500"
                    style={{ width: "42%" }}
                  />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1.5">
                  58% available
                </p>
              </div>
            )}
          </div>
        }
      />

      <SidebarContent
        offset={sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}
        className="transition-all duration-300 ease-in-out"
      >
        {/* Modern Sticky Header with backdrop blur */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border-light shadow-sm">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger onClick={() => setSidebarOpen(true)} />
              <button
                onClick={() => handleCollapsedChange(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
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
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="h-8 w-px bg-border-light" />
              <UserNav />
            </div>
          </div>
        </header>

        {/* Page content with refined spacing */}
        <main className="min-h-screen bg-muted/30 transition-all duration-300 ease-in-out">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </SidebarContent>
    </div>
  );
}
