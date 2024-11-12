import { instance } from "./axiosInstance";

export type FormType = {
  user_name: string;
  user_telephone: string;
  user_email: string;
};

export type RemoveId = {
  id: number;
};

export const postDataOrder = async (data: FormType) => {
  try {
    await instance.post("/orders", data);
  } catch (error) {
    console.error("Произошла ошибка при отправке данных на сервер", error);
    alert("При отправке данных возникла ошибка, попробуйте еще раз.");
  }
};
