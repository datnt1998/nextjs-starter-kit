import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual style variant of the input",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Choose a unique username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    variant: "error",
    error: "Please enter a valid email address",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Small input",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    placeholder: "Medium input",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    placeholder: "Large input",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Number: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "25",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input label="Default" placeholder="Default input" />
      <Input
        label="With helper text"
        placeholder="Input"
        helperText="This is helper text"
      />
      <Input
        label="Error state"
        placeholder="Input"
        variant="error"
        error="This field is required"
      />
      <Input label="Disabled" placeholder="Disabled" disabled />
      <div className="flex flex-col gap-2">
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </div>
    </div>
  ),
};
