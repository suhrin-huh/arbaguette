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
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  /**
   * 이메일 중복 체크
   * @param email 중복 체크할 이메일
   */
  checkEmail: async (email: Email) => {
    return axios.get<EmailCheckResponse>('/api/user', { params: { email } });
  },
  /**
   * 토큰 재발급
   * @param refreshToken 리프레시 토큰
   */
  reIssue: async (refreshToken: RefreshToken) => {
    return axios.post<ReissueResponse>('/api/user/reissue', { refreshToken });
  },
  /**
   * Expo 알림 토큰 저장
   * @param expoPushToken Expo 알림 토큰
   */
  storeExpoToken: async (expoPushToken: string) => {
    return axios.put('/api/user/expotoken', { expoPushToken });
  },
};
