import { RootState } from "../store";

// Определяем селектор sneakersSelector, который принимает состояние приложения и возвращает часть состояния, связанную с кроссовками.
export const sneakersSelector = (state: RootState) => {
  return state.sneakers; // Возвращаем состояние кроссовок из общего состояния приложения.
};
