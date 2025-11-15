interface DataPoint {
  label: string;
  value: number;
}

interface SimpleChartProps {
  data: DataPoint[];
  title: string;
  isLoading?: boolean;
}

export function SimpleChart({ data, title, isLoading }: SimpleChartProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
        <div className="animate-pulse">
          <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20"></div>
                <div className="flex-1 h-8 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-20 text-sm text-neutral-600 dark:text-neutral-400">
              {item.label}
            </div>
            <div className="flex-1">
              <div className="relative h-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary-500 dark:bg-primary-600 rounded-lg transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
