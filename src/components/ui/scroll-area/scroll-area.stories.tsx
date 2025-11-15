import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const vernacularText = (
  <>
    <p>
      Vernacular architecture is building done outside any academic tradition,
      and without professional guidance. It is not a particular architectural
      movement or style, but rather a broad category, encompassing a wide range
      and variety of building types, with differing methods of construction,
      from around the world, both historical and extant and classical and
      modern. Vernacular architecture constitutes 95% of the world's built
      environment, as estimated in 1995 by Amos Rapoport, as measured against
      the small percentage of new buildings every year designed by architects
      and built by engineers.
    </p>
    <p>
      This type of architecture usually serves immediate, local needs, is
      constrained by the materials available in its particular region and
      reflects local traditions and cultural practices. The study of vernacular
      architecture does not examine formally schooled architects, but instead
      that of the design skills and tradition of local builders, who were rarely
      given any attribution for the work. More recently, vernacular architecture
      has been examined by designers and the building industry in an effort to
      be more energy conscious with contemporary design and construction—part of
      a broader interest in sustainable design.
    </p>
  </>
);

export const Default: Story = {
  render: () => <ScrollArea className="h-34">{vernacularText}</ScrollArea>,
};

export const Tall: Story = {
  render: () => (
    <ScrollArea className="h-96">
      {vernacularText}
      {vernacularText}
      {vernacularText}
    </ScrollArea>
  ),
};

export const Short: Story = {
  render: () => <ScrollArea className="h-48">{vernacularText}</ScrollArea>,
};

export const Wide: Story = {
  render: () => (
    <ScrollArea className="h-64 w-[600px]">
      <div className="whitespace-nowrap">
        <p>
          This is a very long line of text that will require horizontal
          scrolling to read completely. It demonstrates how the scroll area
          handles content that exceeds its width boundaries.
        </p>
        <p>
          Another long line that extends beyond the visible area, forcing the
          user to scroll horizontally to see all the content. This is useful for
          displaying code, tables, or other wide content.
        </p>
      </div>
    </ScrollArea>
  ),
};

export const WithList: Story = {
  render: () => (
    <ScrollArea className="h-72 w-80">
      <div className="space-y-2">
        <h4 className="font-medium">Items List</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-border bg-muted/50 p-2 text-sm"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <ScrollArea
      className="h-64 w-96"
      viewportClassName="bg-muted/30"
      scrollbarClassName="w-2 bg-muted/50"
      thumbClassName="bg-primary"
    >
      {vernacularText}
      {vernacularText}
    </ScrollArea>
  ),
};
