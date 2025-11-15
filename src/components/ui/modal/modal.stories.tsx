import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "./modal";
import { Button } from "../button";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the modal",
    },
    open: {
      control: "boolean",
      description: "Controls whether the modal is open",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = ({
  size = "md",
  children,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} size={size}>
        {children || (
          <>
            <ModalHeader>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>
                This is a modal description explaining what this modal is for.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p>
                This is the modal body content. You can put any content here.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};

export const Small: Story = {
  render: () => <ModalWrapper size="sm" />,
};

export const Medium: Story = {
  render: () => <ModalWrapper size="md" />,
};

export const Large: Story = {
  render: () => <ModalWrapper size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalWrapper size="xl" />,
};

export const FullScreen: Story = {
  render: () => <ModalWrapper size="full" />,
};

export const WithForm: Story = {
  render: () => (
    <ModalWrapper>
      <ModalHeader>
        <ModalTitle>Create Account</ModalTitle>
        <ModalDescription>
          Fill in your details to create a new account.
        </ModalDescription>
      </ModalHeader>
      <ModalBody>
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
      </ModalBody>
      <ModalFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Create Account</Button>
      </ModalFooter>
    </ModalWrapper>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <ModalWrapper size="sm">
      <ModalHeader>
        <ModalTitle>Delete Account</ModalTitle>
        <ModalDescription>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </ModalFooter>
    </ModalWrapper>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWrapper>
      <ModalHeader>
        <ModalTitle>Terms and Conditions</ModalTitle>
        <ModalDescription>
          Please read and accept our terms and conditions.
        </ModalDescription>
      </ModalHeader>
      <ModalBody>
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
      </ModalBody>
      <ModalFooter>
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </ModalFooter>
    </ModalWrapper>
  ),
};
