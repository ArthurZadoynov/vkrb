import { createAsyncThunk } from "@reduxjs/toolkit";
import { Sneaker } from "../types";
import { instance } from "./axiosInstance";

export const fetchBasket = createAsyncThunk("basket/fetch", async () => {
  try {
    const response = await instance.get(`/basket`);
    return response.data;
  } catch (error) {
    console.error(
      "Произошла ошибка получения данных и отображения в корзине:",
      error
    );
  }
});

export const removeItem = createAsyncThunk<number, number>(
  "basket/remove",
  async (id) => {
    try {
      await instance.delete(`/basket/${id}`);
      return id;
    } catch (error) {
      console.error("Ошибка при удалении элемента", error);
      throw new Error("Не удалось удалить элемент");
    }
  }
);

export const clearBasket = createAsyncThunk("basket/clear", async () => {
  try {
    const { data } = await instance.patch("/basket", []);

    return data;
  } catch (error) {
    console.error("Ошибка при очистке корзины:", error);
    throw error;
  }
});

export const postBasket = createAsyncThunk<Sneaker, Sneaker>(
  "basket,postBasket",
  async (item) => {
    try {
      const { data } = await instance.post("/basket", item);
      alert("Добавлено в корзину");
      return data;
    } catch (error) {
      throw new Error(
        "Неудачная попытка добавить в корзину, попробуйте еще раз"
      );
    }
  }
);
