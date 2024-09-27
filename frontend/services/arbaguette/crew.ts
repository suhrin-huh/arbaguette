import axios from '@/configs/axios';

export default {
  /**
   * 이번달 누적급여 조회
   */
  getMonthlyAccumulatedSalary: async () => {
    return axios.get<GetMonthlyAccumulatedSalaryResponse>('/api/crew/nusum');
  },
  /**
   * 이번달 예상급여 조회
   */
  getMonthlyEstimatedSalary: async () => {
    return axios.get<GetMonthlyEstimatedSalaryResponse>('/api/crew/expected');
  },
  /**
   * 출퇴근 체크
   * @param companyId 회사 아이디
   */
  commuteCheck: async (companyId: CompanyId) => {
    return axios.post<CommuteCheckResponse>('/api/schedule/crew/commute', { companyId });
  },
  /**
   * 가까운 출근 정보 확인
   */
  getNearCommuteInfo: async () => {
    return axios.get<GetNearCommuteInfoResponse>('/api/schedule/crew/near/commute');
  },
  /**
   * 급여명세서 조회
   * @param month 조회할 달
   */
  getPayStub: async (month: Month) => {
    return axios.get<GetPayStubResponse>('/api/crew/receipt', { params: { month } });
  },
  /**
   * 일별 스케줄 조회
   * @param date 조회할 날짜
   * @param companyId 회사 아이디
   */
  getDailySchedule: async (date: string, companyId?: CompanyId) => {
    return axios.get<GetDailyScheduleResponse>('/api/schedule/day', { params: { date, companyId } });
  },
};
