import { RootState } from "../store";

// Определяем селектор basketSelector, который принимает состояние приложения и возвращает часть состояния, связанную с корзиной.
export const basketSelector = (state: RootState) => {
  return state.basket; // Возвращаем состояние корзины из общего состояния приложения.
};
