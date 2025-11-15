/**
 * Dashboard layout component for protected routes
 * Note: The actual layout with sidebar is applied in individual pages
 * to allow for flexibility in page structure
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
