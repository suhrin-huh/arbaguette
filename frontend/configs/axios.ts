import axios from 'axios';

import useRootStore from '@/zustand';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASEURL,
  timeout: 2500,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = useRootStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
