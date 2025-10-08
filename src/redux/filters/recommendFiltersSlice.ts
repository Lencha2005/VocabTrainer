import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface recommendFiltersState {
  search: string;
  category: string | null;
  isIrregular: boolean | null;
}

const initialState: recommendFiltersState = {
  search: '',
  category: null,
  isIrregular: null,
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
        state.isIrregular = null;
      }
    },
    setRecommendIsIrregular(state, action: PayloadAction<boolean | null>) {
      state.isIrregular = action.payload;
    },
    resetRecommendFilters(state) {
      state.search = '';
      state.category = null;
      state.isIrregular = null;
    },
  },
});

export const {
  setRecommendSearch,
  setRecommendCategory,
  setRecommendIsIrregular,
  resetRecommendFilters,
} = recommendFiltersSlice.actions;

export default recommendFiltersSlice.reducer;
