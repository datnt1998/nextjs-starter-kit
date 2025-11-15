import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
      description: "Visual variant of the accordion",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple items to be open at once",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const basicItems = [
  {
    value: "item-1",
    trigger: "What is your return policy?",
    content: (
      <p className="text-neutral-600">
        We offer a 30-day return policy for all unused items in their original
        packaging. Please contact our support team to initiate a return.
      </p>
    ),
  },
  {
    value: "item-2",
    trigger: "How long does shipping take?",
    content: (
      <p className="text-neutral-600">
        Standard shipping typically takes 5-7 business days. Express shipping
        options are available at checkout for faster delivery.
      </p>
    ),
  },
  {
    value: "item-3",
    trigger: "Do you ship internationally?",
    content: (
      <p className="text-neutral-600">
        Yes, we ship to most countries worldwide. International shipping times
        and costs vary by destination.
      </p>
    ),
  },
];

/**
 * Default accordion with single expansion
 */
export const Default: Story = {
  args: {
    items: basicItems,
    defaultValue: ["item-1"],
  },
};

/**
 * Bordered variant
 */
export const Bordered: Story = {
  args: {
    variant: "bordered",
    items: basicItems,
    defaultValue: ["item-1"],
  },
};

/**
 * Separated variant
 */
export const Separated: Story = {
  args: {
    variant: "separated",
    items: basicItems,
    defaultValue: ["item-1"],
  },
};

/**
 * Multiple expansion mode
 */
export const MultipleExpansion: Story = {
  args: {
    multiple: true,
    items: basicItems,
    defaultValue: ["item-1", "item-2"],
  },
};

/**
 * With disabled item
 */
export const WithDisabled: Story = {
  args: {
    items: [
      ...basicItems.slice(0, 2),
      {
        value: "item-3",
        trigger: "This item is disabled",
        content: <p>This content should not be visible</p>,
        disabled: true,
      },
    ],
    defaultValue: ["item-1"],
  },
};

/**
 * Rich content example
 */
export const RichContent: Story = {
  args: {
    variant: "separated",
    items: [
      {
        value: "features",
        trigger: "Features",
        content: (
          <div className="space-y-2">
            <h4 className="font-semibold text-neutral-900">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Fast and reliable performance</li>
              <li>Easy to use interface</li>
              <li>24/7 customer support</li>
              <li>Regular updates and improvements</li>
            </ul>
          </div>
        ),
      },
      {
        value: "pricing",
        trigger: "Pricing",
        content: (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
              <span className="font-medium">Basic Plan</span>
              <span className="text-lg font-bold text-primary-600">$9/mo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
              <span className="font-medium">Pro Plan</span>
              <span className="text-lg font-bold text-primary-600">$29/mo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded">
              <span className="font-medium">Enterprise</span>
              <span className="text-lg font-bold text-primary-600">Custom</span>
            </div>
          </div>
        ),
      },
      {
        value: "support",
        trigger: "Support",
        content: (
          <div className="space-y-2 text-neutral-600">
            <p>
              Our support team is available 24/7 to help you with any questions
              or issues.
            </p>
            <p className="font-medium text-neutral-900">Contact us:</p>
            <ul className="space-y-1">
              <li>Email: support@example.com</li>
              <li>Phone: 1-800-123-4567</li>
              <li>Live Chat: Available on our website</li>
            </ul>
          </div>
        ),
      },
    ],
    defaultValue: ["features"],
  },
};

/**
 * FAQ example
 */
export const FAQ: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion
        variant="separated"
        items={[
          {
            value: "q1",
            trigger: "How do I create an account?",
            content: (
              <p className="text-neutral-600">
                Click the "Sign Up" button in the top right corner and follow
                the registration process. You'll need to provide your email
                address and create a password.
              </p>
            ),
          },
          {
            value: "q2",
            trigger: "Is my data secure?",
            content: (
              <p className="text-neutral-600">
                Yes, we use industry-standard encryption and security measures
                to protect your data. All data is encrypted in transit and at
                rest.
              </p>
            ),
          },
          {
            value: "q3",
            trigger: "Can I cancel my subscription anytime?",
            content: (
              <p className="text-neutral-600">
                Absolutely! You can cancel your subscription at any time from
                your account settings. There are no cancellation fees.
              </p>
            ),
          },
          {
            value: "q4",
            trigger: "Do you offer a free trial?",
            content: (
              <p className="text-neutral-600">
                Yes, we offer a 14-day free trial with full access to all
                features. No credit card required to start your trial.
              </p>
            ),
          },
        ]}
      />
    </div>
  ),
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-neutral-700">Default</h3>
        <Accordion variant="default" items={basicItems.slice(0, 2)} />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4 text-neutral-700">
          Bordered
        </h3>
        <Accordion variant="bordered" items={basicItems.slice(0, 2)} />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4 text-neutral-700">
          Separated
        </h3>
        <Accordion variant="separated" items={basicItems.slice(0, 2)} />
      </div>
    </div>
  ),
};
