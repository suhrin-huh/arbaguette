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
   * @param signUpForm 회원가입 폼 데이터
   */
  signup: async (signUpForm: SignUpForm) => {
    return axios.post<SignUpResponse>('/api/user', signUpForm);
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
};
