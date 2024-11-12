import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../../types/state";

const initialState: FiltersState = {
  price: {},
  size: [],
  gender: {
    female: false,
    male: false,
  },
  limit: 6,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      Object.assign(state, action.payload);
    },
    clearFilters: (state) => {
      Object.assign(state, initialState);
    },
    resetLimit: (state) => {
      state.limit = 6;
    },
    changeLimit: (state) => {
      state.limit += 6;
    },
  },
});

export const { updateFilters, clearFilters, resetLimit, changeLimit } =
  filterSlice.actions;

export default filterSlice.reducer;
