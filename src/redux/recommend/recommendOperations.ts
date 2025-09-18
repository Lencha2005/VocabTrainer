import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetWordsParams, GetWordsResponse, WordItem} from '../types';
import axiosInstance from '../lib/axiosInstance';
import {getErrorMessage} from '../utils/getErrorMessage';

export const getAllWords = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  {rejectValue: string}
>('dictionary/getAll', async (params = {}, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<GetWordsResponse>('/words/all', {
      params,
    });
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const createWord = createAsyncThunk<
  WordItem,
  WordItem,
  {rejectValue: string}
>('dictionary/createWord', async (formData: WordItem, thunkApi) => {
  try {
    const {data} = await axiosInstance.post<WordItem>(
      '/words/create',
      formData,
    );
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getCategories = createAsyncThunk<
  string[],
  void,
  {rejectValue: string}
>('dictionary/getCategories', async (_, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<string[]>('/words/categories');
    console.log('data: ', data);
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
