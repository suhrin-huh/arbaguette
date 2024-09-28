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
  crewId: null | CrewId;
  crewStatus: null | CrewStatus;
  login: (authData: LoginResponseData) => void;
  logout: () => void;
}

interface RegistCrewSlice {
  registName: CrewName;
  registTel: Tel;
  registCrewId: CrewId;
  registCompanyId: CompanyId;
  registSalary: Money;
  registSalaryDate: DateString;
  registTaxType: TaxType;
  registStartDate: DateString;
  registEndDate: DateString;
  registWorkingDayInfoList: WorkingDay[];
  setRegistName: (name: CrewName) => void;
  setRegistTel: (tel: Tel) => void;
  setRegistCrewId: (crewId: CrewId) => void;
  setRegistCompanyId: (companyId: CompanyId) => void;
  setRegistSalary: (salary: Money) => void;
  setRegistSalaryDate: (salaryDate: DateString) => void;
  setRegistTaxType: (taxType: TaxType) => void;
  setRegistStartDate: (startDate: DateString) => void;
  setRegistEndDate: (endDate: DateString) => void;
  setRegistWorkingDayInfoList: (workingDayInfoList: WorkingDay[]) => void;
}

type RootState = CertifiedPaperSlice & CompanyInfoSlice & AuthSlice & RegistCrewSlice;
