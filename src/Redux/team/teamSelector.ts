import { RootState } from "../store";

export const teamSelector = (state: RootState) => {
  return state.team;
};
