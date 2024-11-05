import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./axiosInstance";

export const getSneaker = createAsyncThunk("sneaker", async (id: string) => {
  if (!id) {
    throw new Error("ID не должен быть undefined");
  }
  const { data } = await instance.get(`/sneakers/${id}`);
  return data;
});
