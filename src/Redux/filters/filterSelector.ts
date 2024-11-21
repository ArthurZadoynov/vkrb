import { RootState } from "../store";

// Определяем селектор filtersSelector, который принимает состояние приложения и возвращает часть состояния, связанную с фильтрами.
export const filtersSelector = (state: RootState) => {
  return state.filters; // Возвращаем состояние фильтров из общего состояния приложения.
};
