import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error", "gradient"],
      description: "The visual style variant of the alert",
    },
    gradient: {
      control: "select",
      options: ["primary", "secondary", "success", "accent", "hero"],
      description: "Gradient type (only applies when variant is 'gradient')",
      if: { arg: "variant", eq: "gradient" },
    },
    title: {
      control: "text",
      description: "Title text for the alert",
    },
    badge: {
      control: "text",
      description: "Badge/label text displayed in top-right corner",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed",
    },
    icon: {
      control: false,
      description: "Custom icon element",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert with neutral styling
 */
export const Default: Story = {
  args: {
    children: "This is a default alert message.",
  },
};

/**
 * Alert with title and description
 */
export const WithTitle: Story = {
  args: {
    title: "Attention needed",
    children: "This alert has both a title and description text.",
  },
};

/**
 * Info variant for informational messages
 */
export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "This is an informational message to keep you updated.",
  },
};

/**
 * Success variant for positive feedback
 */
export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully.",
  },
};

/**
 * Warning variant for cautionary messages
 */
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review this information before proceeding.",
  },
};

/**
 * Error variant for error messages
 */
export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "An error occurred while processing your request.",
  },
};

/**
 * Dismissible alert that can be closed
 */
export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "Dismissible Alert",
    children: "Click the X button to dismiss this alert.",
    dismissible: true,
  },
};

/**
 * Alert with badge label
 */
export const WithBadge: Story = {
  args: {
    variant: "info",
    title: "New Feature",
    badge: "Beta",
    children: "Check out our new beta feature!",
  },
};

/**
 * Primary gradient alert - inspired by modern UI designs
 */
export const GradientPrimary: Story = {
  args: {
    variant: "gradient",
    gradient: "primary",
    title: "Public Search Mode",
    badge: "0 left",
    dismissible: true,
    children:
      "You're seeing estimated ride fares. Connect your accounts for personalized pricing from your apps!",
  },
};

/**
 * Secondary gradient alert
 */
export const GradientSecondary: Story = {
  args: {
    variant: "gradient",
    gradient: "secondary",
    title: "Premium Feature",
    badge: "Pro",
    dismissible: true,
    children: "Upgrade to unlock advanced analytics and reporting features.",
  },
};

/**
 * Success gradient alert
 */
export const GradientSuccess: Story = {
  args: {
    variant: "gradient",
    gradient: "success",
    title: "Deployment Successful",
    badge: "Live",
    dismissible: true,
    children: "Your application has been deployed to production successfully.",
  },
};

/**
 * Accent gradient alert
 */
export const GradientAccent: Story = {
  args: {
    variant: "gradient",
    gradient: "accent",
    title: "Limited Time Offer",
    badge: "Hot",
    dismissible: true,
    children: "Get 50% off on annual plans. Offer expires in 24 hours!",
  },
};

/**
 * Hero gradient alert with multiple colors
 */
export const GradientHero: Story = {
  args: {
    variant: "gradient",
    gradient: "hero",
    title: "Welcome to the Platform",
    badge: "New",
    dismissible: true,
    children:
      "Discover powerful features and tools to boost your productivity.",
  },
};

/**
 * Gradient alert without icon
 */
export const GradientNoIcon: Story = {
  args: {
    variant: "gradient",
    gradient: "primary",
    title: "System Notification",
    badge: "Important",
    icon: null,
    dismissible: true,
    children: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
  },
};

/**
 * Simple gradient alert without title
 */
export const GradientSimple: Story = {
  args: {
    variant: "gradient",
    gradient: "success",
    icon: null,
    dismissible: true,
    children: "✨ Your profile has been updated successfully!",
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default" title="Default">
        Default alert variant
      </Alert>
      <Alert variant="info" title="Info">
        Informational alert variant
      </Alert>
      <Alert variant="success" title="Success">
        Success alert variant
      </Alert>
      <Alert variant="warning" title="Warning">
        Warning alert variant
      </Alert>
      <Alert variant="error" title="Error">
        Error alert variant
      </Alert>
      <Alert variant="gradient" gradient="primary" title="Gradient Primary">
        Gradient primary variant
      </Alert>
      <Alert variant="gradient" gradient="success" title="Gradient Success">
        Gradient success variant
      </Alert>
    </div>
  ),
};

/**
 * Gradient variants showcase
 */
export const GradientVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="gradient"
        gradient="primary"
        title="Primary Gradient"
        badge="New"
        dismissible
      >
        Beautiful primary gradient with blue to purple transition
      </Alert>
      <Alert
        variant="gradient"
        gradient="secondary"
        title="Secondary Gradient"
        badge="Featured"
        dismissible
      >
        Elegant secondary gradient with purple to pink transition
      </Alert>
      <Alert
        variant="gradient"
        gradient="success"
        title="Success Gradient"
        badge="Live"
        dismissible
      >
        Fresh success gradient with green to teal transition
      </Alert>
      <Alert
        variant="gradient"
        gradient="accent"
        title="Accent Gradient"
        badge="Hot"
        dismissible
      >
        Vibrant accent gradient with orange to red transition
      </Alert>
      <Alert
        variant="gradient"
        gradient="hero"
        title="Hero Gradient"
        badge="Premium"
        dismissible
      >
        Stunning hero gradient with multiple color transitions
      </Alert>
    </div>
  ),
};

/**
 * Real-world usage examples
 */
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="gradient"
        gradient="primary"
        title="Public Search Mode"
        badge="0 left"
        dismissible
      >
        You&apos;re seeing estimated ride fares. Connect your accounts for
        personalized pricing from your apps!
      </Alert>

      <Alert variant="success" title="Payment Successful" dismissible>
        Your payment of $49.99 has been processed successfully. Receipt sent to
        your email.
      </Alert>

      <Alert variant="warning" title="Storage Almost Full" badge="85%">
        You&apos;re using 85% of your storage. Consider upgrading your plan or
        deleting unused files.
      </Alert>

      <Alert variant="error" title="Connection Failed" dismissible>
        Unable to connect to the server. Please check your internet connection
        and try again.
      </Alert>

      <Alert
        variant="gradient"
        gradient="accent"
        title="Flash Sale"
        badge="24h"
        dismissible
      >
        🔥 Limited time offer! Get 50% off on all premium plans. Hurry, offer
        ends in 24 hours!
      </Alert>
    </div>
  ),
};
