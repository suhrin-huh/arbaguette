import axios from '@/configs/axios';

export default {
  /**
   * 계좌 잔액 조회
   */
  getAccountBalance: async () => {
    return axios.get('/api/bank/account');
  },
  /**
   * 계좌 비밀번호 일치 여부 확인하기
   */
  checkAccountPassword: async (password: Password) => {
    return axios.get(`/api/user/checkPassword?accountPassword=${password}`);
  },
  /**
   * 송금하기
   * @param remittanceForm 송금 폼
   */
  remittance: async (remittanceForm: RemittanceForm) => {
    return axios.post('/api/bank/remittance', remittanceForm);
  },
  /**
   * 입출금내역조회
   */
  getBankHistory: async () => {
    return axios.get('/api/bank/history');
  },
  /**
   * 월별 스케줄 조회
   * @param month 조회할 월
   * @param companyId 회사 ID
   */
  getMonthlySchedule: async (month: Month, companyId?: CompanyId) => {
    return axios.get<GetMonthlyScheduleResponse>('/api/schedule', { params: { month, companyId } });
  },
  /**
   * 근로계약서 조회
   * @param crewId 조회할 알바생 ID
   */
  getEmploymentContract: async (crewId: CrewId) => {
    return axios.get<GetEmploymentContractResponse>('/api/contract', { params: { crewId } });
  },
};
