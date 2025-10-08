import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetWordsParams, GetWordsResponse, WordItem} from '../types';
import axiosInstance from '../lib/axiosInstance';
import {getErrorMessage} from '../utils/getErrorMessage';

export const getAllWords = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams,
  {rejectValue: string; state: any}
>('recommend/getAll', async (params, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const filters = state.recommendFilters; // ✅ правильно
    const {currentPage} = state.recommend;

    const finalParams: GetWordsParams = {
      keyword: filters.search || undefined,
      category: filters.category || undefined,
      isIrregular:
        filters.subCategory === 'Irregular'
          ? true
          : filters.subCategory === 'Regular'
          ? false
          : undefined, // краще ніж null
      page: currentPage,
      limit: params.limit,
    };

    const {data} = await axiosInstance.get<GetWordsResponse>('/words/all', {
      params: finalParams,
    });
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const createWord = createAsyncThunk<
  WordItem,
  WordItem,
  {rejectValue: string}
>('recommend/createWord', async (formData: WordItem, thunkApi) => {
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
>('recommend/getCategories', async (_, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<string[]>('/words/categories');
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
