import type { StateCreator } from 'zustand';

export const createCompanyInfoSlice: StateCreator<RootState, [], [], CompanyInfoSlice> = (set) => ({
  companyName: '',
  ceoName: '',
  address: '',
  setCompanyInfo: (val) =>
    set((state) => ({ companyName: val.companyName, ceoName: val.ceoName, address: val.address })),
});
