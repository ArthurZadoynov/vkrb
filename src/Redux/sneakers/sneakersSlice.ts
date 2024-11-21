import { createSlice } from "@reduxjs/toolkit";
import { SneakersState } from "../../types/state";
import { fetchSneakers } from "../../api/sneakers";

const initialState: SneakersState = {
  isLoading: false,
  data: [],
  isError: false,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

// Создаем срез состояния для кроссовок с помощью функции createSlice.
const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Определяем дополнительные редюсеры для обработки асинхронных действий.
    // Обрабатываем состояние при ожидании выполнения fetchSneakers.
    builder.addCase(fetchSneakers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    // Обрабатываем состояние при успешном выполнении fetchSneakers.
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload; // Сохраняем полученные данные о кроссовках в состоянии.
    });
    // Обрабатываем состояние при неудачном выполнении fetchSneakers.
    builder.addCase(fetchSneakers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default sneakersSlice.reducer; // Экспортируем редюсер кроссовок по умолчанию для использования в store.
