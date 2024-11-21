import styles from "./styles.module.css";
import { FC } from "react";
import { Sneaker } from "../../types";
import { removeItem } from "../../api/basket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";

type Props = {
  data: Sneaker;
  handleRemove: (id: number) => Promise<void>;
};

const getNewGender = (gender: string) => {
  switch (gender) {
    case "Мужской":
      return "Мужские";
    case "Женский":
      return "Женские";
    default:
      return gender;
  }
};

export const BasketCard: FC<Props> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>(); // Получаем dispatch функцию из Redux для отправки действий.

  const handleRemove = async (id: number): Promise<void> => {
    // Асинхронная функция для обработки удаления элемента по его идентификатору.
    dispatch(removeItem(id)); // Вызываем действие removeItem с переданным id для удаления элемента из корзины.
  };
  return (
    <div className={styles.cardContent} key={data.id}>
      <div>
        <img src={data.imgUrl} alt="sneaker" />
        <div>
          <p>
            {getNewGender(data.gender)} кроссовки {data.title}
          </p>
          <span>{data.price.toLocaleString("ru-RU")} &#8381;</span>
        </div>
      </div>
      <button onClick={() => handleRemove(data.id)}>Удалить</button>
    </div>
  );
};
