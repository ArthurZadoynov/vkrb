import { RootState } from "../store";

export const filtersSelector = (state: RootState) => {
  return state.filters;
};
