import { RootState } from "../store";

export const sneakerSelector = (state: RootState) => {
  return state.sneaker;
};
