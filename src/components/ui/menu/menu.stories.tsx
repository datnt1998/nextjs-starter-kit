import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./menu";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronDown,
  IconPlus,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const meta = {
  title: "UI/Menu",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

/**
 * Basic menu with simple items
 */
export const Default: Story = {
  args: {},
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        Options <IconChevronDown className="w-4 h-4" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Item>New File</Menu.Item>
            <Menu.Item>Open File</Menu.Item>
            <Menu.Item>Save</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Exit</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

/**
 * Menu with icons
 */
export const WithIcons: Story = {
  args: {},
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        Actions <IconChevronDown className="w-4 h-4" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup>
            <Menu.Item className="gap-2">
              <IconPlus className="w-4 h-4" />
              <span>Create</span>
            </Menu.Item>
            <Menu.Item className="gap-2">
              <IconEdit className="w-4 h-4" />
              <span>Edit</span>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item className="gap-2 text-destructive focus:text-destructive data-highlighted:text-destructive">
              <IconTrash className="w-4 h-4" />
              <span>Delete</span>
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

/**
 * User menu example
 */
export const UserMenu: Story = {
  args: {},
  render: () => (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium text-sm">
          JD
        </div>
        <span>John Doe</span>
        <IconChevronDown className="w-4 h-4" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end">
          <Menu.Popup className="w-56">
            <div className="px-2 py-3 border-b border-border">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <div className="py-1">
              <Menu.Item className="gap-2">
                <IconUser className="w-4 h-4" />
                <span>Profile</span>
              </Menu.Item>
              <Menu.Item className="gap-2">
                <IconSettings className="w-4 h-4" />
                <span>Settings</span>
              </Menu.Item>
            </div>
            <Menu.Separator />
            <div className="py-1">
              <Menu.Item className="gap-2 text-destructive focus:text-destructive data-highlighted:text-destructive">
                <IconLogout className="w-4 h-4" />
                <span>Sign out</span>
              </Menu.Item>
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

/**
 * Menu with labels
 */
export const WithLabels: Story = {
  args: {},
  render: () => (
    <Menu.Root>
      <Menu.Trigger>
        Menu <IconChevronDown className="w-4 h-4" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="w-48">
            <Menu.Label>File</Menu.Label>
            <Menu.Item>New</Menu.Item>
            <Menu.Item>Open</Menu.Item>
            <Menu.Item>Save</Menu.Item>
            <Menu.Separator />
            <Menu.Label>Edit</Menu.Label>
            <Menu.Item>Cut</Menu.Item>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Paste</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ),
};

/**
 * Menu with different alignments
 */
export const Alignments: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4">
      <Menu.Root>
        <Menu.Trigger>Align Start</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="start">
            <Menu.Popup>
              <Menu.Item>Item 1</Menu.Item>
              <Menu.Item>Item 2</Menu.Item>
              <Menu.Item>Item 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger>Align Center</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="center">
            <Menu.Popup>
              <Menu.Item>Item 1</Menu.Item>
              <Menu.Item>Item 2</Menu.Item>
              <Menu.Item>Item 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger>Align End</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="end">
            <Menu.Popup>
              <Menu.Item>Item 1</Menu.Item>
              <Menu.Item>Item 2</Menu.Item>
              <Menu.Item>Item 3</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  ),
};
