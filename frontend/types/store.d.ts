interface CertifiedPaperSlice {
  paperUri: string;
  certifiedPaper: FormData;
  setPaperUri: (uri: string) => void;
  clearPaperUri: () => void;
  setCertifiedPaper: (file: FormData) => void;
  clearCertifiedPaper: () => void;
}

interface CompanyInfoSlice {
  companyName: string;
  ceoName: string;
  address: string;
  setCompanyInfo: (val: { companyName: string; ceoName: string; address: string }) => void;
}

interface AuthSlice {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  role: null | 'BOSS' | 'CREW';
  crewStatus: null | CrewStatus;
  login: (authData: LoginResponseData) => void;
  logout: () => void;
}

type RootState = CertifiedPaperSlice & CompanyInfoSlice & AuthSlice;
