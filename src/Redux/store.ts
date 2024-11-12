import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import sneakersSlice from "./sneakers/sneakersSlice";
import sneakerSlice from "./sneaker/sneakerSlice";
import teamSlice from "./team/teamSlice";
import filtersSlice from "./filters/filterSlice";
import basketSlice from "./basket/basketSlice";

export const store = configureStore({
  reducer: {
    sneakers: sneakersSlice,
    sneaker: sneakerSlice,
    team: teamSlice,
    basket: basketSlice,
    filters: filtersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
