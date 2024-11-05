import axios from "axios";

export type FormType = {
  user_name: string;
  user_telephone: string;
};

export const postData = async (data: FormType) => {
  try {
    await axios.post(`https://487fa880b8d6bbea.mokky.dev/users`, data);
    alert("Запрос принят, в ближайше время с Вами свяжемся!");
  } catch (error) {
    console.error("Произошла ошибка при отправке данных на сервер", error);
    alert("При отправке данных возникла ошибка, попробуйте еще раз.");
  }
};
