import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vocab-builder-backend.p.goit.global/api',
  timeout: 10000,
});

// Якщо потрібен токен:
axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log('Axios Interceptor Error:', error);
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
