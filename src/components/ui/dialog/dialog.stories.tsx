import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { Button } from "../button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      description: "The size of the dialog",
    },
    shadow: {
      control: "select",
      options: ["md", "lg", "xl", "2xl"],
      description: "Shadow elevation for the dialog",
    },
    open: {
      control: "boolean",
      description: "Controls whether the dialog is open",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog component with support for gradient headers, multiple sizes, and smooth animations. Built on Base UI with enhanced styling options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWrapper = ({
  size = "md",
  children,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} size={size}>
        {children || (
          <>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description explaining what this dialog is for.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p>
                This is the dialog body content. You can put any content here.
              </p>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <DialogWrapper />,
};

export const Small: Story = {
  render: () => <DialogWrapper size="sm" />,
};

export const Medium: Story = {
  render: () => <DialogWrapper size="md" />,
};

export const Large: Story = {
  render: () => <DialogWrapper size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <DialogWrapper size="xl" />,
};

export const ExtraLarge2xl: Story = {
  render: () => <DialogWrapper size="2xl" />,
};

export const FullScreen: Story = {
  render: () => <DialogWrapper size="full" />,
};

export const WithForm: Story = {
  render: () => (
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Create Account</DialogTitle>
        <DialogDescription>
          Fill in your details to create a new account.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="••••••••"
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Create Account</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <DialogWrapper size="sm">
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const LongContent: Story = {
  render: () => (
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogDescription>
          Please read and accept our terms and conditions.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <DialogWrapper>
      <DialogClose />
      <DialogHeader>
        <DialogTitle>Notification Settings</DialogTitle>
        <DialogDescription>
          Manage how you receive notifications.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Receive notifications via email
              </p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Receive push notifications on your device
              </p>
            </div>
            <input type="checkbox" />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </DialogFooter>
    </DialogWrapper>
  ),
};

export const GradientHeaderPrimary: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Primary Gradient</Button>
        <Dialog open={open} onOpenChange={setOpen} shadow="xl">
          <DialogClose />
          <DialogHeader gradient="primary">
            <DialogTitle>Premium Feature</DialogTitle>
            <DialogDescription>
              Unlock advanced features with our premium plan
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                Get access to exclusive features including advanced analytics,
                priority support, and custom integrations.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Advanced analytics dashboard</li>
                <li>24/7 priority support</li>
                <li>Custom API integrations</li>
                <li>Unlimited team members</li>
              </ul>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Maybe Later
            </Button>
            <Button onClick={() => setOpen(false)}>Upgrade Now</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const GradientHeaderSuccess: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Success Gradient</Button>
        <Dialog open={open} onOpenChange={setOpen} shadow="xl">
          <DialogClose />
          <DialogHeader gradient="success">
            <DialogTitle>Achievement Unlocked!</DialogTitle>
            <DialogDescription>
              Congratulations on reaching a new milestone
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                You've successfully completed 100 tasks! Keep up the great work.
              </p>
              <div className="bg-success-50 dark:bg-success-950 p-4 rounded-lg">
                <p className="font-semibold text-success-900 dark:text-success-100">
                  Reward: +500 points
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Awesome!</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const GradientHeaderAccent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Accent Gradient</Button>
        <Dialog open={open} onOpenChange={setOpen} shadow="xl">
          <DialogClose />
          <DialogHeader gradient="accent">
            <DialogTitle>Limited Time Offer</DialogTitle>
            <DialogDescription>Special promotion ending soon</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                Get 50% off on all premium plans. This offer expires in 24
                hours!
              </p>
              <div className="bg-accent-50 dark:bg-accent-950 p-4 rounded-lg">
                <p className="font-semibold text-accent-900 dark:text-accent-100">
                  Use code: SAVE50
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Not Now
            </Button>
            <Button onClick={() => setOpen(false)}>Claim Offer</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const GradientHeaderHero: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Hero Gradient</Button>
        <Dialog open={open} onOpenChange={setOpen} size="lg" shadow="2xl">
          <DialogClose />
          <DialogHeader gradient="hero">
            <DialogTitle>Welcome to the Future</DialogTitle>
            <DialogDescription>
              Experience the next generation of productivity
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                Discover powerful features designed to transform the way you
                work.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                  <h4 className="font-semibold mb-2">Smart Automation</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Automate repetitive tasks
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                  <h4 className="font-semibold mb-2">AI Insights</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Get intelligent recommendations
                  </p>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Skip Tour
            </Button>
            <Button onClick={() => setOpen(false)}>Get Started</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const CustomGradientHeader: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Custom Gradient</Button>
        <Dialog open={open} onOpenChange={setOpen} shadow="xl">
          <DialogClose />
          <DialogHeader
            customGradient={{
              from: "rgb(236, 72, 153)",
              via: "rgb(168, 85, 247)",
              to: "rgb(59, 130, 246)",
              angle: 90,
            }}
          >
            <DialogTitle>Custom Gradient Colors</DialogTitle>
            <DialogDescription>
              Using custom gradient colors from the theme system
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                This dialog demonstrates using custom gradient colors. You can
                specify any colors from your theme configuration.
              </p>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <code className="text-sm">
                  {`customGradient={{
  from: 'rgb(236, 72, 153)',
  via: 'rgb(168, 85, 247)',
  to: 'rgb(59, 130, 246)',
  angle: 90
}}`}
                </code>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

// ============================================================================
// Gradient Header Variants - Comprehensive showcase of all gradient options
// ============================================================================

export const AllGradientVariants: Story = {
  name: "All Gradient Variants",
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available gradient header variants. Each gradient is designed for specific use cases and emotional contexts.",
      },
    },
  },
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const gradients = [
      {
        id: "primary",
        label: "Primary Gradient",
        title: "Premium Feature",
        description: "Professional and trustworthy",
        content:
          "The primary gradient uses blue to purple tones, perfect for premium features, upgrades, and professional content.",
      },
      {
        id: "success",
        label: "Success Gradient",
        title: "Achievement Unlocked",
        description: "Positive and encouraging",
        content:
          "The success gradient uses green tones, ideal for achievements, confirmations, and positive feedback.",
      },
      {
        id: "accent",
        label: "Accent Gradient",
        title: "Limited Time Offer",
        description: "Energetic and attention-grabbing",
        content:
          "The accent gradient uses warm tones, perfect for promotions, urgent actions, and special offers.",
      },
      {
        id: "hero",
        label: "Hero Gradient",
        title: "Welcome Experience",
        description: "Bold and impressive",
        content:
          "The hero gradient uses multi-color stops, ideal for welcome screens, onboarding, and hero sections.",
      },
      {
        id: "secondary",
        label: "Secondary Gradient",
        title: "Alternative Style",
        description: "Complementary and versatile",
        content:
          "The secondary gradient provides an alternative color scheme for variety and visual hierarchy.",
      },
    ];

    return (
      <div className="flex flex-wrap gap-3">
        {gradients.map((gradient) => (
          <div key={gradient.id}>
            <Button onClick={() => setOpenDialog(gradient.id)}>
              {gradient.label}
            </Button>
            <Dialog
              open={openDialog === gradient.id}
              onOpenChange={(open) => setOpenDialog(open ? gradient.id : null)}
              shadow="xl"
            >
              <DialogClose />
              <DialogHeader
                gradient={
                  gradient.id as
                    | "primary"
                    | "success"
                    | "accent"
                    | "hero"
                    | "secondary"
                }
              >
                <DialogTitle>{gradient.title}</DialogTitle>
                <DialogDescription>{gradient.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p>{gradient.content}</p>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(null)}>
                  Close
                </Button>
                <Button onClick={() => setOpenDialog(null)}>Confirm</Button>
              </DialogFooter>
            </Dialog>
          </div>
        ))}
      </div>
    );
  },
};

export const GradientWithoutCloseButton: Story = {
  name: "Gradient Without Close Button",
  parameters: {
    docs: {
      description: {
        story:
          "Gradient headers work seamlessly without the close button for forced-choice dialogs.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen} shadow="xl">
          <DialogHeader gradient="primary">
            <DialogTitle>Important Decision</DialogTitle>
            <DialogDescription>
              Please make a selection to continue
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>
              This dialog requires you to make a choice. The close button is
              intentionally omitted to ensure a decision is made.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Proceed</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

// ============================================================================
// Animation Demonstrations - Showcase smooth transitions and animations
// ============================================================================

export const AnimationDemo: Story = {
  name: "Animation Demo",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the smooth fade-in and scale animations when opening and closing dialogs. The backdrop fades in while the dialog scales up from 95% to 100%.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    return (
      <div className="space-y-4">
        <div>
          <Button onClick={() => setOpen(true)}>
            Open Dialog (Opened {count} times)
          </Button>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Watch the smooth fade-in and scale animation
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) setCount((c) => c + 1);
          }}
        >
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Smooth Animations</DialogTitle>
            <DialogDescription>
              Notice the fade and scale effects
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>The dialog uses CSS transitions for smooth animations:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Backdrop fades in with opacity transition</li>
                <li>Dialog scales from 95% to 100%</li>
                <li>Both animations run simultaneously over 300ms</li>
                <li>Ease-in-out timing for natural motion</li>
              </ul>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <p className="text-sm font-mono">
                  transition-all duration-300 ease-in-out
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  },
};

export const AnimationWithGradient: Story = {
  name: "Animation with Gradient Header",
  parameters: {
    docs: {
      description: {
        story:
          "Combines gradient headers with smooth animations for an enhanced visual experience.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open Animated Gradient Dialog
        </Button>
        <Dialog open={open} onOpenChange={setOpen} shadow="2xl">
          <DialogClose />
          <DialogHeader gradient="hero">
            <DialogTitle>Animated Gradient Experience</DialogTitle>
            <DialogDescription>
              Smooth animations with beautiful gradients
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                The gradient header maintains its visual appeal throughout the
                animation sequence.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                  <p className="text-sm font-semibold">Fade In</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Smooth opacity
                  </p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                  <p className="text-sm font-semibold">Scale Up</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    95% to 100%
                  </p>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const RapidOpenClose: Story = {
  name: "Rapid Open/Close Test",
  parameters: {
    docs: {
      description: {
        story:
          "Tests animation performance with rapid opening and closing. Useful for ensuring smooth transitions under stress.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [toggleCount, setToggleCount] = useState(0);

    const handleToggle = () => {
      setOpen((prev) => !prev);
      setToggleCount((c) => c + 1);
    };

    return (
      <div className="space-y-4">
        <div>
          <Button onClick={handleToggle}>
            Toggle Dialog (Count: {toggleCount})
          </Button>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Click rapidly to test animation performance
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogClose />
          <DialogHeader gradient="primary">
            <DialogTitle>Performance Test</DialogTitle>
            <DialogDescription>Testing rapid state changes</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>
              This dialog tests animation performance with rapid state changes.
              The animations should remain smooth even with quick toggling.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  },
};

// ============================================================================
// Size Variants - Comprehensive showcase of all size options
// ============================================================================

export const AllSizeVariants: Story = {
  name: "All Size Variants",
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive showcase of all available dialog sizes from small to full-screen. Each size is optimized for different content types and use cases.",
      },
    },
  },
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const sizes = [
      {
        id: "sm",
        label: "Small (sm)",
        description: "Quick confirmations and alerts",
        maxWidth: "max-w-sm (24rem / 384px)",
        useCase: "Confirmation dialogs, simple alerts, quick actions",
      },
      {
        id: "md",
        label: "Medium (md)",
        description: "Default size for most dialogs",
        maxWidth: "max-w-md (28rem / 448px)",
        useCase: "Forms, settings, general content",
      },
      {
        id: "lg",
        label: "Large (lg)",
        description: "More content and complex forms",
        maxWidth: "max-w-lg (32rem / 512px)",
        useCase: "Multi-step forms, detailed content, lists",
      },
      {
        id: "xl",
        label: "Extra Large (xl)",
        description: "Rich content and media",
        maxWidth: "max-w-xl (36rem / 576px)",
        useCase: "Image galleries, rich text, complex layouts",
      },
      {
        id: "2xl",
        label: "2X Large (2xl)",
        description: "Maximum content width",
        maxWidth: "max-w-2xl (42rem / 672px)",
        useCase: "Data tables, dashboards, extensive content",
      },
      {
        id: "full",
        label: "Full Screen",
        description: "Immersive full-screen experience",
        maxWidth: "calc(100vw - 2rem) × calc(100vh - 2rem)",
        useCase: "Editors, full-page forms, immersive experiences",
      },
    ];

    return (
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <div key={size.id}>
            <Button onClick={() => setOpenDialog(size.id)}>{size.label}</Button>
            <Dialog
              open={openDialog === size.id}
              onOpenChange={(open) => setOpenDialog(open ? size.id : null)}
              size={size.id as "sm" | "md" | "lg" | "xl" | "2xl" | "full"}
            >
              <DialogClose />
              <DialogHeader>
                <DialogTitle>{size.label}</DialogTitle>
                <DialogDescription>{size.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-sm mb-1">Dimensions:</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {size.maxWidth}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Best for:</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {size.useCase}
                    </p>
                  </div>
                  {size.id === "full" && (
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                      <p className="text-sm">
                        Full-screen dialogs provide maximum space for complex
                        interfaces while maintaining a 1rem margin on all sides.
                      </p>
                    </div>
                  )}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button onClick={() => setOpenDialog(null)}>Close</Button>
              </DialogFooter>
            </Dialog>
          </div>
        ))}
      </div>
    );
  },
};

export const SizeComparison: Story = {
  name: "Size Comparison",
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of different dialog sizes to help choose the right size for your use case.",
      },
    },
  },
  render: () => {
    const [openDialogs, setOpenDialogs] = useState<{
      [key: string]: boolean;
    }>({});

    const toggleDialog = (id: string) => {
      setOpenDialogs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Open multiple dialogs to compare sizes
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toggleDialog("sm")}>Small</Button>
          <Button onClick={() => toggleDialog("md")}>Medium</Button>
          <Button onClick={() => toggleDialog("lg")}>Large</Button>
        </div>

        <Dialog
          open={openDialogs.sm}
          onOpenChange={(open) =>
            setOpenDialogs((prev) => ({ ...prev, sm: open }))
          }
          size="sm"
        >
          <DialogClose />
          <DialogHeader gradient="primary">
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>Compact and focused</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm">
              Perfect for quick confirmations and simple messages.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => toggleDialog("sm")}>Close</Button>
          </DialogFooter>
        </Dialog>

        <Dialog
          open={openDialogs.md}
          onOpenChange={(open) =>
            setOpenDialogs((prev) => ({ ...prev, md: open }))
          }
          size="md"
        >
          <DialogClose />
          <DialogHeader gradient="success">
            <DialogTitle>Medium Dialog</DialogTitle>
            <DialogDescription>Balanced and versatile</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm">
              The default size works well for most use cases including forms and
              settings.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => toggleDialog("md")}>Close</Button>
          </DialogFooter>
        </Dialog>

        <Dialog
          open={openDialogs.lg}
          onOpenChange={(open) =>
            setOpenDialogs((prev) => ({ ...prev, lg: open }))
          }
          size="lg"
        >
          <DialogClose />
          <DialogHeader gradient="accent">
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>Spacious and detailed</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm">
              Provides more room for complex content, multiple form fields, or
              detailed information.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => toggleDialog("lg")}>Close</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  },
};

export const ResponsiveSizes: Story = {
  name: "Responsive Behavior",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how dialogs adapt to different screen sizes. All dialogs have a max-width constraint and use calc(100vw - 2rem) to ensure proper spacing on mobile.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div>
          <Button onClick={() => setOpen(true)}>Open Responsive Dialog</Button>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Resize your browser to see responsive behavior
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen} size="xl">
          <DialogClose />
          <DialogHeader gradient="hero">
            <DialogTitle>Responsive Dialog</DialogTitle>
            <DialogDescription>
              Adapts to different screen sizes
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p>
                This dialog demonstrates responsive behavior across different
                screen sizes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <strong>Desktop:</strong> Uses the specified max-width (xl =
                  36rem)
                </li>
                <li>
                  <strong>Tablet:</strong> Maintains max-width with proper
                  margins
                </li>
                <li>
                  <strong>Mobile:</strong> Constrains to calc(100vw - 2rem) for
                  1rem margins
                </li>
                <li>
                  <strong>Height:</strong> Max height of 90vh with scrollable
                  content
                </li>
              </ul>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                <p className="text-xs font-mono">
                  max-w-[calc(100vw-2rem)] max-h-[90vh]
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  },
};

// ============================================================================
// Shadow Variants - Showcase different elevation levels
// ============================================================================

export const ShadowVariants: Story = {
  name: "Shadow Variants",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different shadow elevations for dialogs. Higher shadows create more visual separation from the background.",
      },
    },
  },
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const shadows = [
      {
        id: "md",
        label: "Medium Shadow",
        description: "Subtle elevation",
      },
      {
        id: "lg",
        label: "Large Shadow",
        description: "Moderate elevation",
      },
      {
        id: "xl",
        label: "Extra Large Shadow",
        description: "Strong elevation",
      },
      {
        id: "2xl",
        label: "2X Large Shadow",
        description: "Maximum elevation (default)",
      },
    ];

    return (
      <div className="flex flex-wrap gap-3">
        {shadows.map((shadow) => (
          <div key={shadow.id}>
            <Button onClick={() => setOpenDialog(shadow.id)}>
              {shadow.label}
            </Button>
            <Dialog
              open={openDialog === shadow.id}
              onOpenChange={(open) => setOpenDialog(open ? shadow.id : null)}
              shadow={shadow.id as "md" | "lg" | "xl" | "2xl"}
            >
              <DialogClose />
              <DialogHeader>
                <DialogTitle>{shadow.label}</DialogTitle>
                <DialogDescription>{shadow.description}</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p>
                  This dialog uses the <strong>{shadow.id}</strong> shadow
                  variant. Notice the depth and separation from the backdrop.
                </p>
              </DialogBody>
              <DialogFooter>
                <Button onClick={() => setOpenDialog(null)}>Close</Button>
              </DialogFooter>
            </Dialog>
          </div>
        ))}
      </div>
    );
  },
};
