import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IState {
  reset: () => void;
}

export const useStateStore = create(
  devtools(
    persist<IState>(
      (set) => ({
        reset: () => set({}, true),
      }),
      { name: 'zustand-persist' },
    ),
    { enabled: false },
  ),
);