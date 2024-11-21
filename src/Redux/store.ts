import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import sneakersSlice from "./sneakers/sneakersSlice";
import sneakerSlice from "./sneaker/sneakerSlice";
import teamSlice from "./team/teamSlice";
import filtersSlice from "./filters/filterSlice";
import basketSlice from "./basket/basketSlice";

// С помощью функции configureStore создаем Redux store с использованием Redux Toolkit, передавая объект с редюсерами.
export const store = configureStore({
  reducer: {
    sneakers: sneakersSlice, // Редюсер для работы со списком кроссовок
    sneaker: sneakerSlice, // Редюсер для работы с одной отдельной парой кроссовок
    team: teamSlice, // Редюсер для работы со списком команды
    basket: basketSlice, // Редюсер для работы с корзиной покупок
    filters: filtersSlice, // Редюсер для работы с фильтрами
  },
});

export type RootState = ReturnType<typeof store.getState>; // Определяем тип RootState, который представляет состояние всего приложения, полученное из store.
export type AppDispatch = typeof store.dispatch; // Определяем тип AppDispatch, который представляет функцию dispatch в приложении.
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Создаем собственный хук useAppDispatch, который возвращает dispatch с типом AppDispatch, чтобы использовать его в компонентах.
