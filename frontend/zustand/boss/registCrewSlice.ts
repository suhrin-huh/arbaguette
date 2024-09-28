import type { StateCreator } from 'zustand';

export const createRegistCrewSlice: StateCreator<RootState, [], [], RegistCrewSlice> = (set) => ({
  step1: 'name',
  registName: '',
  registTel: '',
  registCrewId: 0,
  registCompanyId: 0,
  registSalary: 0,
  registSalaryDate: '',
  registTaxType: 'NONE',
  registStartDate: '',
  registEndDate: '',
  registWorkingDayInfoId: 0, // 계약 시 근무 일정 등록 리스트용 id
  registWorkingDayInfoList: [],
  setStep1: (step: Step1) => set({ step1: step }),
  setRegistName: (name: CrewName) => set({ registName: name }),
  setRegistTel: (tel: Tel) => set({ registTel: tel }),
  setRegistCrewId: (crewId: CrewId) => set({ registCrewId: crewId }),
  setRegistCompanyId: (companyId: CompanyId) => set({ registCompanyId: companyId }),
  setRegistSalary: (salary: Money) => set({ registSalary: salary }),
  setRegistSalaryDate: (salaryDate: string) => set({ registSalaryDate: salaryDate }),
  setRegistTaxType: (taxType: TaxType) => set({ registTaxType: taxType }),
  setRegistStartDate: (startDate: DateString) => set({ registStartDate: startDate }),
  setRegistEndDate: (endDate: DateString) => set({ registEndDate: endDate }),
  setRegistWorkingDayInfoList: (workingDayInfoList: WorkingDayInfo[]) =>
    set({ registWorkingDayInfoList: workingDayInfoList }),
  setRegistWorkingDayInfoId: (workingDayInfoId: number) => set({ registWorkingDayInfoId: workingDayInfoId }),
});
