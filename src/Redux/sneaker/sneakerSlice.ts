import { createSlice } from "@reduxjs/toolkit";
import { SneakerState } from "../../types/state";
import { getSneaker } from "../../api/sneaker";

const initialState: SneakerState = {
  isLoading: false,
  data: null,
  isError: false,
};

const sneakerSlice = createSlice({
  name: "sneaker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSneaker.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.data = null;
    });
    builder.addCase(getSneaker.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(getSneaker.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default sneakerSlice.reducer;
