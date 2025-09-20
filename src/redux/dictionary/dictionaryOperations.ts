import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../lib/axiosInstance';
import {getErrorMessage} from '../utils/getErrorMessage';

import {
  GetWordsParams,
  GetWordsResponse,
  WordItem,
  AnswerWordDto,
  DeleteWordResponse,
  GetTasksResponse,
  StatisticsResponse,
  AnswerResponse,
} from '../types';

export const getUserWordsWithPagination = createAsyncThunk<
  GetWordsResponse,
  GetWordsParams | void,
  {rejectValue: string}
>('dictionary/getUserWordsWithPagination', async (params = {}, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<GetWordsResponse>('/words/own', {
      params,
    });
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getAllUserWords = createAsyncThunk<
  GetWordsResponse,
  void,
  {rejectValue: string}
>('dictionary/getAllUserWords', async (_, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<GetWordsResponse>('/words/own', {
      params: {limit: 1000},
    });
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const addWordById = createAsyncThunk<
  WordItem,
  string,
  {rejectValue: string}
>('dictionary/addById', async (id, thunkApi) => {
  try {
    const {data} = await axiosInstance.post<WordItem>(`/words/add/${id}`);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
});

export const updateWordById = createAsyncThunk<
  WordItem,
  {id: string; formData: Omit<WordItem, '_id'>},
  {rejectValue: string}
>('dictionary/editById', async ({id, formData}, thunkApi) => {
  try {
    const {data} = await axiosInstance.patch<WordItem>(
      `/words/edit/${id}`,
      formData,
    );
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
});

export const deleteWordById = createAsyncThunk<
  DeleteWordResponse,
  string,
  {rejectValue: string}
>('dictionary/deleteById', async (id, thunkApi) => {
  try {
    const {data} = await axiosInstance.delete<DeleteWordResponse>(
      `/words/delete/${id}`,
    );
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
});

export const getStatistics = createAsyncThunk<
  StatisticsResponse,
  void,
  {rejectValue: string}
>('dictionary/getStatistics', async (_, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<StatisticsResponse>(
      '/words/statistics',
    );
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const getTasks = createAsyncThunk<
  GetTasksResponse,
  void,
  {rejectValue: string}
>('dictionary/getTasks', async (_, thunkApi) => {
  try {
    const {data} = await axiosInstance.get<GetTasksResponse>('/words/tasks');
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const addAnswers = createAsyncThunk<
  AnswerResponse[],
  AnswerWordDto[],
  {rejectValue: string}
>('dictionary/addAnswers', async (answers, thunkApi) => {
  try {
    const {data} = await axiosInstance.post<AnswerResponse[]>(
      '/words/answers',
      answers,
    );
    return data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
