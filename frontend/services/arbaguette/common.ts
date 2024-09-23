import axios from '@/configs/axios';

export default {
  /**
   * 계좌 잔액 조회
   */
  getAccountBalance: async () => {
    return axios.get('/api/bank/account');
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
};
