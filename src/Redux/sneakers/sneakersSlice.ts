import { createSlice } from "@reduxjs/toolkit";
import { SneakersState } from "../../types/state";
import { fetchSneakers } from "../../api/sneakers";

const initialState: SneakersState = {
  isLoading: false,
  data: [],
  isError: false,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSneakers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default sneakersSlice.reducer;
