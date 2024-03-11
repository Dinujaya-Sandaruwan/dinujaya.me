import { create } from "zustand";

interface InfoVideoStore {
  isVideoOpen: boolean;
  setVideoOpen: (isVideoOpen: boolean) => void;
}

const useInfoVideoStore = create<InfoVideoStore>((set) => ({
  isVideoOpen: false, // Initialize with false
  setVideoOpen: (isVideoOpen: boolean) => set({ isVideoOpen }),
}));

export default useInfoVideoStore;
