import { RootState } from "../store";

// Определяем селектор sneakerSelector, который принимает состояние приложения и возвращает часть состояния, связанную с определенными кроссовками.
export const sneakerSelector = (state: RootState) => {
  return state.sneaker; // Возвращаем состояние определнных кроссовок из общего состояния приложения.
};
