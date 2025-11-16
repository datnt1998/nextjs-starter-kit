import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  IconLogin,
  IconUserPlus,
  IconLayoutDashboard,
  IconSparkles,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-linear-to-br from-primary-50 via-background to-accent-50 dark:from-primary-950 dark:via-background dark:to-accent-950">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <IconSparkles className="w-4 h-4" />
            <span>Modern NextJS Starter Kit</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
            NextJS Starter Kit
          </h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A modern, production-ready starter kit with TypeScript, Tailwind
            CSS, authentication, and beautiful UI components
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/login">
            <Button variant="gradient" gradient="primary" size="lg">
              <IconLogin className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">
              <IconUserPlus className="w-5 h-5 mr-2" />
              Sign Up
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="gradient" gradient="accent" size="lg">
              <IconLayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <IconLayoutDashboard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Dashboard Ready</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Complete dashboard with sidebar, authentication, and responsive
              layout
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-4">
              <IconSparkles className="w-6 h-6 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Beautiful UI</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Modern components with gradients, shadows, and smooth animations
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-success-100 dark:bg-success-900/30 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-success-600 dark:text-success-400"
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
            </div>
            <h3 className="text-lg font-semibold mb-2">Type Safe</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Full TypeScript support with Zod validation and type inference
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="pt-8">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
