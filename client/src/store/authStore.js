import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      theme: "light",

      setAuth: ({ user, accessToken }) => set({ user, accessToken }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark"
        }))
    }),
    {
      name: "subscription-dashboard-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        theme: state.theme
      })
    }
  )
);
