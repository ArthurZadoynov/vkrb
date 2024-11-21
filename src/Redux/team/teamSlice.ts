import { createSlice } from "@reduxjs/toolkit";
import { TeamState } from "../../types/state";
import { fetchTeam } from "../../api/team";

const initialState: TeamState = {
  isLoading: false,
  data: [],
  isError: false,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

// Создаем срез состояния для команды с помощью функции createSlice.
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Определяем дополнительные редюсеры для обработки асинхронных действий.
    // Обрабатываем состояние при ожидании выполнения fetchTeam.
    builder.addCase(fetchTeam.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    // Обрабатываем состояние при успешном выполнении fetchTeam.
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.data = action.payload; // Сохраняем полученные данные в состоянии.
      state.isLoading = false;
    });
    // Обрабатываем состояние при неудачном выполнении fetchTeam.
    builder.addCase(fetchTeam.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default teamSlice.reducer; // Экспортируем редюсер команды по умолчанию для использования в store.
