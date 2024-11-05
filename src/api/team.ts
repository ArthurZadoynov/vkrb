import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeam = createAsyncThunk("team/fetch", async () => {
  try {
    const response = await axios.get("https://487fa880b8d6bbea.mokky.dev/team");
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка при получении Команды:", error);
  }
});
