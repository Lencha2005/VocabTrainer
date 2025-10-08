import {RootState} from '../store';

export const selectDictionarySearch = (state: RootState) =>
  state.dictionaryFilters.search;

export const selectDictionaryCategory = (state: RootState) =>
  state.dictionaryFilters.category;

export const selectDictionaryIsIrregular = (state: RootState) =>
  state.dictionaryFilters.isIrregular;

export const selectRecommendSearch = (state: RootState) =>
  state.recommendFilters.search;

export const selectRecommendCategory = (state: RootState) =>
  state.recommendFilters.category;

export const selectRecommendIsIrregular = (state: RootState) =>
  state.recommendFilters.isIrregular;
