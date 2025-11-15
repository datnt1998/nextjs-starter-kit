import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { useState } from "react";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "outline",
      ],
      description: "Visual variant of the badge",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the badge",
    },
    dot: {
      control: "boolean",
      description: "Whether to show a dot indicator",
    },
    removable: {
      control: "boolean",
      description: "Whether the badge is removable",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default badge
 */
export const Default: Story = {
  args: {
    children: "Badge",
  },
};

/**
 * Primary variant
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

/**
 * Success variant
 */
export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

/**
 * Warning variant
 */
export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

/**
 * Error variant
 */
export const Error: Story = {
  args: {
    variant: "error",
    children: "Error",
  },
};

/**
 * Outline variant
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

/**
 * With dot indicator
 */
export const WithDot: Story = {
  args: {
    variant: "primary",
    dot: true,
    children: "Online",
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

/**
 * Removable badge
 */
export const Removable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="text-sm text-primary-600"
        >
          Show badge again
        </button>
      );
    }

    return (
      <Badge removable onRemove={() => setVisible(false)}>
        Removable
      </Badge>
    );
  },
};

/**
 * All variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

/**
 * All sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

/**
 * Status indicators
 */
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="error" dot>
        Offline
      </Badge>
      <Badge variant="default" dot>
        Idle
      </Badge>
    </div>
  ),
};

/**
 * Tag list example
 */
export const TagList: Story = {
  render: () => {
    const [tags, setTags] = useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Next.js",
    ]);

    const removeTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
              removable
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-sm text-neutral-600">No tags remaining</p>
        )}
      </div>
    );
  },
};

/**
 * User profile example
 */
export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg">
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
          JD
        </div>
        <Badge
          variant="success"
          dot
          size="sm"
          className="absolute -bottom-1 -right-1"
        >
          Pro
        </Badge>
      </div>
      <div>
        <h4 className="font-semibold">John Doe</h4>
        <p className="text-sm text-neutral-600">john@example.com</p>
      </div>
    </div>
  ),
};
