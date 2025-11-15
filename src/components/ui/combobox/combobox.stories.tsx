import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Combobox, type ComboboxOption } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks: ComboboxOption[] = [
  { id: "1", value: "next", label: "Next.js" },
  { id: "2", value: "react", label: "React" },
  { id: "3", value: "vue", label: "Vue" },
  { id: "4", value: "svelte", label: "Svelte" },
  { id: "5", value: "angular", label: "Angular" },
  { id: "6", value: "solid", label: "SolidJS" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          onValueChange={setValue}
          placeholder="Select framework..."
          label="Framework"
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
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          onValueChange={setValue}
          placeholder="Select framework..."
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(null);
    const options: ComboboxOption[] = [
      { id: "1", value: "next", label: "Next.js" },
      { id: "2", value: "react", label: "React", disabled: true },
      { id: "3", value: "vue", label: "Vue" },
      { id: "4", value: "svelte", label: "Svelte", disabled: true },
      { id: "5", value: "angular", label: "Angular" },
    ];
    return (
      <div className="w-[300px]">
        <Combobox
          options={options}
          onValueChange={setValue}
          placeholder="Select framework..."
          label="Framework"
        />
      </div>
    );
  },
};

export const NotClearable: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(frameworks[0]);
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          onValueChange={setValue}
          placeholder="Select framework..."
          label="Framework"
          clearable={false}
        />
      </div>
    );
  },
};

export const CustomEmptyMessage: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          onValueChange={setValue}
          placeholder="Select framework..."
          label="Framework"
          emptyMessage="No frameworks match your search."
        />
      </div>
    );
  },
};

const fruits: ComboboxOption[] = [
  { id: "1", value: "apple", label: "Apple" },
  { id: "2", value: "banana", label: "Banana" },
  { id: "3", value: "orange", label: "Orange" },
  { id: "4", value: "grape", label: "Grape" },
  { id: "5", value: "mango", label: "Mango" },
  { id: "6", value: "strawberry", label: "Strawberry" },
  { id: "7", value: "watermelon", label: "Watermelon" },
  { id: "8", value: "pineapple", label: "Pineapple" },
];

export const FruitsExample: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <div className="w-[320px]">
        <Combobox
          options={fruits}
          onValueChange={setValue}
          placeholder="e.g. Apple"
          label="Choose a fruit"
          emptyMessage="No fruits found."
        />
      </div>
    );
  },
};
