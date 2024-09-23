import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASEURL,
  timeout: 2500,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('토큰 확인하기', token);
    if (token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && error.response.data.message === '로그인이 필요합니다.') {
      console.log('401 error');
      console.log(error.response.data);
      // 401 뜬다 => accesstoken이 만료? => 갱신 후 다시 재요청
      // 그게 아니라면? (로그인 페이지로 이동이 필요?)

      // 그 외에는 그냥 error 반환
    }
    return Promise.reject(error);
    // console.log('response inter:', error.response.status);
  },
);

export default instance;
