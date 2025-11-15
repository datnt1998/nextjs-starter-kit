import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "The visual style variant of the select",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the select",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Select a fruit"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        placeholder="Choose a fruit"
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Favorite Fruit"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        placeholder="Choose your favorite"
        helperText="Select your most preferred fruit"
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Required Field"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        placeholder="Select an option"
        variant="error"
        error="This field is required"
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Small Select"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        size="sm"
        placeholder="Small"
      />
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Medium Select"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        size="md"
        placeholder="Medium"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Large Select"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        size="lg"
        placeholder="Large"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("apple");
    return (
      <Select
        label="Disabled Select"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        disabled
      />
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onValueChange={(val) => setValue(val as string)}
        placeholder="Search countries..."
        searchable
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <Select
        label="Select Multiple Fruits"
        options={options}
        value={values}
        onValueChange={(val) => setValues(val as string[])}
        placeholder="Choose fruits"
        multiple
      />
    );
  },
};

export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = useState("banana");
    return (
      <Select
        label="Fruit"
        options={options}
        value={value}
        onValueChange={(val) => setValue(val as string)}
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("apple");

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Select
          label="Default"
          options={options}
          value={value1}
          onValueChange={(val) => setValue1(val as string)}
          placeholder="Select..."
        />
        <Select
          label="With helper text"
          options={options}
          value={value2}
          onValueChange={(val) => setValue2(val as string)}
          placeholder="Select..."
          helperText="Choose your option"
        />
        <Select
          label="Error state"
          options={options}
          value={value3}
          onValueChange={(val) => setValue3(val as string)}
          placeholder="Select..."
          variant="error"
          error="This field is required"
        />
        <Select
          label="Disabled"
          options={options}
          value={value4}
          onValueChange={(val) => setValue4(val as string)}
          disabled
        />
        <div className="flex flex-col gap-2">
          <Select
            size="sm"
            options={options}
            value={value1}
            onValueChange={(val) => setValue1(val as string)}
            placeholder="Small"
          />
          <Select
            size="md"
            options={options}
            value={value1}
            onValueChange={(val) => setValue1(val as string)}
            placeholder="Medium"
          />
          <Select
            size="lg"
            options={options}
            value={value1}
            onValueChange={(val) => setValue1(val as string)}
            placeholder="Large"
          />
        </div>
      </div>
    );
  },
};
