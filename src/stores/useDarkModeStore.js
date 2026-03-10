import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDarkModeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,

      toggle: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "darkmode-storage", // localStorage key
    }
  )
);

export default useDarkModeStore;
