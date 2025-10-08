import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../lib/axiosInstance';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getErrorMessage} from '../utils/getErrorMessage';
import {AuthResponse} from '../types';

export const registerUser = createAsyncThunk<
  AuthResponse,
  {
    name: string;
    email: string;
    password: string;
  },
  {rejectValue: string}
>('auth/register', async ({name, email, password}, thunkAPI) => {
  try {
    const {data} = await axiosInstance.post('/users/signup', {
      name,
      email,
      password,
    });
    await AsyncStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  {email: string; password: string},
  {rejectValue: string}
>('auth/login', async ({email, password}, thunkAPI) => {
  try {
    const {data} = await axiosInstance.post('/users/signin', {email, password});
    await AsyncStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const currentUser = createAsyncThunk<
  AuthResponse,
  void,
  {rejectValue: string}
>('auth/current', async (_, thunkAPI) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue(getErrorMessage('Токен відсутній'));
    }

    const {data} = await axiosInstance.get('/users/current', {
      headers: {Authorization: `Bearer ${token}`},
    });

    if (!data) {
      return thunkAPI.rejectWithValue(
        getErrorMessage('Не вдалося отримати користувача'),
      );
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const logoutUser = createAsyncThunk<void, void, {rejectValue: string}>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);
