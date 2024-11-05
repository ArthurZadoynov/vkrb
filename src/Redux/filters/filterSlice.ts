import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../../types/state";

const initialState: FiltersState = {
  price: {},
  size: [],
  gender: {
    female: false,
    male: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      Object.assign(state, action.payload);
    },
    clearFilters: (state) => {
      Object.assign(state, initialState)
    }
  },
});

export const { updateFilters, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
