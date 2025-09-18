import {RootState} from '../store';

export const selectDictionarySearch = (state: RootState) =>
  state.dictionaryFilters.search;

export const selectDictionaryCategory = (state: RootState) =>
  state.dictionaryFilters.category;

export const selectDictionarySubCategory = (state: RootState) =>
  state.dictionaryFilters.subCategory;

export const selectRecommendSearch = (state: RootState) =>
  state.recommendFilters.search;

export const selectRecommendCategory = (state: RootState) =>
  state.recommendFilters.category;

export const selectRecommendSubCategory = (state: RootState) =>
  state.recommendFilters.subCategory;
