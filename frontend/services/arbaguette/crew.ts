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
};
