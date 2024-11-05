import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSneakers = createAsyncThunk("sneakers/fetch", async () => {
  try {
    const response = await axios.get(
      "https://487fa880b8d6bbea.mokky.dev/sneakers?limit=6"
    );
    return response.data.items;
  } catch (error) {
    console.error("Произошла ошибка при получении кроссовок:", error);
  }
});
