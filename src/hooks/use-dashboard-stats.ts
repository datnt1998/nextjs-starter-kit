"use client";

import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  growthRate: number;
}

export interface ActivityData {
  label: string;
  value: number;
}

// Mock API functions
async function fetchDashboardStats(): Promise<DashboardStats> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    totalUsers: 1234,
    activeUsers: 892,
    totalRevenue: 45678,
    growthRate: 12.5,
  };
}

async function fetchActivityData(): Promise<ActivityData[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 62 },
    { label: "Wed", value: 38 },
    { label: "Thu", value: 71 },
    { label: "Fri", value: 55 },
    { label: "Sat", value: 28 },
    { label: "Sun", value: 34 },
  ];
}

async function fetchRecentActivity(): Promise<
  Array<{ id: string; user: string; action: string; timestamp: string }>
> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 900));

  const now = new Date();
  return [
    {
      id: "1",
      user: "John Doe",
      action: "Created a new project",
      timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
    },
    {
      id: "2",
      user: "Jane Smith",
      action: "Updated profile settings",
      timestamp: new Date(now.getTime() - 15 * 60000).toISOString(),
    },
    {
      id: "3",
      user: "Bob Johnson",
      action: "Uploaded a document",
      timestamp: new Date(now.getTime() - 30 * 60000).toISOString(),
    },
    {
      id: "4",
      user: "Alice Williams",
      action: "Completed a task",
      timestamp: new Date(now.getTime() - 45 * 60000).toISOString(),
    },
    {
      id: "5",
      user: "Charlie Brown",
      action: "Joined the team",
      timestamp: new Date(now.getTime() - 60 * 60000).toISOString(),
    },
  ];
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });
}

export function useActivityData() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: fetchActivityData,
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ["dashboard", "recent-activity"],
    queryFn: fetchRecentActivity,
  });
}
