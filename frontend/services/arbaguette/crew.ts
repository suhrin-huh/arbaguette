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
  /**
   * 대타 요청
   * @param scheduleId 스케줄 아이디
   */
  requestSubstitute: async (scheduleId: ScheduleId) => {
    return axios.post<PostRequestSubstituteResponse>('/api/substitute', { scheduleId });
  },
  /**
   * 알바생 대타 수락
   * @param scheduleId 스케줄 아이디
   */
  takeSubstitute: async (scheduleId: ScheduleId) => {
    return axios.put<TakeSubstituteResponse>('/api/substitute/apply', { scheduleId });
  },
  /**
   * 월별 스케줄 조회
   * @param date 조회할 날짜
   */
  getWorkHistory: async (date: string) => {
    return axios.get<GetWorkHistoryResponse>('/api/schedule/crew/commutes', { params: { targetDate: date } });
  },
  /**
   * 알바생 근로계약서 서명
   * @param signature 서명 이미지
   */
  signCrewSignature: async (signature: string) => {
    const base64Data = signature.split(',')[1];
    const formData = new FormData();

    formData.append('image', {
      uri: `data:image/png;base64,${base64Data}`,
      name: 'signature.png',
      type: 'image/png',
    } as any);

    return await axios.post('/api/contract/crew', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  /**
   * 스케줄 생성
   */
  makeSchedule: async () => {
    return axios.post('/api/schedule/crew');
  },
  /**
   * 빵 받기
   * @param bonusId 보너스 아이디
   */
  getBread: async (bonusId: number) => {
    return axios.post('/api/bonus/crew', { bonusId });
  },
};
