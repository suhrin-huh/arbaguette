import axios from '@/configs/axios';

export default {
  /**
   * 로그인
   * @param loginForm 로그인 폼 데이터
   */
  login: async (loginForm: LoginForm) => {
    return axios.post<LoginResponse>('/api/login', loginForm);
  },
  /**
   * 회원가입
   * @returns formData
   */
  signup: async (signUpForm: FormData) => {
    return axios.post<FormData>('/api/user', signUpForm, {
      headers: { 'Content-Type': 'multipartform-data' },
    });
  },
  /**
   * 이메일 중복 체크
   * @param email 중복 체크할 이메일
   */
  checkEmail: async (email: Email) => {
    return axios.get<EmailCheckResponse>('/api/user', { params: { email } });
  },
};
