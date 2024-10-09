import type { StateCreator } from 'zustand';

export const spreadBreadSlice: StateCreator<RootState, [], [], SpreadBreadSlice> = (set) => ({
  spreadBread: 0,
  setSpreadBread: (bread: Money) => set((state) => ({ ...state, spreadBread: bread })),
});
