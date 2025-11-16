import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the avatar",
    },
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy", "none"],
      description: "Status indicator",
    },
    showStatus: {
      control: "boolean",
      description: "Show status indicator",
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    fallback: {
      control: "text",
      description: "Fallback content (usually initials)",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default avatar with image
 */
export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80",
    alt: "User Avatar",
    fallback: "LT",
    size: "md",
  },
};

/**
 * Avatar with fallback initials
 */
export const WithFallback: Story = {
  args: {
    fallback: "DN",
    size: "md",
  },
};

/**
 * Avatar with online status
 */
export const WithStatus: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80",
    alt: "User Avatar",
    fallback: "LT",
    status: "online",
    showStatus: true,
    size: "md",
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="XS"
        size="xs"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="SM"
        size="sm"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="MD"
        size="md"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="LG"
        size="lg"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="XL"
        size="xl"
      />
    </div>
  ),
};

/**
 * Different status indicators
 */
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="ON"
        status="online"
        showStatus
        size="lg"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80"
        fallback="AW"
        status="away"
        showStatus
        size="lg"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&dpr=2&q=80"
        fallback="BS"
        status="busy"
        showStatus
        size="lg"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&dpr=2&q=80"
        fallback="OF"
        status="offline"
        showStatus
        size="lg"
      />
    </div>
  ),
};

/**
 * Fallback initials only
 */
export const FallbackInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallback="AB" size="md" />
      <Avatar fallback="CD" size="md" />
      <Avatar fallback="EF" size="md" />
      <Avatar fallback="GH" size="md" />
      <Avatar fallback="IJ" size="md" />
    </div>
  ),
};

/**
 * User navigation example
 */
export const UserNav: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-background">
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="DN"
        status="online"
        showStatus
        size="md"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">Dat Nguyen</span>
        <span className="text-xs text-muted-foreground">
          dat.m.96015@gmail.com
        </span>
      </div>
    </div>
  ),
};

/**
 * Avatar group
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        fallback="A"
        size="md"
        className="ring-2 ring-background"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80"
        fallback="B"
        size="md"
        className="ring-2 ring-background"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&dpr=2&q=80"
        fallback="C"
        size="md"
        className="ring-2 ring-background"
      />
      <Avatar
        fallback="+5"
        size="md"
        className="ring-2 ring-background bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
      />
    </div>
  ),
};
