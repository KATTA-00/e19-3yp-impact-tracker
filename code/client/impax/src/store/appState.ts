import { create } from "zustand";

type activePage = "live" | "devices" | "analytics" | "profile" | "test";

interface AppState {
  activePage: activePage;
  setActivePage: (page: activePage) => void;
}

export const useAppState = create<AppState>()((set) => ({
  activePage: "profile",
  setActivePage: (page) => set({ activePage: page }),
}));