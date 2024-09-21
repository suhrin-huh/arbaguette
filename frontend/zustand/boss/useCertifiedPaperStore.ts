import { create } from 'zustand'

interface CertifiedPaperStore {
  certifiedPaper: string;
  setCertifiedPaper: (image: string) => void;
  clearCertifiedPaper: () => void;
}
export const useCertifiedPaperStore = create<CertifiedPaperStore>((set) => ({
  certifiedPaper: '',
  setCertifiedPaper: (image) => set({ certifiedPaper: image }),
  clearCertifiedPaper: () => set({ certifiedPaper: '' })
}))
