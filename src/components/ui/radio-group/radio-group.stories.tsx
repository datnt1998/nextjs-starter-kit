import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./radio-group";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "Visual variant of the radio group",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the radio buttons",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout orientation",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio group is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const basicOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const planOptions = [
  {
    value: "free",
    label: "Free",
    description: "Basic features for personal use",
  },
  {
    value: "pro",
    label: "Pro",
    description: "Advanced features for professionals",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Custom solutions for large teams",
  },
];

/**
 * Default vertical radio group
 */
export const Default: Story = {
  args: {
    options: basicOptions,
  },
};

/**
 * Radio group with label
 */
export const WithLabel: Story = {
  args: {
    label: "Choose an option",
    options: basicOptions,
  },
};

/**
 * Radio group with label and description
 */
export const WithDescription: Story = {
  args: {
    label: "Select a plan",
    description: "Choose the plan that best fits your needs",
    options: planOptions,
  },
};

/**
 * Radio group with option descriptions
 */
export const WithOptionDescriptions: Story = {
  args: {
    label: "Choose your plan",
    options: planOptions,
  },
};

/**
 * Horizontal layout
 */
export const Horizontal: Story = {
  args: {
    label: "Do you agree?",
    orientation: "horizontal",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
};

/**
 * Radio group in error state
 */
export const Error: Story = {
  args: {
    label: "Select a payment method",
    variant: "error",
    error: "Please select a payment method to continue",
    options: [
      { value: "card", label: "Credit Card" },
      { value: "paypal", label: "PayPal" },
      { value: "bank", label: "Bank Transfer" },
    ],
  },
};

/**
 * Disabled radio group
 */
export const Disabled: Story = {
  args: {
    label: "Disabled options",
    disabled: true,
    defaultValue: "2",
    options: basicOptions,
  },
};

/**
 * Individual disabled options
 */
export const IndividualDisabled: Story = {
  args: {
    label: "Some options disabled",
    options: [
      { value: "1", label: "Available option" },
      { value: "2", label: "Disabled option", disabled: true },
      { value: "3", label: "Another available option" },
    ],
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    label: "Small radio buttons",
    size: "sm",
    options: basicOptions,
  },
};

/**
 * Medium size variant (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium radio buttons",
    size: "md",
    options: basicOptions,
  },
};

/**
 * Large size variant
 */
export const Large: Story = {
  args: {
    label: "Large radio buttons",
    size: "lg",
    options: basicOptions,
  },
};

/**
 * Controlled radio group
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("pro");

    return (
      <div className="space-y-4">
        <RadioGroup
          label="Select a plan"
          options={planOptions}
          value={value}
          onValueChange={(newValue: unknown) => setValue(newValue as string)}
        />
        <p className="text-sm text-neutral-600">
          Selected value: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

/**
 * All sizes together
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup label="Small" size="sm" options={basicOptions} />
      <RadioGroup label="Medium" size="md" options={basicOptions} />
      <RadioGroup label="Large" size="lg" options={basicOptions} />
    </div>
  ),
};

/**
 * Horizontal vs Vertical
 */
export const Orientations: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Vertical (default)"
        orientation="vertical"
        options={basicOptions}
      />
      <RadioGroup
        label="Horizontal"
        orientation="horizontal"
        options={basicOptions}
      />
    </div>
  ),
};

/**
 * Form example with validation
 */
export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const hasError = submitted && !value;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      if (value) {
        alert(`Selected: ${value}`);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup
          label="Select your preferred contact method *"
          options={[
            { value: "email", label: "Email", description: "We'll email you" },
            { value: "phone", label: "Phone", description: "We'll call you" },
            { value: "sms", label: "SMS", description: "We'll text you" },
          ]}
          value={value}
          onValueChange={(newValue: unknown) => setValue(newValue as string)}
          variant={hasError ? "error" : "default"}
          error={hasError ? "Please select a contact method" : undefined}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Submit
        </button>
      </form>
    );
  },
};
