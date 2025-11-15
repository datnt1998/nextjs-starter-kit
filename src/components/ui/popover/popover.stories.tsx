import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTitle, PopoverDescription } from "./popover";
import { Button } from "../button";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The side of the trigger to place the popover",
    },
    showArrow: {
      control: "boolean",
      description: "Whether to show an arrow",
    },
    showBackdrop: {
      control: "boolean",
      description: "Whether to show a backdrop",
    },
    showClose: {
      control: "boolean",
      description: "Whether to show a close button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

const BellIcon = () => (
  <svg
    fill="currentcolor"
    width="20"
    height="20"
    viewBox="0 0 16 16"
    aria-label="Notifications"
  >
    <path d="M 8 1 C 7.453125 1 7 1.453125 7 2 L 7 3.140625 C 5.28125 3.589844 4 5.144531 4 7 L 4 10.984375 C 4 10.984375 3.984375 11.261719 3.851563 11.519531 C 3.71875 11.78125 3.558594 12 3 12 L 3 13 L 13 13 L 13 12 C 12.40625 12 12.253906 11.78125 12.128906 11.53125 C 12.003906 11.277344 12 11.003906 12 11.003906 L 12 7 C 12 5.144531 10.71875 3.589844 9 3.140625 L 9 2 C 9 1.453125 8.546875 1 8 1 Z M 8 13 C 7.449219 13 7 13.449219 7 14 C 7 14.550781 7.449219 15 8 15 C 8.550781 15 9 14.550781 9 14 C 9 13.449219 8.550781 13 8 13 Z M 8 4 C 9.664063 4 11 5.335938 11 7 L 11 10.996094 C 11 10.996094 10.988281 11.472656 11.234375 11.96875 C 11.238281 11.980469 11.246094 11.988281 11.25 12 L 4.726563 12 C 4.730469 11.992188 4.738281 11.984375 4.742188 11.980469 C 4.992188 11.488281 5 11.015625 5 11.015625 L 5 7 C 5 5.335938 6.335938 4 8 4 Z" />
  </svg>
);

/**
 * Default popover
 */
export const Default: Story = {
  args: {
    trigger: (
      <button className="flex size-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-900">
        <BellIcon />
      </button>
    ),
    children: (
      <>
        <PopoverTitle className="text-base font-medium mb-2">
          Notifications
        </PopoverTitle>
        <PopoverDescription className="text-base text-gray-600">
          You are all caught up. Good job!
        </PopoverDescription>
      </>
    ),
  },
};

/**
 * With Button trigger
 */
export const WithButton: Story = {
  args: {
    trigger: <Button>Open Popover</Button>,
    children: (
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Popover Title</h3>
        <p className="text-neutral-600">
          This is a popover with some content inside.
        </p>
      </div>
    ),
  },
};

/**
 * Without arrow
 */
export const WithoutArrow: Story = {
  args: {
    trigger: <Button>No Arrow</Button>,
    showArrow: false,
    children: (
      <div>
        <h3 className="font-semibold mb-2">No Arrow</h3>
        <p className="text-neutral-600">This popover has no arrow.</p>
      </div>
    ),
  },
};

/**
 * Without close button
 */
export const WithoutClose: Story = {
  args: {
    trigger: <Button>No Close Button</Button>,
    showClose: false,
    children: (
      <div>
        <h3 className="font-semibold mb-2">No Close Button</h3>
        <p className="text-neutral-600">
          Click outside or press Escape to close.
        </p>
      </div>
    ),
  },
};

/**
 * With backdrop
 */
export const WithBackdrop: Story = {
  args: {
    trigger: <Button>With Backdrop</Button>,
    showBackdrop: true,
    children: (
      <div>
        <h3 className="font-semibold mb-2">Modal Popover</h3>
        <p className="text-neutral-600">This popover has a backdrop overlay.</p>
      </div>
    ),
  },
};

/**
 * Different placements
 */
export const Placements: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4 p-20">
      <Popover
        trigger={<Button>Top</Button>}
        side="top"
        children={<div className="p-2">Popover on top</div>}
      />
      <Popover
        trigger={<Button>Bottom</Button>}
        side="bottom"
        children={<div className="p-2">Popover on bottom</div>}
      />
      <Popover
        trigger={<Button>Left</Button>}
        side="left"
        children={<div className="p-2">Popover on left</div>}
      />
      <Popover
        trigger={<Button>Right</Button>}
        side="right"
        children={<div className="p-2">Popover on right</div>}
      />
    </div>
  ),
};

/**
 * Rich content example
 */
export const RichContent: Story = {
  args: {
    trigger: <Button>View Details</Button>,
    children: (
      <div className="space-y-3 max-w-sm">
        <div>
          <h3 className="font-semibold text-lg mb-1">Product Details</h3>
          <p className="text-sm text-neutral-600">
            Premium wireless headphones with active noise cancellation
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Price:</span>
            <span className="font-semibold">$299.99</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">In Stock:</span>
            <span className="text-success-600 font-medium">Available</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Rating:</span>
            <span>⭐⭐⭐⭐⭐ (4.8)</span>
          </div>
        </div>
        <div className="pt-2 border-t border-neutral-200">
          <Button size="sm" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    ),
  },
};

/**
 * Form example
 */
export const FormExample: Story = {
  args: {
    trigger: <Button>Edit Profile</Button>,
    showClose: true,
    children: (
      <div className="space-y-4 w-80">
        <h3 className="font-semibold text-lg">Edit Profile</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              Save
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Notification example
 */
export const NotificationExample: Story = {
  args: {
    trigger: (
      <button className="relative flex size-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100">
        <BellIcon />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error-600 text-xs text-white">
          3
        </span>
      </button>
    ),
    children: (
      <div className="space-y-3 w-80">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <div className="space-y-2">
          <div className="p-3 bg-primary-50 rounded-md">
            <p className="text-sm font-medium">New message</p>
            <p className="text-xs text-neutral-600">John sent you a message</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-md">
            <p className="text-sm font-medium">Update available</p>
            <p className="text-xs text-neutral-600">Version 2.0 is ready</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-md">
            <p className="text-sm font-medium">Task completed</p>
            <p className="text-xs text-neutral-600">Your export is ready</p>
          </div>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all notifications
        </button>
      </div>
    ),
  },
};
