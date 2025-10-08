import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DictionaryFiltersState {
  search: string;
  category: string | null;
  isIrregular: boolean | null;
}

const initialState: DictionaryFiltersState = {
  search: '',
  category: null,
  isIrregular: null,
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
        state.isIrregular = null;
      }
    },
    setDictionaryIsIrregular(state, action: PayloadAction<boolean | null>) {
      state.isIrregular = action.payload;
    },
    resetDictionaryFilters(state) {
      state.search = '';
      state.category = null;
      state.isIrregular = null;
    },
  },
});

export const {
  setDictionarySearch,
  setDictionaryCategory,
  setDictionaryIsIrregular,
  resetDictionaryFilters,
} = dictionaryFiltersSlice.actions;

export default dictionaryFiltersSlice.reducer;
