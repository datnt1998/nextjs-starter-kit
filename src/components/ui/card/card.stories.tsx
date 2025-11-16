import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "../button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has a shadow effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the shadow change.</p>
      </CardContent>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" className="w-[350px]">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>This card has a thicker border</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Perfect for emphasizing important content.</p>
      </CardContent>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" className="w-[350px]">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>This card has a subtle background</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Great for less prominent content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutPadding: Story = {
  render: () => (
    <Card padding="none" className="w-[350px]">
      <CardHeader padding="md">
        <CardTitle>Custom Padding</CardTitle>
        <CardDescription>Card with no default padding</CardDescription>
      </CardHeader>
      <CardContent padding="md">
        <p>You can control padding for each section independently.</p>
      </CardContent>
    </Card>
  ),
};

export const LargePadding: Story = {
  render: () => (
    <Card padding="lg" className="w-[400px]">
      <CardHeader padding="lg">
        <CardTitle>Large Padding</CardTitle>
        <CardDescription>More spacious card layout</CardDescription>
      </CardHeader>
      <CardContent padding="lg">
        <p>This card has larger padding for a more open feel.</p>
      </CardContent>
      <CardFooter padding="lg">
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const GradientPrimary: Story = {
  render: () => (
    <Card variant="gradient" gradient="primary" className="w-[350px]">
      <CardHeader>
        <CardTitle>Gradient Card</CardTitle>
        <CardDescription className="text-white/90">
          Primary gradient background
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card features a beautiful gradient background.</p>
      </CardContent>
    </Card>
  ),
};

export const GradientSuccess: Story = {
  render: () => (
    <Card variant="gradient" gradient="success" className="w-[350px]">
      <CardHeader>
        <CardTitle>Success Gradient</CardTitle>
        <CardDescription className="text-white/90">
          Green gradient for success states
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Perfect for highlighting achievements or positive metrics.</p>
      </CardContent>
    </Card>
  ),
};

export const GradientAccent: Story = {
  render: () => (
    <Card variant="gradient" gradient="accent" className="w-[350px]">
      <CardHeader>
        <CardTitle>Accent Gradient</CardTitle>
        <CardDescription className="text-white/90">
          Accent gradient for emphasis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Use this for special promotions or featured content.</p>
      </CardContent>
    </Card>
  ),
};

export const GlassEffect: Story = {
  render: () => (
    <div className="relative h-[400px] w-[400px] bg-linear-to-br from-blue-500 to-purple-600 p-8">
      <Card variant="glass" className="w-full">
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>
            Frosted glass effect with backdrop blur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a translucent background with blur effect.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" shadow="md" className="w-[350px]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover to see the elevation effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card lifts up when you hover over it.</p>
      </CardContent>
    </Card>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Card
      variant="gradient"
      gradient="primary"
      className="w-[350px]"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      }
    >
      <CardHeader>
        <CardTitle>Card with Icon</CardTitle>
        <CardDescription className="text-white/90">
          Icon displayed at the top
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Cards can include icons for visual emphasis.</p>
      </CardContent>
    </Card>
  ),
};

export const ShadowVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card shadow="xs" className="w-[200px]">
        <CardContent>
          <p className="text-sm font-medium">Shadow XS</p>
        </CardContent>
      </Card>
      <Card shadow="sm" className="w-[200px]">
        <CardContent>
          <p className="text-sm font-medium">Shadow SM</p>
        </CardContent>
      </Card>
      <Card shadow="md" className="w-[200px]">
        <CardContent>
          <p className="text-sm font-medium">Shadow MD</p>
        </CardContent>
      </Card>
      <Card shadow="lg" className="w-[200px]">
        <CardContent>
          <p className="text-sm font-medium">Shadow LG</p>
        </CardContent>
      </Card>
      <Card shadow="xl" className="w-[200px]">
        <CardContent>
          <p className="text-sm font-medium">Shadow XL</p>
        </CardContent>
      </Card>
      <Card shadow="2xl" className="w-[200px]">
        <CardContent>
          <p className="text-sm font-medium">Shadow 2XL</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ColoredShadows: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card
        variant="gradient"
        gradient="primary"
        shadow="lg"
        shadowColor="primary"
        className="w-[250px]"
      >
        <CardContent>
          <p className="font-medium">Primary Shadow</p>
          <p className="mt-2 text-sm text-white/90">
            Gradient with matching colored shadow
          </p>
        </CardContent>
      </Card>
      <Card
        variant="gradient"
        gradient="success"
        shadow="lg"
        shadowColor="success"
        className="w-[250px]"
      >
        <CardContent>
          <p className="font-medium">Success Shadow</p>
          <p className="mt-2 text-sm text-white/90">
            Green gradient with green shadow
          </p>
        </CardContent>
      </Card>
      <Card
        variant="gradient"
        gradient="accent"
        shadow="lg"
        shadowColor="accent"
        className="w-[250px]"
      >
        <CardContent>
          <p className="font-medium">Accent Shadow</p>
          <p className="mt-2 text-sm text-white/90">
            Accent gradient with matching shadow
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const HoverStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card
        variant="interactive"
        shadow="sm"
        className="w-[250px] hover:shadow-xl"
      >
        <CardContent>
          <p className="font-medium">Hover Shadow Change</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Shadow increases on hover
          </p>
        </CardContent>
      </Card>
      <Card variant="elevated" className="w-[250px]">
        <CardContent>
          <p className="font-medium">Elevated Hover</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Built-in hover shadow effect
          </p>
        </CardContent>
      </Card>
      <Card variant="interactive" shadow="md" className="w-[250px]">
        <CardContent>
          <p className="font-medium">Interactive Lift</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Card lifts up on hover
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const AllGradientCombinations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="gradient" gradient="primary" className="w-[200px]">
        <CardContent>
          <p className="font-medium">Primary</p>
        </CardContent>
      </Card>
      <Card variant="gradient" gradient="secondary" className="w-[200px]">
        <CardContent>
          <p className="font-medium">Secondary</p>
        </CardContent>
      </Card>
      <Card variant="gradient" gradient="success" className="w-[200px]">
        <CardContent>
          <p className="font-medium">Success</p>
        </CardContent>
      </Card>
      <Card variant="gradient" gradient="accent" className="w-[200px]">
        <CardContent>
          <p className="font-medium">Accent</p>
        </CardContent>
      </Card>
    </div>
  ),
};
