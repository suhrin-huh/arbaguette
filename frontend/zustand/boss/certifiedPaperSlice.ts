import type { StateCreator } from 'zustand';

export const createCertifiedPaperSlice: StateCreator<RootState, [], [], CertifiedPaperSlice> = (set) => ({
  paperUri: '',
  certifiedPaper: new FormData(),
  setCertifiedPaper: (file) => set({ certifiedPaper: file }),
  setPaperUri: (uri) => set({ paperUri: uri }),
  clearCertifiedPaper: () => set({ certifiedPaper: new FormData() }),
  clearPaperUri: () => set({ paperUri: '' }),
});
