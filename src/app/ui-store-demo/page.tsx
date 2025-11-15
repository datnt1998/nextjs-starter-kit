"use client";

import { useUIStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

/**
 * Demo page showcasing UI store functionality
 * Demonstrates sidebar state, modal stack, and preferences management
 */
export default function UIStoreDemoPage() {
  // Sidebar state
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const toggleSidebarCollapsed = useUIStore(
    (state) => state.toggleSidebarCollapsed
  );

  // Modal state
  const modalStack = useUIStore((state) => state.modalStack);
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const closeAllModals = useUIStore((state) => state.closeAllModals);
  const isModalOpen = useUIStore((state) => state.isModalOpen);

  // Preferences
  const preferences = useUIStore((state) => state.preferences);
  const setPreference = useUIStore((state) => state.setPreference);
  const resetPreferences = useUIStore((state) => state.resetPreferences);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            UI Store Demo
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Demonstrating Zustand UI store with sidebar, modals, and preferences
          </p>
        </div>

        {/* Sidebar Demo */}
        <section className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
            Sidebar State
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Sidebar Open (not persisted)
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Current state: {sidebarOpen ? "Open" : "Closed"}
                </p>
              </div>
              <Button onClick={toggleSidebar} variant="outline">
                Toggle Sidebar
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Sidebar Collapsed (persisted)
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Current state: {sidebarCollapsed ? "Collapsed" : "Expanded"}
                </p>
              </div>
              <Button onClick={toggleSidebarCollapsed} variant="outline">
                Toggle Collapsed
              </Button>
            </div>

            <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-700 rounded">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                💡 Tip: The collapsed state is persisted to localStorage. Try
                toggling it and refreshing the page!
              </p>
            </div>
          </div>
        </section>

        {/* Modal Stack Demo */}
        <section className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
            Modal Stack
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Current modal stack:{" "}
                {modalStack.length > 0 ? modalStack.join(" → ") : "Empty"}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => openModal("modal-1")} variant="primary">
                  Open Modal 1
                </Button>
                <Button
                  onClick={() => openModal("modal-2")}
                  variant="secondary"
                >
                  Open Modal 2
                </Button>
                <Button onClick={() => openModal("modal-3")} variant="outline">
                  Open Modal 3
                </Button>
                <Button
                  onClick={closeModal}
                  variant="ghost"
                  disabled={modalStack.length === 0}
                >
                  Close Last Modal
                </Button>
                <Button
                  onClick={closeAllModals}
                  variant="danger"
                  disabled={modalStack.length === 0}
                >
                  Close All Modals
                </Button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-700 rounded">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                💡 Tip: Open multiple modals to see the stack in action. The
                modal stack is not persisted.
              </p>
            </div>
          </div>
        </section>

        {/* Preferences Demo */}
        <section className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
            UI Preferences (Persisted)
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.compactMode}
                  onChange={(e) =>
                    setPreference("compactMode", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Compact Mode
                </span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex-1">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-2">
                  Table Page Size
                </span>
                <select
                  value={preferences.tablePageSize}
                  onChange={(e) =>
                    setPreference("tablePageSize", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50"
                >
                  <option value={5}>5 rows</option>
                  <option value={10}>10 rows</option>
                  <option value={20}>20 rows</option>
                  <option value={50}>50 rows</option>
                  <option value={100}>100 rows</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Current preferences:
                </p>
                <pre className="mt-2 p-3 bg-neutral-100 dark:bg-neutral-700 rounded text-xs overflow-auto">
                  {JSON.stringify(preferences, null, 2)}
                </pre>
              </div>
            </div>

            <Button onClick={resetPreferences} variant="outline">
              Reset to Defaults
            </Button>

            <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-700 rounded">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                💡 Tip: All preferences are persisted to localStorage. Try
                changing them and refreshing the page!
              </p>
            </div>
          </div>
        </section>

        {/* Example Dialogs */}
        {isModalOpen("modal-1") && (
          <Dialog
            open={true}
            onOpenChange={(open) => !open && closeModal()}
            size="md"
          >
            <DialogHeader>
              <DialogTitle>Dialog 1</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                  This is Dialog 1. You can open more dialogs on top of this
                  one.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openModal("modal-2")}
                    variant="primary"
                  >
                    Open Dialog 2
                  </Button>
                  <Button onClick={closeModal} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            </DialogBody>
            <DialogClose />
          </Dialog>
        )}

        {isModalOpen("modal-2") && (
          <Dialog
            open={true}
            onOpenChange={(open) => !open && closeModal()}
            size="md"
          >
            <DialogHeader>
              <DialogTitle>Dialog 2</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                  This is Dialog 2. Notice how it appears on top of Dialog 1.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openModal("modal-3")}
                    variant="primary"
                  >
                    Open Dialog 3
                  </Button>
                  <Button onClick={closeModal} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            </DialogBody>
            <DialogClose />
          </Dialog>
        )}

        {isModalOpen("modal-3") && (
          <Dialog
            open={true}
            onOpenChange={(open) => !open && closeModal()}
            size="md"
          >
            <DialogHeader>
              <DialogTitle>Dialog 3</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                  This is Dialog 3. This is the topmost dialog in the stack.
                </p>
                <div className="flex gap-2">
                  <Button onClick={closeModal} variant="primary">
                    Close
                  </Button>
                  <Button onClick={closeAllModals} variant="danger">
                    Close All
                  </Button>
                </div>
              </div>
            </DialogBody>
            <DialogClose />
          </Dialog>
        )}
      </div>
    </div>
  );
}
