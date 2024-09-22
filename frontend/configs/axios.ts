import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASEURL,
  timeout: 2500,
  withCredentials: true,
});

export default instance;
