const keys = {
  all: ['arbaguette'] as const,
  boss: () => [...keys.all, 'boss'],
  crewList: () => [...keys.boss(), 'list'],
  crew: () => [...keys.all, 'crew'],
  nearCommuteInfo: () => [...keys.crew(), 'nearCommuteInfo'],
  salary: () => [...keys.crew(), 'salary'],
  payStub: (month: Month) => [...keys.salary(), 'payStub', month],
  accumulatedSalary: () => [...keys.salary(), 'accumulatedSalary'],
  estimatedSalary: () => [...keys.salary(), 'estimatedSalary'],
  common: () => [...keys.all, 'common'],
  email: (email: Email) => [...keys.common(), 'email', email],
  bank: () => [...keys.common(), 'bank'],
  balance: () => [...keys.bank(), 'balance'],
  dailySchedule: (date: string, companyId?: CompanyId) => [...keys.common(), 'dailySchedule', date, companyId],
};

export default keys;
