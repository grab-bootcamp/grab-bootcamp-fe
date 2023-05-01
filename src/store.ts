import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IForest } from './interfaces/forest.interface';

interface IState {
  forests: IForest[];
  setForests: (forests: IForest[]) => void;
  activeForestIndex: number | null;
  setActiveForestIndex: (index: number | null) => void;
}

export const useStateStore = create(
  devtools(
    persist<IState>(
      (set) => ({
        forests: [],
        activeForestIndex: null,
        setForests: (newForests) => set(state => ({ ...state, forests: [...newForests] })),
        setActiveForestIndex: (newIndex) => set(state => ({ ...state, activeForestIndex: newIndex })),
      }),
      { name: 'zustand-persist' },
    ),
    { enabled: false },
  ),
);