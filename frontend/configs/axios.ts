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
    if (token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('토큰 없음');
      config.headers['Authorization'] = `Bearer ${process.env.EXPO_PUBLIC_TEMP_ACCESSTOKEN}`;
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
    // if (error.response.status === 401 && error.response.data.message === '로그인이 필요합니다.') {
    // }
    console.log('error', error);
    return Promise.reject(error);
  },
);

export default instance;
