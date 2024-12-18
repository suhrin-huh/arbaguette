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
  async (response) => {
    console.log('성공');
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && error.response.data.code === 418) {
      try {
        const { refreshToken } = useRootStore.getState();
        const { data } = await instance.post<ReissueResponse>('/api/user/reissue', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = data.data;
        useRootStore.getState().updateTokens(accessToken, newRefreshToken);
        return instance.request(error.config);
      } catch {
        console.log('reIssue failed');
      }
    }
    // console.log('error', error.config.url);
    console.log('error', error.response.data);

    return Promise.reject(error);
  },
);

export default instance;
