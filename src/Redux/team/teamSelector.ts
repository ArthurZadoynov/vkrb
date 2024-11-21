import { RootState } from "../store";

// Определяем селектор teamSelector, который принимает состояние приложения и возвращает часть состояния, связанную с командой.
export const teamSelector = (state: RootState) => {
  return state.team; // Возвращаем состояние команды из общего состояния приложения.
};
