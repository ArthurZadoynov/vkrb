import { RootState } from "../store";

export const basketSelector = (state: RootState) => {
  return state.basket;
};
