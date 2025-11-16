import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./container";
import { Card, CardContent } from "../card";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <Card>
    <CardContent>
      <p className="text-muted-foreground">
        This content is inside a container. Resize your browser window to see
        how the container responds to different screen sizes.
      </p>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container>
        <h2 className="text-2xl font-bold mb-4">Default Container (xl)</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container size="sm">
        <h2 className="text-2xl font-bold mb-4">Small Container</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const Medium: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container size="md">
        <h2 className="text-2xl font-bold mb-4">Medium Container</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container size="lg">
        <h2 className="text-2xl font-bold mb-4">Large Container</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const ExtraLarge2xl: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container size="2xl">
        <h2 className="text-2xl font-bold mb-4">2XL Container</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container size="full">
        <h2 className="text-2xl font-bold mb-4">Full Width Container</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container padding="none">
        <h2 className="text-2xl font-bold mb-4 px-6">
          Container with No Padding
        </h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const LargePadding: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container padding="xl">
        <h2 className="text-2xl font-bold mb-4">Container with XL Padding</h2>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const Centered: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container centered size="md">
        <h2 className="text-2xl font-bold mb-4">Centered Container</h2>
        <DemoContent />
        <p className="mt-4 text-center text-muted-foreground">
          Content is centered within the container
        </p>
      </Container>
    </div>
  ),
};

export const AsMain: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container as="main" size="lg">
        <h1 className="text-3xl font-bold mb-4">Main Content Area</h1>
        <DemoContent />
        <p className="mt-4 text-muted-foreground">
          This container is rendered as a &lt;main&gt; element for better
          semantics.
        </p>
      </Container>
    </div>
  ),
};

export const MultipleContainers: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8 space-y-8">
      <Container as="header" size="full" padding="lg">
        <h1 className="text-3xl font-bold">Header (Full Width)</h1>
      </Container>
      <Container as="main" size="lg">
        <h2 className="text-2xl font-bold mb-4">Main Content (Large)</h2>
        <DemoContent />
      </Container>
      <Container as="aside" size="md">
        <h3 className="text-xl font-bold mb-4">Sidebar (Medium)</h3>
        <DemoContent />
      </Container>
    </div>
  ),
};
