import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Autocomplete, type AutocompleteOption } from "./autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "UI/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const countries: AutocompleteOption[] = [
  { id: "1", value: "us", label: "United States" },
  { id: "2", value: "uk", label: "United Kingdom" },
  { id: "3", value: "ca", label: "Canada" },
  { id: "4", value: "au", label: "Australia" },
  { id: "5", value: "de", label: "Germany" },
  { id: "6", value: "fr", label: "France" },
  { id: "7", value: "jp", label: "Japan" },
  { id: "8", value: "cn", label: "China" },
  { id: "9", value: "in", label: "India" },
  { id: "10", value: "br", label: "Brazil" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    return (
      <div className="w-[300px]">
        <Autocomplete
          options={countries}
          onValueChange={setValue}
          placeholder="Search countries..."
          label="Country"
        />
        {value && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected: {value.label}
          </p>
        )}
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    return (
      <div className="w-[300px]">
        <Autocomplete
          options={countries}
          onValueChange={setValue}
          placeholder="Search countries..."
        />
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(countries[0]);
    return (
      <div className="w-[300px]">
        <Autocomplete
          options={countries}
          onValueChange={setValue}
          defaultValue={countries[0]}
          placeholder="Search countries..."
          label="Country"
        />
      </div>
    );
  },
};

export const NotClearable: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    return (
      <div className="w-[300px]">
        <Autocomplete
          options={countries}
          onValueChange={setValue}
          placeholder="Search countries..."
          label="Country"
          clearable={false}
        />
      </div>
    );
  },
};

export const CustomEmptyMessage: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    return (
      <div className="w-[300px]">
        <Autocomplete
          options={countries}
          onValueChange={setValue}
          placeholder="Search countries..."
          label="Country"
          emptyMessage="No countries match your search."
        />
      </div>
    );
  },
};

const tags: AutocompleteOption[] = [
  { id: "1", value: "feature", label: "feature" },
  { id: "2", value: "bug", label: "bug" },
  { id: "3", value: "enhancement", label: "enhancement" },
  { id: "4", value: "documentation", label: "documentation" },
  { id: "5", value: "design", label: "design" },
  { id: "6", value: "question", label: "question" },
  { id: "7", value: "help-wanted", label: "help wanted" },
  { id: "8", value: "good-first-issue", label: "good first issue" },
];

export const TagsExample: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    return (
      <div className="w-[320px]">
        <Autocomplete
          options={tags}
          onValueChange={setValue}
          placeholder="e.g. feature"
          label="Search tags"
          emptyMessage="No tags found."
        />
      </div>
    );
  },
};
