import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SettingsState = {
  apiKey: string;
  setApiKey: (key: string) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),
    }),
    {
      name: 'tars-settings-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);