const keys = {
  all: ['arbaguette'] as const,
  boss: () => [...keys.all, 'boss'],
  company: () => [...keys.boss(), 'company'],
  daySchedule: (date: string, companyId: CompanyId) => [...keys.company(), 'schedule', date, companyId],
  companyList: () => [...keys.company(), 'list'],
  crewList: () => [...keys.boss(), 'crews'],
  crew: () => [...keys.all, 'crew'],
  crewDetail: (crewId: CrewId) => [...keys.crew(), 'detail', crewId],
  nearCommuteInfo: () => [...keys.crew(), 'nearCommuteInfo'],
  workHistory: (date: string) => [...keys.crew(), 'workHistory', date],
  salary: () => [...keys.crew(), 'salary'],
  payStub: (month: Month) => [...keys.salary(), 'payStub', month],
  accumulatedSalary: () => [...keys.salary(), 'accumulatedSalary'],
  estimatedSalary: () => [...keys.salary(), 'estimatedSalary'],
  common: () => [...keys.all, 'common'],
  email: (email: Email) => [...keys.common(), 'email', email],
  bank: () => [...keys.common(), 'bank'],
  balance: () => [...keys.bank(), 'balance'],
  dailySchedule: (date: string, companyId?: CompanyId) => [...keys.common(), 'dailySchedule', date, companyId],
  monthlySchedule: (month: Month, companyId?: CompanyId) => [...keys.common(), 'monthlySchedule', month, companyId],
};

export default keys;
