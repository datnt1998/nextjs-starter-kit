"use client";

/**
 * Protected dashboard page
 * Demonstrates authentication protection, data fetching with TanStack Query,
 * and displaying data in cards and charts with loading/error states
 */

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Container } from "@/components/ui/container";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SimpleChart } from "@/components/dashboard/simple-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  useDashboardStats,
  useActivityData,
  useRecentActivity,
} from "@/hooks/use-dashboard-stats";
import {
  IconUsers,
  IconUserCheck,
  IconCurrencyDollar,
  IconTrendingUp,
  IconAlertCircle,
} from "@tabler/icons-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  // Fetch dashboard data with TanStack Query
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useDashboardStats();
  const { data: activityData, isLoading: activityLoading } = useActivityData();
  const { data: recentActivity, isLoading: recentLoading } =
    useRecentActivity();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Container size="2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name || user.email}!
          </p>
        </div>

        {/* Error State */}
        {statsError && (
          <div className="mb-8 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <IconAlertCircle className="w-5 h-5 text-destructive" />
              <div>
                <h3 className="text-sm font-medium text-destructive">
                  Failed to load dashboard data
                </h3>
                <p className="text-sm text-destructive/80 mt-1">
                  {statsError instanceof Error
                    ? statsError.message
                    : "An error occurred"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            change={{ value: 12, trend: "up" }}
            isLoading={statsLoading}
            gradient="primary"
            featured={true}
            icon={<IconUsers className="w-6 h-6" />}
          />
          <StatsCard
            title="Active Users"
            value={stats?.activeUsers || 0}
            change={{ value: 8, trend: "up" }}
            isLoading={statsLoading}
            gradient="success"
            featured={true}
            icon={<IconUserCheck className="w-6 h-6" />}
          />
          <StatsCard
            title="Revenue"
            value={`${stats?.totalRevenue.toLocaleString() || 0}`}
            change={{ value: 15, trend: "up" }}
            isLoading={statsLoading}
            gradient="accent"
            featured={true}
            icon={<IconCurrencyDollar className="w-6 h-6" />}
          />
          <StatsCard
            title="Growth Rate"
            value={`${stats?.growthRate || 0}%`}
            change={{ value: 3, trend: "down" }}
            isLoading={statsLoading}
            featured={true}
            icon={<IconTrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimpleChart
            title="Weekly Activity"
            data={activityData || []}
            isLoading={activityLoading}
          />
          <RecentActivity
            activities={recentActivity || []}
            isLoading={recentLoading}
          />
        </div>
      </Container>
    </DashboardLayout>
  );
}
