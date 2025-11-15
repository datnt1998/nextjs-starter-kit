import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { useState } from "react";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "Visual variant of the textarea",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the textarea",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    autoResize: {
      control: "boolean",
      description: "Whether to auto-resize based on content",
    },
    showCount: {
      control: "boolean",
      description: "Whether to show character count",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * Default textarea
 */
export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
};

/**
 * Textarea with label
 */
export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description...",
  },
};

/**
 * Textarea with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: "Comments",
    helperText: "Please provide detailed comments",
    placeholder: "Enter your comments...",
  },
};

/**
 * Textarea with character count
 */
export const WithCharacterCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    maxLength: 200,
    showCount: true,
  },
};

/**
 * Textarea with auto-resize
 */
export const AutoResize: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message... (auto-resizes)",
    autoResize: true,
  },
};

/**
 * Textarea in error state
 */
export const Error: Story = {
  args: {
    label: "Feedback",
    placeholder: "Enter your feedback...",
    variant: "error",
    error: "Feedback is required",
  },
};

/**
 * Disabled textarea
 */
export const Disabled: Story = {
  args: {
    label: "Disabled field",
    placeholder: "This field is disabled",
    disabled: true,
    value: "This content cannot be edited",
  },
};

/**
 * Required textarea
 */
export const Required: Story = {
  args: {
    label: "Required field",
    placeholder: "This field is required",
    required: true,
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    label: "Small textarea",
    size: "sm",
    placeholder: "Small size...",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium textarea",
    size: "md",
    placeholder: "Medium size...",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    label: "Large textarea",
    size: "lg",
    placeholder: "Large size...",
  },
};

/**
 * No resize
 */
export const NoResize: Story = {
  args: {
    label: "No resize",
    resize: "none",
    placeholder: "This textarea cannot be resized",
  },
};

/**
 * Horizontal resize
 */
export const HorizontalResize: Story = {
  args: {
    label: "Horizontal resize",
    resize: "horizontal",
    placeholder: "This textarea can be resized horizontally",
  },
};

/**
 * Both directions resize
 */
export const BothResize: Story = {
  args: {
    label: "Both directions resize",
    resize: "both",
    placeholder: "This textarea can be resized in both directions",
  },
};

/**
 * Controlled textarea
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <Textarea
          label="Controlled textarea"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={100}
          showCount
        />
        <p className="text-sm text-neutral-600">
          Current value: <strong>{value || "(empty)"}</strong>
        </p>
      </div>
    );
  },
};

/**
 * Form example with validation
 */
export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const hasError = submitted && value.length < 10;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      if (value.length >= 10) {
        alert("Form submitted successfully!");
        setValue("");
        setSubmitted(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          label="Feedback *"
          placeholder="Please provide your feedback (minimum 10 characters)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant={hasError ? "error" : "default"}
          error={
            hasError ? "Feedback must be at least 10 characters" : undefined
          }
          helperText={!hasError ? "Minimum 10 characters required" : undefined}
          maxLength={500}
          showCount
          required
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

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Textarea label="Small" size="sm" placeholder="Small size..." />
      <Textarea label="Medium" size="md" placeholder="Medium size..." />
      <Textarea label="Large" size="lg" placeholder="Large size..." />
    </div>
  ),
};

/**
 * Auto-resize example with long content
 */
export const AutoResizeExample: Story = {
  render: () => {
    const [value, setValue] = useState(
      "This is an auto-resizing textarea.\n\nTry adding more lines and watch it grow!\n\nIt automatically adjusts its height based on the content."
    );

    return (
      <Textarea
        label="Auto-resizing textarea"
        helperText="Add or remove lines to see the auto-resize in action"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoResize
        placeholder="Type here..."
      />
    );
  },
};

/**
 * Character limit example
 */
export const CharacterLimitExample: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxLength = 100;
    const remaining = maxLength - value.length;

    return (
      <div className="space-y-2">
        <Textarea
          label="Tweet"
          placeholder="What's happening?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          showCount
          variant={remaining < 0 ? "error" : "default"}
        />
        <p className="text-sm text-neutral-600">
          {remaining >= 0
            ? `${remaining} characters remaining`
            : `${Math.abs(remaining)} characters over limit`}
        </p>
      </div>
    );
  },
};
