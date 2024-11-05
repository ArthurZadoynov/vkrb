import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 6,
};

export const limitProductsSlice = createSlice({
  name: "limitProducts",
  initialState,
  reducers: {
    Limit: (state) => {
      state.limit = 6;
    },
    upLimit: (state) => {
      state.limit += 6;
    },
  },
});

export const { Limit, upLimit } = limitProductsSlice.actions;
export default limitProductsSlice.reducer;
