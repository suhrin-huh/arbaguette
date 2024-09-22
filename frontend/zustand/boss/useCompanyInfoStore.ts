import { create } from 'zustand'

interface CompanyInfoStore {
  companyName: string;
  ceoName: string;
  address: string;
  setCompanyInfo: (val: { companyName: string; ceoName: string; address: string }) => void;
}
export const useCompanyInfoStore = create<CompanyInfoStore>((set) => ({
  companyName: '',
  ceoName: '',
  address: '',
  setCompanyInfo: (val) => set((state) => ({ companyName: val.companyName, ceoName: val.ceoName, address: val.address }))
}))
