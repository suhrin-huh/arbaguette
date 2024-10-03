import type { StateCreator } from 'zustand';

export const createSelectedCompanySlice: StateCreator<RootState, [], [], SelectedCompanySlice> = (set) => ({
  selectedCompanyId: 0,
  selectedCompanyName: '',
  selectedCompanyAddress: '',
  setSelectedCompany: (val) =>
    set((state) => ({
      selectedCompanyId: val.selectedCompanyId,
      selectedCompanyName: val.selectedCompanyName,
      selectedCompanyAddress: val.selectedCompanyAddress,
    })),
});
