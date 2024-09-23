const keys = {
  all: ['arbaguette'] as const,
  boss: () => [...keys.all, 'boss'],
  crewList: () => [...keys.boss(), 'list'],
  crew: () => [...keys.all, 'crew'],
  salary: () => [...keys.crew(), 'salary'],
  accumulatedSalary: () => [...keys.salary(), 'accumulatedSalary'],
  estimatedSalary: () => [...keys.salary(), 'estimatedSalary'],
  common: () => [...keys.all, 'common'],
  email: (email: Email) => [...keys.common(), 'email', email],
  bank: () => [...keys.common(), 'bank'],
  balance: () => [...keys.bank(), 'balance'],
};

export default keys;
