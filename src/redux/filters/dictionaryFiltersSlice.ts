import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DictionaryFiltersState {
  search: string;
  category: string | null;
  subCategory: string | null;
}

const initialState: DictionaryFiltersState = {
  search: '',
  category: null,
  subCategory: null,
};

const dictionaryFiltersSlice = createSlice({
  name: 'dictionaryFilters',
  initialState,
  reducers: {
    setDictionarySearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setDictionaryCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
      if (action.payload !== 'Verb') {
        state.subCategory = null;
      }
    },
    setDictionarySubCategory(state, action: PayloadAction<string | null>) {
      state.subCategory = action.payload;
    },
    resetDictionaryFilters(state) {
      state.search = '';
      state.category = null;
      state.subCategory = null;
    },
  },
});

export const {
  setDictionarySearch,
  setDictionaryCategory,
  setDictionarySubCategory,
  resetDictionaryFilters,
} = dictionaryFiltersSlice.actions;

export default dictionaryFiltersSlice.reducer;
