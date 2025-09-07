import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance';

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/users/signin', {email, password});
  console.log('response.data: ', response.data);
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await axiosInstance.post('/users/signup', {
    name,
    email,
    password,
  });
  console.log('response.data: ', response.data);
  return response.data;
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token removed. User logged out.');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
