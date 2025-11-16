import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { useState } from "react";

// Icon components for stories
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
      clipRule="evenodd"
    />
  </svg>
);

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
      clipRule="evenodd"
    />
  </svg>
);

const BoltIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
  </svg>
);

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
        "info",
        "accent",
        "neutral",
        "gradient",
        "outlined",
      ],
      description: "Visual variant of the badge",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the badge",
    },
    gradient: {
      control: "select",
      options: ["none", "primary", "success", "accent"],
      description: "Gradient variant (only applies when variant is 'gradient')",
    },
    outlineColor: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
        "accent",
      ],
      description: "Outline color (only applies when variant is 'outlined')",
    },
    dot: {
      control: "boolean",
      description: "Whether to show a dot indicator",
    },
    removable: {
      control: "boolean",
      description: "Whether the badge is removable",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon",
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
 * Info variant
 */
export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

/**
 * Accent variant
 */
export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent",
  },
};

/**
 * Neutral variant
 */
export const Neutral: Story = {
  args: {
    variant: "neutral",
    children: "Neutral",
  },
};

/**
 * Outlined variant
 */
export const Outlined: Story = {
  args: {
    variant: "outlined",
    outlineColor: "primary",
    children: "Outlined",
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
 * Extra small size
 */
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small",
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
 * All color variants
 */
export const AllColorVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

/**
 * All sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

/**
 * Gradient badges
 */
export const GradientBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="gradient" gradient="primary">
        Primary Gradient
      </Badge>
      <Badge variant="gradient" gradient="success">
        Success Gradient
      </Badge>
      <Badge variant="gradient" gradient="accent">
        Accent Gradient
      </Badge>
    </div>
  ),
};

/**
 * Gradient badges with icons
 */
export const GradientWithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="gradient" gradient="primary" icon={<StarIcon />}>
        Featured
      </Badge>
      <Badge variant="gradient" gradient="success" icon={<CheckIcon />}>
        Verified
      </Badge>
      <Badge variant="gradient" gradient="accent" icon={<FireIcon />}>
        Hot
      </Badge>
      <Badge variant="gradient" gradient="primary" icon={<BoltIcon />}>
        Pro
      </Badge>
    </div>
  ),
};

/**
 * Gradient badges in different sizes
 */
export const GradientSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="gradient" gradient="primary" size="xs">
        Extra Small
      </Badge>
      <Badge variant="gradient" gradient="primary" size="sm">
        Small
      </Badge>
      <Badge variant="gradient" gradient="primary" size="md">
        Medium
      </Badge>
      <Badge variant="gradient" gradient="primary" size="lg">
        Large
      </Badge>
    </div>
  ),
};

/**
 * Outlined badges
 */
export const OutlinedBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outlined" outlineColor="default">
        Default
      </Badge>
      <Badge variant="outlined" outlineColor="primary">
        Primary
      </Badge>
      <Badge variant="outlined" outlineColor="secondary">
        Secondary
      </Badge>
      <Badge variant="outlined" outlineColor="success">
        Success
      </Badge>
      <Badge variant="outlined" outlineColor="warning">
        Warning
      </Badge>
      <Badge variant="outlined" outlineColor="error">
        Error
      </Badge>
      <Badge variant="outlined" outlineColor="info">
        Info
      </Badge>
      <Badge variant="outlined" outlineColor="accent">
        Accent
      </Badge>
    </div>
  ),
};

/**
 * Badges with icons (left position)
 */
export const WithIconsLeft: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" icon={<CheckIcon />}>
        Verified
      </Badge>
      <Badge variant="warning" icon={<FireIcon />}>
        Trending
      </Badge>
      <Badge variant="primary" icon={<StarIcon />}>
        Featured
      </Badge>
      <Badge variant="accent" icon={<BoltIcon />}>
        Fast
      </Badge>
    </div>
  ),
};

/**
 * Badges with icons (right position)
 */
export const WithIconsRight: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" icon={<CheckIcon />} iconPosition="right">
        Verified
      </Badge>
      <Badge variant="warning" icon={<FireIcon />} iconPosition="right">
        Trending
      </Badge>
      <Badge variant="primary" icon={<StarIcon />} iconPosition="right">
        Featured
      </Badge>
      <Badge variant="accent" icon={<BoltIcon />} iconPosition="right">
        Fast
      </Badge>
    </div>
  ),
};

/**
 * Icons in different sizes
 */
export const IconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="primary" icon={<StarIcon />} size="xs">
        Extra Small
      </Badge>
      <Badge variant="primary" icon={<StarIcon />} size="sm">
        Small
      </Badge>
      <Badge variant="primary" icon={<StarIcon />} size="md">
        Medium
      </Badge>
      <Badge variant="primary" icon={<StarIcon />} size="lg">
        Large
      </Badge>
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
    <div className="flex items-center gap-3 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-semibold">
          JD
        </div>
        <Badge
          variant="gradient"
          gradient="primary"
          size="sm"
          icon={<StarIcon />}
          className="absolute -bottom-1 -right-1"
        >
          Pro
        </Badge>
      </div>
      <div>
        <h4 className="font-semibold">John Doe</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          john@example.com
        </p>
      </div>
    </div>
  ),
};

/**
 * Product features showcase
 */
export const ProductFeatures: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="gradient" gradient="primary" icon={<BoltIcon />}>
          Fast Delivery
        </Badge>
        <Badge variant="gradient" gradient="success" icon={<CheckIcon />}>
          Verified Seller
        </Badge>
        <Badge variant="gradient" gradient="accent" icon={<FireIcon />}>
          Best Seller
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success" icon={<CheckIcon />}>
          In Stock
        </Badge>
        <Badge variant="info">Free Shipping</Badge>
        <Badge variant="warning">Limited Time</Badge>
      </div>
    </div>
  ),
};

/**
 * Status badges with dots and icons
 */
export const StatusBadgesEnhanced: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot icon={<CheckIcon />}>
        Active
      </Badge>
      <Badge variant="warning" dot icon={<FireIcon />}>
        Pending
      </Badge>
      <Badge variant="error" dot>
        Offline
      </Badge>
      <Badge variant="info" dot>
        Away
      </Badge>
      <Badge variant="neutral" dot>
        Idle
      </Badge>
    </div>
  ),
};

/**
 * Mixed styles showcase
 */
export const MixedStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Gradient Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="gradient" gradient="primary" icon={<StarIcon />}>
            Premium
          </Badge>
          <Badge variant="gradient" gradient="success" icon={<CheckIcon />}>
            Verified
          </Badge>
          <Badge variant="gradient" gradient="accent" icon={<BoltIcon />}>
            Pro
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Outlined Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outlined" outlineColor="primary">
            Draft
          </Badge>
          <Badge variant="outlined" outlineColor="success">
            Published
          </Badge>
          <Badge variant="outlined" outlineColor="error">
            Archived
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Solid Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" icon={<CheckIcon />}>
            Approved
          </Badge>
          <Badge variant="warning" icon={<FireIcon />}>
            Review
          </Badge>
          <Badge variant="error">Rejected</Badge>
        </div>
      </div>
    </div>
  ),
};
