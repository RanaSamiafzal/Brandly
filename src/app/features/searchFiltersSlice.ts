import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchFiltersState {
  category: string;
  platform: string;
  followers: string;
}

const initialState: SearchFiltersState = {
  category: '',
  platform: '',
  followers: '',
};

const searchFiltersSlice = createSlice({
  name: 'searchFilters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPlatform: (state, action: PayloadAction<string>) => {
      state.platform = action.payload;
    },
    setFollowers: (state, action: PayloadAction<string>) => {
      state.followers = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setPlatform, setFollowers, resetFilters } = searchFiltersSlice.actions;
export const searchFiltersReducer = searchFiltersSlice.reducer;
