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
