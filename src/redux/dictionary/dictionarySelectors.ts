import {RootState} from '../store';

export const selectDictionary = (state: RootState) =>
  state.dictionary.userItems;
export const selectFullDictionaryItems = (state: RootState) =>
  state.dictionary.fullUserItems;
export const selectWord = (state: RootState) => state.dictionary.word;
export const selectTotalPages = (state: RootState) =>
  state.dictionary.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.dictionary.currentPage;
export const selectPerPages = (state: RootState) => state.dictionary.perPage;
export const selectStatistics = (state: RootState) =>
  state.dictionary.statistics;
export const selectTasks = (state: RootState) => state.dictionary.tasks;
export const selectAnswers = (state: RootState) => state.dictionary.answers;
export const selectDictionaryLoading = (state: RootState) =>
  state.dictionary.isLoading;
export const selectErrorUser = (state: RootState) => state.dictionary.error;
