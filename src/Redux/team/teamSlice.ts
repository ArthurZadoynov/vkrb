import { createSlice } from "@reduxjs/toolkit";
import { TeamState } from "../../types/state";
import { fetchTeam } from "../../api/team";

const initialState: TeamState = {
  isLoading: false,
  data: [],
  isError: false,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeam.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTeam.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default teamSlice.reducer;
