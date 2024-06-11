import {create} from 'zustand';

interface GlobalState {
  shouldUpdate: boolean;
  setShouldUpdate: (value: boolean) => void;
}

export const useStore = create<GlobalState>((set) => ({
  shouldUpdate: false,
  setShouldUpdate: (value) => set({ shouldUpdate: value }),
}));
