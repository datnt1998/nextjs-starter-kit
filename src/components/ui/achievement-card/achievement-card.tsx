"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  achievementCardVariants,
  achievementIconVariants,
  type AchievementCardVariants,
} from "./achievement-card.variants";

/**
 * Props for the AchievementCard component.
 */
export interface AchievementCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AchievementCardVariants {
  /**
   * Title of the achievement
   */
  title: string;
  /**
   * Description of the achievement
   */
  description: string;
  /**
   * Icon to display (React node or icon component)
   */
  icon: React.ReactNode;
  /**
   * Progress percentage for in-progress achievements (0-100)
   */
  progress?: number;
  /**
   * Callback when achievement is clicked (typically for unlocked state)
   */
  onUnlock?: () => void;
  /**
   * Size of the icon
   */
  iconSize?: "sm" | "md" | "lg";
}

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/**
 * Achievement Card component for displaying user achievements and progress.
 *
 * Supports three states:
 * - locked: Grayscale with lock icon overlay
 * - in-progress: Shows progress bar with percentage
 * - unlocked: Full gradient with celebration animation
 *
 * @component
 *
 * @example
 * // Locked achievement
 * <AchievementCard
 *   status="locked"
 *   title="First Steps"
 *   description="Complete your first task"
 *   icon={<StarIcon />}
 * />
 *
 * @example
 * // In-progress achievement
 * <AchievementCard
 *   status="in-progress"
 *   title="Task Master"
 *   description="Complete 10 tasks"
 *   icon={<CheckIcon />}
 *   progress={60}
 * />
 *
 * @example
 * // Unlocked achievement
 * <AchievementCard
 *   status="unlocked"
 *   gradient="success"
 *   title="Champion"
 *   description="Complete all challenges"
 *   icon={<TrophyIcon />}
 *   onUnlock={() => console.log('Achievement clicked')}
 * />
 */
export const AchievementCard = React.forwardRef<
  HTMLDivElement,
  AchievementCardProps
>(
  (
    {
      className,
      status,
      gradient,
      title,
      description,
      icon,
      progress = 0,
      onUnlock,
      iconSize = "md",
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = React.useState(false);
    const isUnlocked = status === "unlocked";
    const isInProgress = status === "in-progress";
    const isLocked = status === "locked";

    // Trigger celebration animation when status changes to unlocked
    React.useEffect(() => {
      if (isUnlocked) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timer);
      }
    }, [isUnlocked]);

    return (
      <div
        ref={ref}
        className={cn(
          achievementCardVariants({ status, gradient }),
          isAnimating && "animate-celebrate",
          className
        )}
        onClick={isUnlocked ? onUnlock : undefined}
        role={isUnlocked ? "button" : undefined}
        tabIndex={isUnlocked ? 0 : undefined}
        onKeyDown={
          isUnlocked
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onUnlock?.();
                }
              }
            : undefined
        }
        {...props}
      >
        {/* Lock overlay for locked state */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/10 dark:bg-neutral-950/30">
            <div className="rounded-full bg-neutral-200 dark:bg-neutral-800 p-3">
              <LockIcon />
            </div>
          </div>
        )}

        {/* Card content */}
        <div className="relative z-0 p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={cn(
                achievementIconVariants({ status, size: iconSize })
              )}
            >
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-semibold text-lg mb-1",
                  isUnlocked
                    ? "text-white"
                    : "text-foreground dark:text-foreground"
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "text-sm",
                  isUnlocked
                    ? "text-white/90"
                    : "text-muted-foreground dark:text-muted-foreground"
                )}
              >
                {description}
              </p>

              {/* Progress bar for in-progress state */}
              {isInProgress && progress !== undefined && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary-500 to-secondary-600 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(100, Math.max(0, progress))}%`,
                      }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Celebration sparkles for unlock animation */}
        {isUnlocked && isAnimating && (
          <>
            <div
              className="absolute top-4 right-4 h-2 w-2 rounded-full bg-yellow-300 animate-sparkle"
              style={{ animationDelay: "0ms" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-8 right-8 h-1.5 w-1.5 rounded-full bg-yellow-200 animate-sparkle"
              style={{ animationDelay: "100ms" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-6 right-12 h-2 w-2 rounded-full bg-yellow-400 animate-sparkle"
              style={{ animationDelay: "200ms" }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-6 left-6 h-2 w-2 rounded-full bg-white animate-sparkle"
              style={{ animationDelay: "150ms" }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-10 left-10 h-1.5 w-1.5 rounded-full bg-yellow-100 animate-sparkle"
              style={{ animationDelay: "250ms" }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Shine effect for unlocked state */}
        {isUnlocked && (
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
          </div>
        )}
      </div>
    );
  }
);

AchievementCard.displayName = "AchievementCard";
