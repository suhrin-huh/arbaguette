import { useQuery } from '@tanstack/react-query';

import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';

/**
 * 이메일 중복 체크를 위한 쿼리 훅
 * @param email
 */
const useEmailCheck = (email: Email) => {
  const { data } = useQuery({ queryKey: keys.email(email), queryFn: () => arbaguette.checkEmail(email) });

  const isUnique = !!data?.data.code;

  return { isUnique };
};

/**
 * 사업장 리스트를 가져오는 쿼리 훅
 */
const useCompanyList = () => {
  const { data } = useQuery({ queryKey: keys.companyList(), queryFn: () => arbaguette.getCompanyList() });

  const companyList = data?.data.data.companies || [];

  return { companyList };
};

/**
 * 알바생 리스트를 가져오는 쿼리 훅
 */
const useCrewMemberList = () => {
  const { data } = useQuery({ queryKey: keys.crewList(), queryFn: () => arbaguette.getCrewMemberList() });

  const crewList = data?.data.data.crews || [];

  return { crewList };
};

/**
 * 알바생 상세 정보를 가져오는 쿼리 훅
 */
const useCrewMemeberDetail = (crewId: CrewId) => {
  const { data } = useQuery({
    queryKey: keys.crewDetail(crewId),
    queryFn: () => arbaguette.getCrewMemberDetail(crewId),
  });

  const crewDetail = data?.data.data;
  return { crewDetail };
};

/**
 * 당월 누적 급여를 가져오는 쿼리 훅
 */
const useMonthlyAccumulatedSalary = () => {
  const { data } = useQuery({
    queryKey: keys.accumulatedSalary(),
    queryFn: () => arbaguette.getMonthlyAccumulatedSalary(),
  });

  const accumulatedSalary = data?.data.data || 0;

  return { accumulatedSalary };
};

/**
 * 당월 예상 급여를 가져오는 쿼리 훅
 */
const useMonthlyEstimatedSalary = () => {
  const { data, ...queryData } = useQuery({
    queryKey: keys.estimatedSalary(),
    queryFn: () => arbaguette.getMonthlyEstimatedSalary(),
  });

  const estimatedSalary = data?.data.data || 0;

  return { estimatedSalary, ...queryData };
};

/**
 * 계좌 잔액을 가져오는 쿼리 훅
 */
const useAccountBalance = () => {
  const { data, ...queryData } = useQuery({
    queryKey: keys.balance(),
    queryFn: () => arbaguette.getAccountBalance(),
  });

  const accountBalance = data?.data.data || 0;

  return { accountBalance, ...queryData };
};

const useNearCommuteInfo = () => {
  const { data } = useQuery({
    queryKey: keys.nearCommuteInfo(),
    queryFn: () => arbaguette.getNearCommuteInfo(),
  });

  if (!data) return null;

  return data.data.data;
};

/**
 * 사업장의 일별 스케쥴을 가져오는 훅
 */
const useDaySchedule = (date: string, companyId: CompanyId) => {
  const { data } = useQuery({
    queryKey: keys.daySchedule(date, companyId),
    queryFn: () => arbaguette.getDaySchedule(date, companyId),
  });

  const daySchedule = data?.data.data;

  return { daySchedule };
};

export {
  useAccountBalance,
  useCompanyList,
  useCrewMemberList,
  useCrewMemeberDetail,
  useDaySchedule,
  useEmailCheck,
  useMonthlyAccumulatedSalary,
  useMonthlyEstimatedSalary,
  useNearCommuteInfo,
};
