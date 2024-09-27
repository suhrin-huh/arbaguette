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
 * 크루 리스트를 가져오는 쿼리 훅
 */
const useCrewMemberList = () => {
  const { data, ...queryData } = useQuery({ queryKey: keys.crewList(), queryFn: () => arbaguette.getCrewMemberList() });

  const crewList = data?.data.data.crews || [];

  return { crewList, ...queryData };
};

/**
 * 당월 누적 급여를 가져오는 쿼리 훅
 */
const useMonthlyAccumulatedSalary = () => {
  const { data } = useQuery({
    queryKey: keys.accumulatedSalary(),
    queryFn: () => arbaguette.getMonthlyAccumulatedSalary(),
  });

  return data?.data.data || 0;
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

/**
 * 가까운 출퇴근 정보를 가져오는 쿼리 훅
 */
const useNearCommuteInfo = () => {
  const { data } = useQuery({
    queryKey: keys.nearCommuteInfo(),
    queryFn: () => arbaguette.getNearCommuteInfo(),
  });

  if (!data) return null;

  return data.data.data;
};

/**
 *  급여명세서를 가져오는 쿼리 훅
 * @param month 조회할 달
 */
const usePayStub = (month: Month) => {
  const { data } = useQuery({
    queryKey: keys.payStub(month),
    queryFn: () => arbaguette.getPayStub(month),
  });

  if (!data) return null;

  return data.data.data;
};
const useDailySchedule = (date: string, companyId?: CompanyId) => {
  const { data } = useQuery({
    queryKey: keys.dailySchedule(date, companyId),
    queryFn: () => arbaguette.getDailySchedule(date, companyId),
  });

  if (!data) return null;

  return data.data.data;
};

export {
  useAccountBalance,
  useCrewMemberList,
  useDailySchedule,
  useEmailCheck,
  useMonthlyAccumulatedSalary,
  useMonthlyEstimatedSalary,
  useNearCommuteInfo,
  usePayStub,
};
