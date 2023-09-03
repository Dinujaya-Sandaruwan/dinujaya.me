import { create } from "zustand";

interface AuthStore {
  userName: string;
  setUserName: (userName: string) => void;
  photoURL: string;
  setPhotoURL: (photoURL: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  userName: "",
  setUserName: (userName: string) => set({ userName }),
  photoURL: "",
  setPhotoURL: (photoURL: string) => set({ photoURL }),
}));

export default useAuthStore;
