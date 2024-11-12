import { createSlice } from "@reduxjs/toolkit";
import { BasketState } from "../../types/state";
import {
  fetchBasket,
  removeItem,
  clearBasket,
  postBasket,
} from "../../api/basket";

const initialState: BasketState = {
  isLoading: false,
  data: [],
  isError: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchBasket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBasket.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(clearBasket.fulfilled, (state) => {
      state.data = [];
    });
    builder.addCase(postBasket.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});

export default basketSlice.reducer;
