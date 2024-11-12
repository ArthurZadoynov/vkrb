import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./axiosInstance";

export const fetchSneakers = createAsyncThunk("sneakers/fetch", async () => {
  try {
    const response = await instance.get("/sneakers");
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка при получении кроссовок:", error);
  }
});
