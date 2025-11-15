/**
 * Zustand store for UI state management
 * Manages sidebar, modal stack, and UI preferences
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UIPreferences {
  sidebarCollapsed: boolean;
  tablePageSize: number;
  compactMode: boolean;
}

interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;

  // Modal stack
  modalStack: string[];

  // UI preferences
  preferences: UIPreferences;

  // Sidebar actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Modal actions
  openModal: (modalId: string) => void;
  closeModal: () => void;
  closeAllModals: () => void;
  isModalOpen: (modalId: string) => boolean;

  // Preferences actions
  setPreference: <K extends keyof UIPreferences>(
    key: K,
    value: UIPreferences[K]
  ) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UIPreferences = {
  sidebarCollapsed: false,
  tablePageSize: 10,
  compactMode: false,
};

/**
 * UI store using Zustand with persistence
 * Manages UI state like sidebar, modals, and user preferences
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      sidebarCollapsed: false,
      modalStack: [],
      preferences: defaultPreferences,

      // Sidebar actions
      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      setSidebarOpen: (open) =>
        set({
          sidebarOpen: open,
        }),

      toggleSidebarCollapsed: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
          preferences: {
            ...state.preferences,
            sidebarCollapsed: !state.sidebarCollapsed,
          },
        })),

      setSidebarCollapsed: (collapsed) =>
        set({
          sidebarCollapsed: collapsed,
          preferences: {
            ...get().preferences,
            sidebarCollapsed: collapsed,
          },
        }),

      // Modal actions
      openModal: (modalId) =>
        set((state) => ({
          modalStack: [...state.modalStack, modalId],
        })),

      closeModal: () =>
        set((state) => ({
          modalStack: state.modalStack.slice(0, -1),
        })),

      closeAllModals: () =>
        set({
          modalStack: [],
        }),

      isModalOpen: (modalId) => {
        const state = get();
        return state.modalStack.includes(modalId);
      },

      // Preferences actions
      setPreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        })),

      resetPreferences: () =>
        set({
          preferences: defaultPreferences,
        }),
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist preferences and sidebarCollapsed
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
      }),
    }
  )
);
