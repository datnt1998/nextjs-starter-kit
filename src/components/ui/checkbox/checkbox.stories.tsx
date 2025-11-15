import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import * as React from "react";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "Visual variant of the checkbox",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
    },
    label: {
      control: "text",
      description: "Label text for the checkbox",
    },
    description: {
      control: "text",
      description: "Description text below the label",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Default checkbox with label
 */
export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

/**
 * Checkbox with description text
 */
export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive email updates about your account activity",
  },
};

/**
 * Checkbox in error state
 */
export const Error: Story = {
  args: {
    label: "I agree to the terms",
    variant: "error",
    error: "You must accept the terms to continue",
  },
};

/**
 * Disabled checkbox
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
 * Indeterminate state (useful for "select all" scenarios)
 */
export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    label: "Small checkbox",
    size: "sm",
  },
};

/**
 * Medium size variant (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium checkbox",
    size: "md",
  },
};

/**
 * Large size variant
 */
export const Large: Story = {
  args: {
    label: "Large checkbox",
    size: "lg",
  },
};

/**
 * Checkbox without label (not recommended for accessibility)
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
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onCheckedChange={(isChecked: boolean | "indeterminate") =>
            setChecked(isChecked as boolean)
          }
        />
        <p className="text-sm text-neutral-600">
          Checkbox is {checked ? "checked" : "unchecked"}
        </p>
      </div>
    );
  },
};

/**
 * Example with parent-child checkboxes (indeterminate state)
 */
export const ParentChildExample: Story = {
  render: () => {
    const [parentChecked, setParentChecked] = useState(false);
    const [child1Checked, setChild1Checked] = useState(false);
    const [child2Checked, setChild2Checked] = useState(false);
    const [child3Checked, setChild3Checked] = useState(false);

    const allChildrenChecked = child1Checked && child2Checked && child3Checked;
    const someChildrenChecked =
      (child1Checked || child2Checked || child3Checked) && !allChildrenChecked;

    const handleParentChange = (checked: boolean | "indeterminate") => {
      const isChecked = checked === true;
      setParentChecked(isChecked);
      setChild1Checked(isChecked);
      setChild2Checked(isChecked);
      setChild3Checked(isChecked);
    };

    React.useEffect(() => {
      setParentChecked(allChildrenChecked);
    }, [allChildrenChecked]);

    return (
      <div className="space-y-3">
        <Checkbox
          label="Select all features"
          checked={parentChecked}
          indeterminate={someChildrenChecked}
          onCheckedChange={handleParentChange}
        />
        <div className="ml-7 space-y-2">
          <Checkbox
            label="Feature 1"
            checked={child1Checked}
            onCheckedChange={(checked: boolean | "indeterminate") =>
              setChild1Checked(checked as boolean)
            }
          />
          <Checkbox
            label="Feature 2"
            checked={child2Checked}
            onCheckedChange={(checked: boolean | "indeterminate") =>
              setChild2Checked(checked as boolean)
            }
          />
          <Checkbox
            label="Feature 3"
            checked={child3Checked}
            onCheckedChange={(checked: boolean | "indeterminate") =>
              setChild3Checked(checked as boolean)
            }
          />
        </div>
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
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

/**
 * All variants together
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Default variant" variant="default" />
      <Checkbox
        label="Error variant"
        variant="error"
        error="This field has an error"
      />
    </div>
  ),
};
