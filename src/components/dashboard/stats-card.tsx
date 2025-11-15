interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  isLoading,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {title}
        </h3>
        {icon && (
          <div className="text-neutral-400 dark:text-neutral-600">{icon}</div>
        )}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          {value}
        </p>
        {change && (
          <div
            className={`flex items-center text-sm font-medium ${
              change.trend === "up"
                ? "text-success-600 dark:text-success-400"
                : "text-error-600 dark:text-error-400"
            }`}
          >
            {change.trend === "up" ? (
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            )}
            {Math.abs(change.value)}%
          </div>
        )}
      </div>
    </div>
  );
}
