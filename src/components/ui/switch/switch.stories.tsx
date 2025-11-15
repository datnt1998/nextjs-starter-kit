import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "danger"],
      description: "Visual variant of the switch",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the switch",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    loading: {
      control: "boolean",
      description: "Whether the switch is in loading state",
    },
    label: {
      control: "text",
      description: "Label text for the switch",
    },
    description: {
      control: "text",
      description: "Description text below the label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Default switch with label
 */
export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

/**
 * Switch with description text
 */
export const WithDescription: Story = {
  args: {
    label: "Dark mode",
    description: "Use dark theme across the application",
  },
};

/**
 * Disabled switch
 */
export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
  },
};

/**
 * Disabled and checked
 */
export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    defaultChecked: true,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    label: "Saving changes...",
    loading: true,
    defaultChecked: true,
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    label: "Small switch",
    size: "sm",
  },
};

/**
 * Medium size variant (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium switch",
    size: "md",
  },
};

/**
 * Large size variant
 */
export const Large: Story = {
  args: {
    label: "Large switch",
    size: "lg",
  },
};

/**
 * Primary variant (default)
 */
export const Primary: Story = {
  args: {
    label: "Primary variant",
    variant: "primary",
    defaultChecked: true,
  },
};

/**
 * Success variant
 */
export const Success: Story = {
  args: {
    label: "Success variant",
    variant: "success",
    defaultChecked: true,
  },
};

/**
 * Danger variant
 */
export const Danger: Story = {
  args: {
    label: "Danger variant",
    variant: "danger",
    defaultChecked: true,
  },
};

/**
 * Switch without label (not recommended for accessibility)
 */
export const WithoutLabel: Story = {
  args: {},
};

/**
 * Interactive example with controlled state
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <Switch
          label="Controlled switch"
          checked={checked}
          onCheckedChange={(isChecked: boolean) => setChecked(isChecked)}
        />
        <p className="text-sm text-neutral-600">
          Switch is {checked ? "on" : "off"}
        </p>
      </div>
    );
  },
};

/**
 * Example with async operation
 */
export const AsyncExample: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = async (isChecked: boolean) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setChecked(isChecked);
      setLoading(false);
    };

    return (
      <div className="space-y-4">
        <Switch
          label="Enable feature"
          description="This will take a moment to save"
          checked={checked}
          loading={loading}
          onCheckedChange={handleChange}
        />
        <p className="text-sm text-neutral-600">
          Status: {loading ? "Saving..." : checked ? "Enabled" : "Disabled"}
        </p>
      </div>
    );
  },
};

/**
 * All size variants together
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Small switch" size="sm" defaultChecked />
      <Switch label="Medium switch" size="md" defaultChecked />
      <Switch label="Large switch" size="lg" defaultChecked />
    </div>
  ),
};

/**
 * All variants together
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Primary variant" variant="primary" defaultChecked />
      <Switch label="Success variant" variant="success" defaultChecked />
      <Switch label="Danger variant" variant="danger" defaultChecked />
    </div>
  ),
};

/**
 * Settings panel example
 */
export const SettingsPanel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <div className="space-y-4 p-6 bg-white rounded-lg border border-neutral-200 max-w-md">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Settings
        </h3>
        <Switch
          label="Push notifications"
          description="Receive push notifications on your device"
          checked={notifications}
          onCheckedChange={(checked: boolean) => setNotifications(checked)}
        />
        <Switch
          label="Dark mode"
          description="Use dark theme across the application"
          checked={darkMode}
          onCheckedChange={(checked: boolean) => setDarkMode(checked)}
        />
        <Switch
          label="Auto-save"
          description="Automatically save your work"
          checked={autoSave}
          variant="success"
          onCheckedChange={(checked: boolean) => setAutoSave(checked)}
        />
      </div>
    );
  },
};
