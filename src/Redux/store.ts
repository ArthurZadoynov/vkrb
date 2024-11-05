import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import sneakersSlice from "./sneakers/sneakersSlice";
import sneakerSlice from "./sneaker/sneakerSlice";
import teamSlice from "./team/teamSlice";
import limitProductsSlice from "./limitProduct/limitProductsSlice";
import filtersSlice from "./filters/filterSlice";

export const store = configureStore({
  reducer: {
    sneakers: sneakersSlice,
    sneaker: sneakerSlice,
    team: teamSlice,
    limitProducts: limitProductsSlice,
    filters: filtersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
