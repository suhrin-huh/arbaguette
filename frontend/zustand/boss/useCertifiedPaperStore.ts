import { create } from 'zustand';

interface CertifiedPaperStore {
  paperUri: string;
  certifiedPaper: FormData;
  setPaperUri: (uri: string) => void;
  clearPaperUri: () => void;
  setCertifiedPaper: (file: FormData) => void;
  clearCertifiedPaper: () => void;
}

export const useCertifiedPaperStore = create<CertifiedPaperStore>((set) => ({
  paperUri: '',
  certifiedPaper: new FormData(),
  setCertifiedPaper: (file) => set({ certifiedPaper: file }),
  setPaperUri: (uri) => set({ paperUri: uri }),
  clearCertifiedPaper: () => set({ certifiedPaper: new FormData() }),
  clearPaperUri: () => set({ paperUri: '' }),
}));
