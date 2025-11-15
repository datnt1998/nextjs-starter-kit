import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "pills", "bordered"],
      description: "Visual variant of the tabs",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the tabs",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout orientation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const basicTabs = [
  {
    value: "tab1",
    label: "Tab 1",
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
        <p className="text-neutral-600">
          This is the content for the first tab.
        </p>
      </div>
    ),
  },
  {
    value: "tab2",
    label: "Tab 2",
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
        <p className="text-neutral-600">
          This is the content for the second tab.
        </p>
      </div>
    ),
  },
  {
    value: "tab3",
    label: "Tab 3",
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
        <p className="text-neutral-600">
          This is the content for the third tab.
        </p>
      </div>
    ),
  },
];

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
  </svg>
);

const tabsWithIcons = [
  {
    value: "home",
    label: "Home",
    icon: <HomeIcon />,
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Home</h3>
        <p className="text-neutral-600">Welcome to the home page.</p>
      </div>
    ),
  },
  {
    value: "profile",
    label: "Profile",
    icon: <UserIcon />,
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Profile</h3>
        <p className="text-neutral-600">Manage your profile settings.</p>
      </div>
    ),
  },
  {
    value: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Settings</h3>
        <p className="text-neutral-600">Configure your preferences.</p>
      </div>
    ),
  },
];

/**
 * Default underline tabs
 */
export const Default: Story = {
  args: {
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Pills variant
 */
export const Pills: Story = {
  args: {
    variant: "pills",
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Bordered variant
 */
export const Bordered: Story = {
  args: {
    variant: "bordered",
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Tabs with icons
 */
export const WithIcons: Story = {
  args: {
    tabs: tabsWithIcons,
    defaultValue: "home",
  },
};

/**
 * Tabs with icons (pills variant)
 */
export const WithIconsPills: Story = {
  args: {
    variant: "pills",
    tabs: tabsWithIcons,
    defaultValue: "home",
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    size: "sm",
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    size: "md",
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    size: "lg",
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    tabs: basicTabs,
    defaultValue: "tab1",
  },
};

/**
 * Vertical with pills variant
 */
export const VerticalPills: Story = {
  args: {
    orientation: "vertical",
    variant: "pills",
    tabs: tabsWithIcons,
    defaultValue: "home",
  },
};

/**
 * Disabled tab
 */
export const WithDisabled: Story = {
  args: {
    tabs: [
      ...basicTabs.slice(0, 2),
      {
        value: "tab3",
        label: "Tab 3 (Disabled)",
        disabled: true,
        content: <div>This content should not be visible</div>,
      },
    ],
    defaultValue: "tab1",
  },
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-neutral-700">
          Underline
        </h3>
        <Tabs variant="underline" tabs={basicTabs} defaultValue="tab1" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4 text-neutral-700">Pills</h3>
        <Tabs variant="pills" tabs={basicTabs} defaultValue="tab1" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4 text-neutral-700">
          Bordered
        </h3>
        <Tabs variant="bordered" tabs={basicTabs} defaultValue="tab1" />
      </div>
    </div>
  ),
};

/**
 * Dashboard example
 */
export const DashboardExample: Story = {
  render: () => (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <Tabs
        variant="underline"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Total Users</p>
                    <p className="text-2xl font-bold text-primary-600">1,234</p>
                  </div>
                  <div className="p-4 bg-success-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Revenue</p>
                    <p className="text-2xl font-bold text-success-600">
                      $12,345
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Orders</p>
                    <p className="text-2xl font-bold text-secondary-600">567</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            value: "analytics",
            label: "Analytics",
            content: (
              <div className="p-4">
                <p className="text-neutral-600">
                  Analytics charts would go here
                </p>
              </div>
            ),
          },
          {
            value: "reports",
            label: "Reports",
            content: (
              <div className="p-4">
                <p className="text-neutral-600">Reports would go here</p>
              </div>
            ),
          },
        ]}
        defaultValue="overview"
      />
    </div>
  ),
};
