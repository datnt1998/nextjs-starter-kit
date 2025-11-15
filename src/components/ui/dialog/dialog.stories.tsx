import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "./dialog";
import { Button } from "../button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      description: "The size of the dialog",
    },
    open: {
      control: "boolean",
      description: "Controls whether the dialog is open",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWrapper = ({
  size = "md",
  children,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} size={size}>
        {children || (
          <>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description explaining what this dialog is for.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p>
                This is the dialog body content. You can put any content here.
              </p>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <DialogWrapper />,
};

export const Small: Story = {
  render: () => <DialogWrapper size="sm" />,
};

export const Medium: Story = {
  render: () => <DialogWrapper size="md" />,
};

export const Large: Story = {
  render: () => <DialogWrapper size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <DialogWrapper size="xl" />,
};

export const ExtraLarge2xl: Story = {
  render: () => <DialogWrapper size="2xl" />,
};

export const FullScreen: Story = {
  render: () => <DialogWrapper size="full" />,
};

export const WithForm: Story = {
  render: () => (
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Create Account</DialogTitle>
        <DialogDescription>
          Fill in your details to create a new account.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="••••••••"
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Create Account</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <DialogWrapper size="sm">
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const LongContent: Story = {
  render: () => (
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogDescription>
          Please read and accept our terms and conditions.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <DialogWrapper>
      <DialogClose />
      <DialogHeader>
        <DialogTitle>Notification Settings</DialogTitle>
        <DialogDescription>
          Manage how you receive notifications.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Receive notifications via email
              </p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Receive push notifications on your device
              </p>
            </div>
            <input type="checkbox" />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};
