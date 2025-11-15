import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Base UI</h4>
        <p className="text-sm text-muted-foreground">
          Unstyled, accessible components.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-sm">Item 1</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Item 2</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Item 3</div>
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>Section 1</div>
      <Separator variant="dashed" />
      <div>Section 2</div>
    </div>
  ),
};

export const Dotted: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>Section 1</div>
      <Separator variant="dotted" />
      <div>Section 2</div>
    </div>
  ),
};
