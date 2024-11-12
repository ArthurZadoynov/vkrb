import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./axiosInstance";

export const fetchTeam = createAsyncThunk("team/fetch", async () => {
  try {
    const response = await instance.get("/team");
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка при получении Команды:", error);
  }
});
