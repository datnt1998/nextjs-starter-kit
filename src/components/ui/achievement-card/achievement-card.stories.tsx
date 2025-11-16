import type { Meta, StoryObj } from "@storybook/react";
import { AchievementCard } from "./achievement-card";
import { useState } from "react";

const meta = {
  title: "UI/Achievement Card",
  component: AchievementCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AchievementCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icon components for stories
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
    />
  </svg>
);

export const Locked: Story = {
  args: {
    status: "locked",
    title: "First Steps",
    description: "Complete your first task to unlock this achievement",
    icon: <StarIcon />,
  },
};

export const InProgress: Story = {
  args: {
    status: "in-progress",
    title: "Task Master",
    description: "Complete 10 tasks to earn this achievement",
    icon: <CheckIcon />,
    progress: 60,
  },
};

export const InProgressLow: Story = {
  args: {
    status: "in-progress",
    title: "Getting Started",
    description: "Complete 5 tasks",
    icon: <StarIcon />,
    progress: 20,
  },
};

export const InProgressHigh: Story = {
  args: {
    status: "in-progress",
    title: "Almost There",
    description: "Complete 20 tasks",
    icon: <CheckIcon />,
    progress: 85,
  },
};

export const UnlockedPrimary: Story = {
  args: {
    status: "unlocked",
    gradient: "primary",
    title: "Champion",
    description: "You've completed all challenges!",
    icon: <TrophyIcon />,
    onUnlock: () => console.log("Achievement clicked"),
  },
};

export const UnlockedSuccess: Story = {
  args: {
    status: "unlocked",
    gradient: "success",
    title: "Perfect Score",
    description: "Achieved 100% completion rate",
    icon: <StarIcon />,
    onUnlock: () => console.log("Achievement clicked"),
  },
};

export const UnlockedAccent: Story = {
  args: {
    status: "unlocked",
    gradient: "accent",
    title: "On Fire!",
    description: "Maintained a 7-day streak",
    icon: <FireIcon />,
    onUnlock: () => console.log("Achievement clicked"),
  },
};

export const AllStates: Story = {
  args: {
    status: "locked",
    title: "All States",
    description: "Showcase of all achievement states",
    icon: <StarIcon />,
  },
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <AchievementCard
        status="locked"
        title="Locked Achievement"
        description="This achievement is still locked"
        icon={<StarIcon />}
        className="w-[400px]"
      />
      <AchievementCard
        status="in-progress"
        title="In Progress"
        description="You're making progress on this achievement"
        icon={<CheckIcon />}
        progress={45}
        className="w-[400px]"
      />
      <AchievementCard
        status="unlocked"
        gradient="primary"
        title="Unlocked Achievement"
        description="You've earned this achievement!"
        icon={<TrophyIcon />}
        className="w-[400px]"
      />
    </div>
  ),
};

export const AllGradients: Story = {
  args: {
    status: "unlocked",
    title: "All Gradients",
    description: "Showcase of all gradient types",
    icon: <TrophyIcon />,
  },
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <AchievementCard
        status="unlocked"
        gradient="primary"
        title="Primary Gradient"
        description="Blue to purple gradient"
        icon={<TrophyIcon />}
        className="w-[400px]"
      />
      <AchievementCard
        status="unlocked"
        gradient="success"
        title="Success Gradient"
        description="Green gradient for achievements"
        icon={<StarIcon />}
        className="w-[400px]"
      />
      <AchievementCard
        status="unlocked"
        gradient="accent"
        title="Accent Gradient"
        description="Orange to red gradient"
        icon={<FireIcon />}
        className="w-[400px]"
      />
    </div>
  ),
};

export const IconSizes: Story = {
  args: {
    status: "unlocked",
    gradient: "primary",
    title: "Icon Sizes",
    description: "Showcase of different icon sizes",
    icon: <StarIcon />,
  },
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <AchievementCard
        status="unlocked"
        gradient="primary"
        title="Small Icon"
        description="Achievement with small icon"
        icon={<StarIcon />}
        iconSize="sm"
        className="w-[400px]"
      />
      <AchievementCard
        status="unlocked"
        gradient="success"
        title="Medium Icon"
        description="Achievement with medium icon (default)"
        icon={<TrophyIcon />}
        iconSize="md"
        className="w-[400px]"
      />
      <AchievementCard
        status="unlocked"
        gradient="accent"
        title="Large Icon"
        description="Achievement with large icon"
        icon={<FireIcon />}
        iconSize="lg"
        className="w-[400px]"
      />
    </div>
  ),
};

export const UnlockAnimation: Story = {
  args: {
    status: "locked",
    gradient: "primary",
    title: "Interactive Achievement",
    description: "Click the button to start progress",
    icon: <TrophyIcon />,
  },
  render: function UnlockAnimationStory() {
    const [status, setStatus] = useState<"locked" | "in-progress" | "unlocked">(
      "locked"
    );
    const [progress, setProgress] = useState(0);

    const handleUnlock = () => {
      if (status === "locked") {
        setStatus("in-progress");
        setProgress(0);
      } else if (status === "in-progress") {
        if (progress < 100) {
          setProgress(Math.min(100, progress + 20));
        } else {
          setStatus("unlocked");
        }
      } else {
        // Reset
        setStatus("locked");
        setProgress(0);
      }
    };

    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <AchievementCard
          status={status}
          gradient="primary"
          title="Interactive Achievement"
          description={
            status === "locked"
              ? "Click the button to start progress"
              : status === "in-progress"
                ? "Keep clicking to reach 100%"
                : "Achievement unlocked! Click to reset"
          }
          icon={<TrophyIcon />}
          progress={progress}
          className="w-[400px]"
        />
        <button
          onClick={handleUnlock}
          className="rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700 transition-colors"
        >
          {status === "locked"
            ? "Start Progress"
            : status === "in-progress"
              ? `Progress: ${progress}% - Click to Continue`
              : "Reset"}
        </button>
      </div>
    );
  },
};

export const Grid: Story = {
  args: {
    status: "unlocked",
    gradient: "primary",
    title: "Grid Layout",
    description: "Showcase of achievements in a grid",
    icon: <StarIcon />,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8 max-w-4xl">
      <AchievementCard
        status="unlocked"
        gradient="primary"
        title="First Task"
        description="Completed your first task"
        icon={<CheckIcon />}
      />
      <AchievementCard
        status="unlocked"
        gradient="success"
        title="10 Tasks"
        description="Completed 10 tasks"
        icon={<StarIcon />}
      />
      <AchievementCard
        status="in-progress"
        title="50 Tasks"
        description="Complete 50 tasks"
        icon={<TrophyIcon />}
        progress={72}
      />
      <AchievementCard
        status="locked"
        title="100 Tasks"
        description="Complete 100 tasks"
        icon={<TrophyIcon />}
      />
      <AchievementCard
        status="unlocked"
        gradient="accent"
        title="7 Day Streak"
        description="Maintained a 7-day streak"
        icon={<FireIcon />}
      />
      <AchievementCard
        status="in-progress"
        title="30 Day Streak"
        description="Maintain a 30-day streak"
        icon={<FireIcon />}
        progress={40}
      />
    </div>
  ),
};
