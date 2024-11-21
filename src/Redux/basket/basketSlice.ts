import { createSlice } from "@reduxjs/toolkit";
import { BasketState } from "../../types/state";
import {
  fetchBasket,
  removeItem,
  clearBasket,
  postBasket,
} from "../../api/basket";

const initialState: BasketState = {
  isLoading: false,
  data: [],
  isError: false,
};

// Создаем срез состояния для корзины с помощью функции basketSlice.
const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Определяем дополнительные редюсеры для обработки асинхронных действий.
    // Обрабатываем состояние при ожидании выполнения fetchBasket.
    builder.addCase(fetchBasket.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    // Обрабатываем состояние при успешном выполнении fetchBasket.
    builder.addCase(fetchBasket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload; // Обновляем данные корзины на основе полученной полезной нагрузки (payload).
    });
    // Обрабатываем состояние при неудачном выполнении fetchBasket.
    builder.addCase(fetchBasket.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Обрабатываем состояние при успешном выполнении removeItem.
    builder.addCase(removeItem.fulfilled, (state, action) => {
      // Фильтруем данные корзины, удаляя элемент с id, совпадающим с payload.
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    // Обрабатываем состояние при успешном выполнении clearBasket.
    builder.addCase(clearBasket.fulfilled, (state) => {
      state.data = []; // Очищаем данные корзины, устанавливая их в пустой массив.
    });
    // Обрабатываем состояние при успешном выполнении postBasket.
    builder.addCase(postBasket.fulfilled, (state, action) => {
      state.data.push(action.payload); // Добавляем новый элемент в корзину на основе полезной нагрузки (payload).
    });
  },
});

export default basketSlice.reducer; // Экспортируем редьюсер по умолчанию для использования в хранилище Redux.
