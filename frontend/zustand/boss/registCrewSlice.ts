import type { StateCreator } from 'zustand';

export const createRegistCrewSlice: StateCreator<RootState, [], [], RegistCrewSlice> = (set) => ({
  registName: '',
  registTel: '',
  registCrewId: 0,
  registCompanyId: 0,
  registSalary: 0,
  registSalaryDate: '',
  registTaxType: 'NONE',
  registStartDate: '',
  registEndDate: '',
  registWorkingDayInfoList: [],
  setRegistName: (name: CrewName) => set({ registName: name }),
  setRegistTel: (tel: Tel) => set({ registTel: tel }),
  setRegistCrewId: (crewId: CrewId) => set({ registCrewId: crewId }),
  setRegistCompanyId: (companyId: CompanyId) => set({ registCompanyId: companyId }),
  setRegistSalary: (salary: Money) => set({ registSalary: salary }),
  setRegistSalaryDate: (salaryDate: string) => set({ registSalaryDate: salaryDate }),
  setRegistTaxType: (taxType: TaxType) => set({ registTaxType: taxType }),
  setRegistStartDate: (startDate: DateString) => set({ registStartDate: startDate }),
  setRegistEndDate: (endDate: DateString) => set({ registEndDate: endDate }),
  setRegistWorkingDayInfoList: (workingDayInfoList: WorkingDay[]) =>
    set({ registWorkingDayInfoList: workingDayInfoList }),
});
