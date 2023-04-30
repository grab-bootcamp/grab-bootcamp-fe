import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IForest } from './interfaces/forest.interface';

interface IState {
  forests: IForest[];
  setForest: (forests: IForest[]) => void;
}

export const useStateStore = create(
  devtools(
    persist<IState>(
      (set) => ({
        forests: [],
        setForest: (newForests) => set(state => ({ ...state, forests: [...newForests] })),
      }),
      { name: 'zustand-persist' },
    ),
    { enabled: false },
  ),
);