import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../../types/state";

const initialState: FiltersState = {
  price: {}, // price - объект для хранения ценовых фильтров.
  size: [], // size - массив для хранения выбранных размеров.
  gender: {
    female: false,
    male: false,
  }, // gender - объект, указывающий, выбраны ли фильтры по полу (женский и мужской).
  limit: 6, // limit - количество элементов, отображаемых на странице (по умолчанию 6).
};

// Создаем срез состояния для фильтров с помощью функции createSlice.
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Определяем редьюсеры (функции для обработки действий).
    updateFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      // Редьюсер для обновления фильтров.
      // Принимает состояние и действие с полезной нагрузкой, которая является частичным состоянием FiltersState.
      Object.assign(state, action.payload); // Этот метод объединяет текущее состояние с полезной нагрузкой из действия.
      //Если в action.payload переданы новые значения для каких-либо полей (например, новый размер или цена), они будут обновлены в текущем состоянии.
      //Другие поля останутся неизменными.
    },
    clearFilters: (state) => {
      Object.assign(state, initialState);
      // // Сбрасываем состояние фильтров до начального состояния.
    },
    resetLimit: (state) => {
      state.limit = 6; // Сбрасываем лимит до 6.
    },
    changeLimit: (state) => {
      state.limit += 6; // Увеличиваем лимит отображаемых элементов на 6.
    },
  },
});

export const { updateFilters, clearFilters, resetLimit, changeLimit } =
  filterSlice.actions; // Экспортируем действия, созданные в срезе, чтобы их можно было использовать в компонентах и других частях приложения.

export default filterSlice.reducer; // Экспортируем редюсер фильтров по умолчанию для использования в store.
