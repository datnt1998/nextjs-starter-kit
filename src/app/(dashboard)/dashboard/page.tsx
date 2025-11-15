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
import { StatsCard } from "@/components/dashboard/stats-card";
import { SimpleChart } from "@/components/dashboard/simple-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  useDashboardStats,
  useActivityData,
  useRecentActivity,
} from "@/hooks/use-dashboard-stats";

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
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Welcome back, {user.name || user.email}!
          </p>
        </div>

        {/* Error State */}
        {statsError && (
          <div className="mb-8 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-error-600 dark:text-error-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-error-900 dark:text-error-200">
                  Failed to load dashboard data
                </h3>
                <p className="text-sm text-error-700 dark:text-error-300 mt-1">
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
            icon={
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Active Users"
            value={stats?.activeUsers || 0}
            change={{ value: 8, trend: "up" }}
            isLoading={statsLoading}
            icon={
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Revenue"
            value={`$${stats?.totalRevenue.toLocaleString() || 0}`}
            change={{ value: 15, trend: "up" }}
            isLoading={statsLoading}
            icon={
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Growth Rate"
            value={`${stats?.growthRate || 0}%`}
            change={{ value: 3, trend: "down" }}
            isLoading={statsLoading}
            icon={
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
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
      </div>
    </DashboardLayout>
  );
}
