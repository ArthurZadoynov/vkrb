import { instance } from "./axiosInstance";

export type FormType = {
  user_name: string;
  user_telephone: string;
};

export const postData = async (data: FormType) => {
  try {
    await instance.post(`/users`, data);
    alert("Запрос принят, в ближайше время с Вами свяжемся!");
  } catch (error) {
    console.error("Произошла ошибка при отправке данных на сервер", error);
    alert("При отправке данных возникла ошибка, попробуйте еще раз.");
  }
};
