import axios from '@/configs/axios';

export default {
  /**
   * 이미지 파일 OCR 인식
   * @param image 인식할 이미지 파일
   */
  imageOcr: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    return axios.post<ImageOcrResponse>('/api/company/ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  /**
   * 사업장 등록
   * @param companyRegisterForm 사업장 등록 폼
   */
  registCompany: async (companyRegisterForm: CompanyRegisterForm) => {
    return axios.post<RegistCompanyResponse>('/api/company', companyRegisterForm);
  },
  /**
   * 사업장 목록 조회
   */
  getCompanyList: async () => {
    return axios.get<GetCompanyListResponse>('/api/company');
  },
  /**
   * 알바생 추가
   * @param crewRegisterForm 알바생 추가 폼
   */
  registCrewMember: async (crewRegisterForm: CrewRegisterForm) => {
    return axios.post<RegistCrewMemberResponse>('/api/boss/crew', crewRegisterForm);
  },
  /**
   * 근로계약서 작성
   * @returns formData
   */
  signContract: async (signContractForm: FormData) => {
    return axios.post<FormData>('/api/contract/boss', signContractForm, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * 알바생 전체 목록 조회
   */
  getCrewMemberList: async (companyId: CompanyId) => {
    return axios.get<GetCrewMemberListResponse>(`/api/boss/crews?companyId=${companyId}`);
  },
  /**
   * 알바생 상세 조회
   * @param crewId 조회할 알바생 아이디
   */
  getCrewMemberDetail: async (crewId: CrewId) => {
    return axios.get<GetCrewMemberDetailResponse>(`/api/boss/crew?crewId=${crewId}`);
  },
  /**
   * 일별 사업장 스케쥴 조회
   * @param date 조회할 날짜
   * @param companyId 조회할 사업장 아이디
   */
  getDaySchedule: async (date: string, companyId: CompanyId) => {
    return axios.get<GetDailyScheduleResponseData>(`/api/schedule/day?companyId=${companyId}&date=${date}`);
  },

  /**
   * 이번달 예상 지출 조회
   */
  getExpectedPayroll: async () => {
    return axios.get<GetExpectedPayrollResponse>('/api/boss/expected');
  },
  /**
   * 대타 승인
   * @param scheduleId 스케줄 아이디
   */
  agreeSubstitute: async (scheduleId: ScheduleId) => {
    return axios.put<AgreeSubstituteResponse>('/api/substitute/agree', { scheduleId });
  },

  /**
   * 이번달 예상 지출 조회
   * @param companyId 사업장 아이디
   */
  getExpectedExpenses: async (companyId: CompanyId) => {
    return axios.get<GetExpectedExpensesResponse>(`/api/boss/expected?companyId=${companyId}`);
  },
  /**
   * 알바생 급여 개별 송금
   * @param crewId 직원 아이디
   * @param money 금액
   */
  sendSalary: async ({ crewId, money }: { crewId: CrewId; money: string }) => {
    console.log('money', money);
    return axios.post<SendSalaryResponse>(`/api/bank/remittance/salary`, { crewId, money });
  },
  /**
   * 급여 명세서 전송
   * @param crewId 알바생 아이디
   * @param month 월
   * @param originSalary 원급여
   * @param tax 세액
   * @param allowance 수당
   * @param totalTime 총 근무 시간
   */
  sendSalaryReceipt: async (sendSalaryData: SendSalaryReceiptResponseData) => {
    return axios.post<SendSalaryReceiptResponse>('/api/boss/receipt', sendSalaryData);
  },
  /**
   * 선착순으로 빵을 뿌리는 메서드
   * @param money 뿌릴 빵의 양
   * @param companyId 사업장 ID
   */
  throwBread: async ({ money, companyId }: { money: Money; companyId: CompanyId }) => {
    return axios.post<ThrowBreadResponse>('/api/bonus', { money, companyId });
  },
};
