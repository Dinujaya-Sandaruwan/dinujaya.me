import { create } from "zustand";

interface AuthStore {
  userName: string;
  setUserName: (userName: string) => void;
  photoURL: string;
  setPhotoURL: (photoURL: string) => void;
  userId: string;
  setUserId: (userid: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  userName: "",
  setUserName: (userName: string) => set({ userName }),
  photoURL: "",
  setPhotoURL: (photoURL: string) => set({ photoURL }),
  userId: "",
  setUserId: (userId: string) => set({ userId }),
}));

export default useAuthStore;
