import {RootState} from '../store';

export const selectRecommendWords = (state: RootState) => state.recommend.items;
export const selectCategories = (state: RootState) =>
  state.recommend.categories;
export const selectTotalPages = (state: RootState) =>
  state.recommend.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.recommend.currentPage;
export const selectPerPages = (state: RootState) => state.recommend.perPage;
export const selectRecommendLoading = (state: RootState) =>
  state.recommend.isLoading;
export const selectErrorUser = (state: RootState) => state.recommend.error;
