"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Menu } from "@/components/ui/menu";
import { useAuth } from "@/hooks/use-auth";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronDown,
} from "@tabler/icons-react";

export function UserNav() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-2 rounded-full hover:bg-muted/50 transition-colors p-1 pr-3 border-0">
        <Avatar
          src={user?.avatar}
          fallback={user?.email?.[0].toUpperCase() || "U"}
          size="sm"
          status="online"
          showStatus
        />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>
        <IconChevronDown className="w-4 h-4 text-muted-foreground" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end">
          <Menu.Popup className="w-56">
            <div className="flex items-center gap-3 px-2 py-3 border-b border-border">
              <Avatar
                src={user?.avatar}
                fallback={user?.email?.[0].toUpperCase() || "U"}
                size="md"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="py-1">
              <Menu.Item
                onClick={() => router.push("/dashboard/settings")}
                className="gap-2"
              >
                <IconUser className="w-4 h-4" />
                <span>Profile</span>
              </Menu.Item>
              <Menu.Item
                onClick={() => router.push("/dashboard/settings")}
                className="gap-2"
              >
                <IconSettings className="w-4 h-4" />
                <span>Settings</span>
              </Menu.Item>
            </div>

            <Menu.Separator />

            <div className="py-1">
              <Menu.Item
                onClick={handleSignOut}
                className="gap-2 text-destructive focus:text-destructive data-highlighted:text-destructive"
              >
                <IconLogout className="w-4 h-4" />
                <span>Sign out</span>
              </Menu.Item>
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
