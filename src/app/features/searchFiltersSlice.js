import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  category: "",
  platform: "",
  followers: ""
};
const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    resetFilters: () => initialState
  }
});
const { setCategory, setPlatform, setFollowers, resetFilters } = searchFiltersSlice.actions;
const searchFiltersReducer = searchFiltersSlice.reducer;
export {
  resetFilters,
  searchFiltersReducer,
  setCategory,
  setFollowers,
  setPlatform
};
