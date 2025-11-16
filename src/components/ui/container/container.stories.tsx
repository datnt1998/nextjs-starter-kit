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

// Background Variants Stories

export const BackgroundMuted: Story = {
  render: () => (
    <div className="min-h-screen py-8">
      <Container background="muted" padding="lg" rounded="xl">
        <h2 className="text-2xl font-bold mb-4">Muted Background</h2>
        <p className="text-muted-foreground">
          Container with a subtle muted background color.
        </p>
      </Container>
    </div>
  ),
};

export const BackgroundCard: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="xl">
        <h2 className="text-2xl font-bold mb-4">Card Background</h2>
        <p className="text-muted-foreground">
          Container with card background color for elevated appearance.
        </p>
      </Container>
    </div>
  ),
};

// Gradient Background Stories

export const GradientPrimary: Story = {
  render: () => (
    <div className="min-h-screen py-8">
      <Container
        background="gradient"
        gradient="primary"
        padding="lg"
        rounded="2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Primary Gradient</h2>
        <p className="text-muted-foreground">
          Container with a subtle primary gradient background. The text color
          automatically adjusts for proper contrast.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <p className="text-sm">Card inside gradient container</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm">Another card with content</p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  ),
};

export const GradientSecondary: Story = {
  render: () => (
    <div className="min-h-screen py-8">
      <Container
        background="gradient"
        gradient="secondary"
        padding="lg"
        rounded="2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Secondary Gradient</h2>
        <p className="text-muted-foreground">
          Container with a secondary gradient from purple to accent colors.
        </p>
      </Container>
    </div>
  ),
};

export const GradientSuccess: Story = {
  render: () => (
    <div className="min-h-screen py-8">
      <Container
        background="gradient"
        gradient="success"
        padding="lg"
        rounded="2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Success Gradient</h2>
        <p className="text-muted-foreground">
          Container with a success gradient for positive messaging.
        </p>
      </Container>
    </div>
  ),
};

export const GradientAccent: Story = {
  render: () => (
    <div className="min-h-screen py-8">
      <Container
        background="gradient"
        gradient="accent"
        padding="lg"
        rounded="2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Accent Gradient</h2>
        <p className="text-muted-foreground">
          Container with an accent gradient for emphasis.
        </p>
      </Container>
    </div>
  ),
};

export const GradientSubtle: Story = {
  render: () => (
    <div className="min-h-screen py-8">
      <Container
        background="gradient"
        gradient="subtle"
        padding="lg"
        rounded="2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Subtle Gradient</h2>
        <p className="text-muted-foreground">
          Container with a very subtle gradient from background to muted.
        </p>
      </Container>
    </div>
  ),
};

// Glass Effect Story

export const GlassEffect: Story = {
  render: () => (
    <div
      className="min-h-screen py-8 bg-gradient-to-br from-blue-500 to-purple-600"
      style={{
        backgroundImage:
          'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
      }}
    >
      <Container background="glass" padding="lg" rounded="2xl">
        <h2 className="text-2xl font-bold mb-4">Glass Morphism Effect</h2>
        <p className="text-muted-foreground mb-4">
          Container with backdrop blur and semi-transparent background creating
          a modern glass effect.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <p className="text-sm">Card 1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm">Card 2</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm">Card 3</p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  ),
};

// Rounded Corner Variants

export const RoundedNone: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="none">
        <h2 className="text-2xl font-bold mb-4">No Rounded Corners</h2>
        <p className="text-muted-foreground">
          Container with sharp corners (rounded-none).
        </p>
      </Container>
    </div>
  ),
};

export const RoundedSmall: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="sm">
        <h2 className="text-2xl font-bold mb-4">Small Rounded Corners</h2>
        <p className="text-muted-foreground">
          Container with small rounded corners (8px).
        </p>
      </Container>
    </div>
  ),
};

export const RoundedMedium: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="md">
        <h2 className="text-2xl font-bold mb-4">Medium Rounded Corners</h2>
        <p className="text-muted-foreground">
          Container with medium rounded corners (12px).
        </p>
      </Container>
    </div>
  ),
};

export const RoundedLarge: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="lg">
        <h2 className="text-2xl font-bold mb-4">
          Large Rounded Corners (Default)
        </h2>
        <p className="text-muted-foreground">
          Container with large rounded corners (16px) - this is the default.
        </p>
      </Container>
    </div>
  ),
};

export const RoundedExtraLarge: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="xl">
        <h2 className="text-2xl font-bold mb-4">Extra Large Rounded Corners</h2>
        <p className="text-muted-foreground">
          Container with extra large rounded corners (20px).
        </p>
      </Container>
    </div>
  ),
};

export const Rounded2XL: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="2xl">
        <h2 className="text-2xl font-bold mb-4">2XL Rounded Corners</h2>
        <p className="text-muted-foreground">
          Container with 2XL rounded corners (24px) for a modern look.
        </p>
      </Container>
    </div>
  ),
};

export const Rounded3XL: Story = {
  render: () => (
    <div className="bg-muted min-h-screen py-8">
      <Container background="card" padding="lg" rounded="3xl">
        <h2 className="text-2xl font-bold mb-4">3XL Rounded Corners</h2>
        <p className="text-muted-foreground">
          Container with 3XL rounded corners (32px) for maximum roundness.
        </p>
      </Container>
    </div>
  ),
};

// Combined Features Story

export const CombinedFeatures: Story = {
  render: () => (
    <div className="min-h-screen py-8 space-y-8">
      <Container
        background="gradient"
        gradient="primary"
        padding="lg"
        rounded="2xl"
        size="lg"
      >
        <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
        <p className="text-muted-foreground mb-6">
          Combining gradient background with large rounded corners for a modern
          hero section.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-2 bg-transparent border-2 border-white text-foreground rounded-lg font-medium hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </Container>

      <Container background="glass" padding="lg" rounded="xl" size="md">
        <h3 className="text-xl font-bold mb-3">Glass Card</h3>
        <p className="text-muted-foreground">
          Glass effect with rounded corners for a floating appearance.
        </p>
      </Container>

      <Container background="muted" padding="lg" rounded="lg" size="xl">
        <h3 className="text-xl font-bold mb-3">Content Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <h4 className="font-semibold mb-2">Feature 1</h4>
              <p className="text-sm text-muted-foreground">
                Description of feature one
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="font-semibold mb-2">Feature 2</h4>
              <p className="text-sm text-muted-foreground">
                Description of feature two
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="font-semibold mb-2">Feature 3</h4>
              <p className="text-sm text-muted-foreground">
                Description of feature three
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  ),
};
