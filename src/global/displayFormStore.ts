import { create } from "zustand";

interface DisplayFormStore {
  displayForm: boolean;
  setDisplayForm: (display: boolean) => void;
}

const useDisplayForm = create<DisplayFormStore>((set) => ({
  displayForm: false,
  setDisplayForm: (display) => set({ displayForm: display }),
}));

export default useDisplayForm;
