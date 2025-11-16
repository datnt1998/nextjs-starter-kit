"use client";

/**
 * Component Showcase Page
 * Demonstrates all enhanced UI components with gradients, shadows, and modern styling
 */

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AchievementCard } from "@/components/ui/achievement-card";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function ShowcasePage() {
  const [achievementStatus, setAchievementStatus] = useState<
    "locked" | "in-progress" | "unlocked"
  >("locked");
  const [primaryDialogOpen, setPrimaryDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [accentDialogOpen, setAccentDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <Container size="2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Component Showcase
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore all enhanced UI components with modern gradients, shadows,
            and interactive effects
          </p>
        </div>

        {/* Stats Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stats Cards
          </h2>
          <p className="text-muted-foreground mb-6">
            Enhanced stats cards with gradient backgrounds and colored shadows
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Users"
              value="12,543"
              change={{ value: 12, trend: "up" }}
              gradient="primary"
              featured={true}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            />
            <StatsCard
              title="Active Now"
              value="2,847"
              change={{ value: 8, trend: "up" }}
              gradient="success"
              featured={true}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <StatsCard
              title="Revenue"
              value="$48,392"
              change={{ value: 15, trend: "up" }}
              gradient="accent"
              featured={true}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <StatsCard
              title="Conversion"
              value="3.2%"
              change={{ value: 2, trend: "down" }}
              featured={true}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
            />
          </div>
        </section>

        <Separator className="my-12" />

        {/* Alert Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Alert Components
          </h2>
          <p className="text-muted-foreground mb-6">
            Alerts with gradient backgrounds, badges, and dismissible
            functionality
          </p>

          <div className="space-y-4">
            {/* Gradient Alert - Primary */}
            <Alert
              variant="gradient"
              gradient="primary"
              title="Public Search Mode"
              badge="0 left"
              dismissible
            >
              You&apos;re seeing estimated ride fares. Connect your accounts for
              personalized pricing from your apps!
            </Alert>

            {/* Gradient Alert - Success */}
            <Alert
              variant="gradient"
              gradient="success"
              title="Deployment Successful"
              badge="Live"
              dismissible
            >
              Your application has been deployed to production successfully. All
              systems are operational.
            </Alert>

            {/* Gradient Alert - Accent */}
            <Alert
              variant="gradient"
              gradient="accent"
              title="Limited Time Offer"
              badge="Hot"
              dismissible
            >
              🔥 Get 50% off on annual plans. Offer expires in 24 hours!
            </Alert>

            {/* Standard Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert variant="info" title="Information" dismissible>
                This is an informational message to keep you updated.
              </Alert>

              <Alert variant="success" title="Success" dismissible>
                Your changes have been saved successfully.
              </Alert>

              <Alert variant="warning" title="Warning" badge="Important">
                Please review this information before proceeding.
              </Alert>

              <Alert variant="error" title="Error" dismissible>
                An error occurred while processing your request.
              </Alert>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Card Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Card Variants
          </h2>
          <p className="text-muted-foreground mb-6">
            Cards with different styles, shadows, and interactive effects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" shadow="md">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Standard card with medium shadow and default styling
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" shadow="xl">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Card with extra large shadow for prominent elevation
                </p>
              </CardContent>
            </Card>

            <Card variant="gradient" gradient="primary">
              <CardHeader>
                <CardTitle className="text-white">Gradient Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">
                  Card with primary gradient background and colored shadow
                </p>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Card with backdrop blur and semi-transparent background
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hover over this card to see elevation and shadow changes
                </p>
              </CardContent>
            </Card>

            <Card
              variant="gradient"
              gradient="success"
              shadow="lg"
              shadowColor="success"
            >
              <CardHeader>
                <CardTitle className="text-white">Success Gradient</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">
                  Card with success gradient and matching colored shadow
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Badge Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Badge Variants
          </h2>
          <p className="text-muted-foreground mb-6">
            Badges in various colors, sizes, and styles
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Color Variants
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Gradient Badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="gradient" gradient="primary">
                      Featured
                    </Badge>
                    <Badge variant="gradient" gradient="success">
                      Best Value
                    </Badge>
                    <Badge variant="gradient" gradient="accent">
                      Hot Deal
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Size Variants
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge size="xs">Extra Small</Badge>
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    With Icons
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="success"
                      icon={
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      }
                    >
                      Verified
                    </Badge>
                    <Badge
                      variant="gradient"
                      gradient="primary"
                      icon={
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      }
                    >
                      Premium
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Button Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Button Variants
          </h2>
          <p className="text-muted-foreground mb-6">
            Buttons with gradient backgrounds and hover effects
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Standard Variants
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Gradient Buttons
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="gradient" gradient="primary">
                      Primary Gradient
                    </Button>
                    <Button variant="gradient" gradient="success">
                      Success Gradient
                    </Button>
                    <Button variant="gradient" gradient="accent">
                      Accent Gradient
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Size Variants
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Achievement Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Achievement Cards
          </h2>
          <p className="text-muted-foreground mb-6">
            Interactive achievement cards with different states and animations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AchievementCard
              title="First Steps"
              description="Complete your first task"
              status="unlocked"
              gradient="success"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              }
            />
            <AchievementCard
              title="Team Player"
              description="Collaborate with 10 team members"
              status="in-progress"
              progress={65}
              gradient="primary"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            <AchievementCard
              title="Master"
              description="Reach level 50"
              status="locked"
              gradient="accent"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              }
            />
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Interactive Demo
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Click the buttons below to see achievement state transitions
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button
                    size="sm"
                    onClick={() => setAchievementStatus("locked")}
                  >
                    Set Locked
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setAchievementStatus("in-progress")}
                  >
                    Set In Progress
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setAchievementStatus("unlocked")}
                  >
                    Set Unlocked
                  </Button>
                </div>
                <AchievementCard
                  title="Interactive Achievement"
                  description="Watch the state change"
                  status={achievementStatus}
                  progress={
                    achievementStatus === "in-progress" ? 45 : undefined
                  }
                  gradient="primary"
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Dialog Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Dialog with Gradient Header
          </h2>
          <p className="text-muted-foreground mb-6">
            Modal dialogs with gradient headers and smooth animations
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="gradient"
                  gradient="primary"
                  onClick={() => setPrimaryDialogOpen(true)}
                >
                  Open Primary Dialog
                </Button>
                <Button
                  variant="gradient"
                  gradient="success"
                  onClick={() => setSuccessDialogOpen(true)}
                >
                  Open Success Dialog
                </Button>
                <Button
                  variant="gradient"
                  gradient="accent"
                  onClick={() => setAccentDialogOpen(true)}
                >
                  Open Accent Dialog
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dialog Components */}
        <Dialog
          open={primaryDialogOpen}
          onOpenChange={setPrimaryDialogOpen}
          shadow="xl"
        >
          <DialogClose />
          <DialogHeader gradient="primary">
            <DialogTitle>Primary Gradient Header</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-muted-foreground">
              This dialog features a beautiful primary gradient header with
              smooth animations. The gradient creates visual hierarchy and draws
              attention to important actions.
            </p>
          </DialogBody>
        </Dialog>

        <Dialog
          open={successDialogOpen}
          onOpenChange={setSuccessDialogOpen}
          shadow="xl"
        >
          <DialogClose />
          <DialogHeader gradient="success">
            <DialogTitle>Success Gradient Header</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-muted-foreground">
              Success dialogs are perfect for confirmation messages and positive
              feedback. The green gradient conveys accomplishment and progress.
            </p>
          </DialogBody>
        </Dialog>

        <Dialog
          open={accentDialogOpen}
          onOpenChange={setAccentDialogOpen}
          shadow="xl"
        >
          <DialogClose />
          <DialogHeader gradient="accent">
            <DialogTitle>Accent Gradient Header</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-muted-foreground">
              Accent dialogs stand out with vibrant colors, perfect for special
              offers, promotions, or important announcements that need extra
              attention.
            </p>
          </DialogBody>
        </Dialog>

        <Separator className="my-12" />

        {/* Container Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Container Variants
          </h2>
          <p className="text-muted-foreground mb-6">
            Containers with different backgrounds and border radius options
          </p>

          <div className="space-y-6">
            <Container background="muted" rounded="lg" className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Muted Background
              </h3>
              <p className="text-muted-foreground">
                Container with muted background color and large border radius
              </p>
            </Container>

            <Container
              background="gradient"
              gradient="primary"
              rounded="xl"
              className="p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Gradient Background
              </h3>
              <p className="text-white/90">
                Container with primary gradient background and extra large
                border radius
              </p>
            </Container>

            <Container background="glass" rounded="2xl" className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Glass Effect
              </h3>
              <p className="text-muted-foreground">
                Container with glass morphism effect using backdrop blur
              </p>
            </Container>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 mb-8 text-center">
          <p className="text-muted-foreground">
            All components are fully responsive and support both light and dark
            themes
          </p>
        </div>
      </Container>
    </DashboardLayout>
  );
}
