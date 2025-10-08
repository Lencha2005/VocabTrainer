import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface recommendFiltersState {
  search: string;
  category: string | null;
  subCategory: string | null;
}

const initialState: recommendFiltersState = {
  search: '',
  category: null,
  subCategory: null,
};

const recommendFiltersSlice = createSlice({
  name: 'recommendFilters',
  initialState,
  reducers: {
    setRecommendSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setRecommendCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
      if (action.payload !== 'Verb') {
        state.subCategory = null;
      }
    },
    setRecommendSubCategory(state, action: PayloadAction<string | null>) {
      state.subCategory = action.payload;
    },
    resetRecommendFilters(state) {
      state.search = '';
      state.category = null;
      state.subCategory = null;
    },
  },
});

export const {
  setRecommendSearch,
  setRecommendCategory,
  setRecommendSubCategory,
  resetRecommendFilters,
} = recommendFiltersSlice.actions;

export default recommendFiltersSlice.reducer;
