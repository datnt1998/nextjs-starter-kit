import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
        "gradient",
      ],
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    gradient: {
      control: "select",
      options: ["none", "primary", "success", "accent"],
      description:
        "The gradient color scheme (only applies when variant is 'gradient')",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading spinner when true",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Button with Icon",
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Button with Icon",
    rightIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
};

export const GradientPrimary: Story = {
  args: {
    children: "Gradient Primary",
    variant: "gradient",
    gradient: "primary",
  },
};

export const GradientSuccess: Story = {
  args: {
    children: "Gradient Success",
    variant: "gradient",
    gradient: "success",
  },
};

export const GradientAccent: Story = {
  args: {
    children: "Gradient Accent",
    variant: "gradient",
    gradient: "accent",
  },
};

export const GradientSizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button variant="gradient" gradient="primary" size="sm">
        Small Gradient
      </Button>
      <Button variant="gradient" gradient="primary" size="md">
        Medium Gradient
      </Button>
      <Button variant="gradient" gradient="primary" size="lg">
        Large Gradient
      </Button>
    </div>
  ),
};

export const GradientWithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="gradient"
        gradient="primary"
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        }
      >
        With Left Icon
      </Button>
      <Button
        variant="gradient"
        gradient="success"
        rightIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        }
      >
        With Right Icon
      </Button>
    </div>
  ),
};

export const GradientStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="gradient" gradient="primary">
          Normal
        </Button>
        <Button variant="gradient" gradient="primary" isLoading>
          Loading
        </Button>
        <Button variant="gradient" gradient="primary" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="gradient" gradient="success">
          Normal
        </Button>
        <Button variant="gradient" gradient="success" isLoading>
          Loading
        </Button>
        <Button variant="gradient" gradient="success" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="gradient" gradient="accent">
          Normal
        </Button>
        <Button variant="gradient" gradient="accent" isLoading>
          Loading
        </Button>
        <Button variant="gradient" gradient="accent" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

export const AllGradients: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="gradient" gradient="primary">
          Primary Gradient
        </Button>
        <Button variant="gradient" gradient="success">
          Success Gradient
        </Button>
        <Button variant="gradient" gradient="accent">
          Accent Gradient
        </Button>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="gradient" gradient="primary">
          Gradient Primary
        </Button>
        <Button variant="gradient" gradient="success">
          Gradient Success
        </Button>
        <Button variant="gradient" gradient="accent">
          Gradient Accent
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-2">
        <Button isLoading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
