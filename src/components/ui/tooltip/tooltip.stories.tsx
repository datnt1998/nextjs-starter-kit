import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { Button } from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The side of the trigger to place the tooltip",
    },
    showArrow: {
      control: "boolean",
      description: "Whether to show an arrow",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Default tooltip on top
 */
export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

/**
 * Tooltip on bottom
 */
export const Bottom: Story = {
  args: {
    content: "Tooltip on bottom",
    side: "bottom",
    children: <Button>Hover me</Button>,
  },
};

/**
 * Tooltip on left
 */
export const Left: Story = {
  args: {
    content: "Tooltip on left",
    side: "left",
    children: <Button>Hover me</Button>,
  },
};

/**
 * Tooltip on right
 */
export const Right: Story = {
  args: {
    content: "Tooltip on right",
    side: "right",
    children: <Button>Hover me</Button>,
  },
};

/**
 * Without arrow
 */
export const WithoutArrow: Story = {
  args: {
    content: "Tooltip without arrow",
    showArrow: false,
    children: <Button>Hover me</Button>,
  },
};

/**
 * Long content
 */
export const LongContent: Story = {
  args: {
    content:
      "This is a longer tooltip with more information that spans multiple lines",
    children: <Button>Hover me</Button>,
    className: "max-w-xs",
  },
};

/**
 * With custom delay
 */
export const CustomDelay: Story = {
  args: {
    content: "This tooltip appears after 1 second",
    delay: 1000,
    children: <Button>Hover me (1s delay)</Button>,
  },
};

/**
 * All placements
 */
export const AllPlacements: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4 p-20">
      <Tooltip content="Top" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

/**
 * Icon button example
 */
export const IconButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Edit">
        <button className="p-2 rounded hover:bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button className="p-2 rounded hover:bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Settings">
        <button className="p-2 rounded hover:bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};
