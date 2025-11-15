import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">NextJS Starter Kit</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        A modern starter kit with TypeScript, Tailwind CSS, and more
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/login">
          <Button variant="primary">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary">Dashboard</Button>
        </Link>
      </div>
      <div className="mt-4 flex gap-4">
        <Link href="/form-demo">
          <Button variant="outline">Form Demo</Button>
        </Link>
        <Link href="/query-demo">
          <Button variant="outline">Query Demo</Button>
        </Link>
        <Link href="/theme-demo">
          <Button variant="outline">Theme Demo</Button>
        </Link>
        <Link href="/table-demo">
          <Button variant="outline">Table Demo</Button>
        </Link>
        <Link href="/ui-store-demo">
          <Button variant="outline">UI Store Demo</Button>
        </Link>
      </div>
      <div className="mt-8">
        <ThemeToggle />
      </div>
    </main>
  );
}
