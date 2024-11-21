import { createSlice } from "@reduxjs/toolkit";
import { SneakerState } from "../../types/state";
import { getSneaker } from "../../api/sneaker";

const initialState: SneakerState = {
  isLoading: false,
  data: null,
  isError: false,
};

// Создаем срез состояния для кроссовок с помощью функции createSlice.
const sneakerSlice = createSlice({
  name: "sneaker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Определяем дополнительные редюсеры для обработки асинхронных действий.
    // Обрабатываем состояние при ожидании выполнения getSneaker.
    builder.addCase(getSneaker.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.data = null;
    });
    // Обрабатываем успешное выполнение (fulfilled) для getSneaker.
    builder.addCase(getSneaker.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload; // Сохраняем полученные данные в состоянии.
    });
    // Обрабатываем ошибку (rejected) для getSneaker.
    builder.addCase(getSneaker.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default sneakerSlice.reducer; // Экспортируем редюсер определенных кроссовок по умолчанию для использования в store.
