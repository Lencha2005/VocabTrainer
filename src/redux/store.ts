import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import authReducer from './auth/authSlice';
import dictionaryFiltersSlice from './filters/dictionaryFiltersSlice';
import recommendFiltersSlice from './filters/recommendFiltersSlice';
import recommendSlice from './recommend/recommendSlice';
import dictionarySlice from './dictionary/dictionarySlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  recommend: recommendSlice,
  dictionary: dictionarySlice,
  recommendFilters: recommendFiltersSlice,
  dictionaryFilters: dictionaryFiltersSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
