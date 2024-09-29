interface CertifiedPaperSlice {
  paperUri: string;
  certifiedPaper: FormData;
  setPaperUri: (uri: string) => void;
  clearPaperUri: () => void;
  setCertifiedPaper: (file: FormData) => void;
  clearCertifiedPaper: () => void;
}

interface CompanyInfoSlice {
  companyName: CompanyName;
  ceoName: Representative;
  address: CompanyAddress;
  setCompanyInfo: (val: { companyName: CompanyName; ceoName: Representative; address: CompanyAddress }) => void;
}

interface SelectedCompanySlice {
  selectedCompanyId: CompanyId;
  selectedCompanyName: CompanyName;
  selectedCompanyAddress: CompanyAddress;
  setSelectedCompany: (val: {
    selectedCompanyId: CompanyId;
    selectedCompanyName: CompanyName;
    selectedCompanyAddress: CompanyAddress;
  }) => void;
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

type Step1 = 'name' | 'date' | 'time' | 'next';
type Step2 = 'company' | 'salary' | 'date' | 'insu' | 'next';

interface RegistCrewSlice {
  step1: Step1;
  step2: Step2;
  registName: CrewName;
  registTel: Tel;
  registCrewId: CrewId;
  registCompanyId: CompanyId;
  registSalary: Money;
  registSalaryDate: number;
  registTaxType: TaxType;
  registStartDate: DateString;
  registEndDate: DateString;
  registWorkingDayInfoId: number;
  registWorkingDayInfoList: WorkingDayInfo[];
  setStep1: (step: Step1) => void;
  setStep2: (step: Step2) => void;
  setRegistName: (name: CrewName) => void;
  setRegistTel: (tel: Tel) => void;
  setRegistCrewId: (crewId: CrewId) => void;
  setRegistCompanyId: (companyId: CompanyId) => void;
  setRegistSalary: (salary: Money) => void;
  setRegistSalaryDate: (salaryDate: number) => void;
  setRegistTaxType: (taxType: TaxType) => void;
  setRegistStartDate: (startDate: DateString) => void;
  setRegistEndDate: (endDate: DateString) => void;
  setRegistWorkingDayInfoList: (workingDayInfoList: WorkingDayInfo[]) => void;
  setRegistWorkingDayInfoId: (workingDayInfoId: number) => void;
}

type RootState = CertifiedPaperSlice & CompanyInfoSlice & AuthSlice & RegistCrewSlice & SelectedCompanySlice;
