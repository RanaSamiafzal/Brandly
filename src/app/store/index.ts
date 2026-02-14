import { configureStore } from '@reduxjs/toolkit';
import { searchFiltersReducer } from '../features/searchFiltersSlice';
import { influencersApi } from '../services/influencersApi';

export const store = configureStore({
  reducer: {
    searchFilters: searchFiltersReducer,
    [influencersApi.reducerPath]: influencersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(influencersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
