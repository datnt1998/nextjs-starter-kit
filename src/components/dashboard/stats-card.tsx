import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon?: React.ReactNode;
  iconColor?: string;
  gradient?: "none" | "primary" | "success" | "accent";
  featured?: boolean;
  isLoading?: boolean;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  iconColor,
  gradient = "none",
  featured = false,
  isLoading,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <Card className={cn(featured && "shadow-lg")}>
        <CardContent>
          <div className="relative overflow-hidden">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isGradient = gradient !== "none";
  const gradientClasses = {
    primary: "bg-gradient-primary text-white",
    success: "bg-gradient-success text-white",
    accent: "bg-gradient-accent text-white",
  };

  return (
    <Card
      variant={isGradient ? "gradient" : featured ? "elevated" : "default"}
      gradient={isGradient ? gradient : undefined}
      shadow={featured ? "lg" : "md"}
      shadowColor={isGradient ? gradient : "none"}
      className={cn(
        "transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        isGradient && gradientClasses[gradient]
      )}
    >
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3
            className={cn(
              "text-sm font-medium",
              isGradient ? "text-white/90" : "text-muted-foreground"
            )}
          >
            {title}
          </h3>
          {icon && (
            <div
              className={cn(
                iconColor ||
                  (isGradient ? "text-white/90" : "text-muted-foreground")
              )}
            >
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline justify-between">
          <p
            className={cn(
              "text-3xl font-bold",
              isGradient ? "text-white" : "text-foreground"
            )}
          >
            {value}
          </p>
          {change && (
            <div
              className={cn(
                "flex items-center text-sm font-medium",
                isGradient
                  ? "text-white/90"
                  : change.trend === "up"
                    ? "text-success"
                    : "text-error"
              )}
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
      </CardContent>
    </Card>
  );
}
