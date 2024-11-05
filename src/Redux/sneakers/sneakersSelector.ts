import { RootState } from "../store";

export const sneakersSelector = (state: RootState) => {
  return state.sneakers;
};
