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
