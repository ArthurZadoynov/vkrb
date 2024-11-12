import styles from "./styles.module.css";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Sneaker } from "../../types";
import Show from "../../images/Show.png";
import IconAddBasket from "../../images/addBasket.png";
import { postBasket } from "../../api/basket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";

type Props = {
  data: Sneaker;
};

export const SneakerCard: FC<Props> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.productCard} key={data.vendorСode}>
      <div className={styles.catalogImage}>
        <img className={styles.productImage} src={data.imgUrl} alt="" />
        <Link to={`/Vkrb/sneaker/${data.id}`} className={styles.wrapperSneaker}>
          <img
            className={styles.iconView}
            src={Show}
            alt="Полное описание продукта"
          />
        </Link>
        <div className={styles.wrapperBasket}>
          <button
            className={styles.addBasket}
            onClick={() => dispatch(postBasket(data))}
          >
            <img
              className={styles.iconAdd}
              src={IconAddBasket}
              alt="Добавить в корзину"
            />
          </button>
        </div>
      </div>
      <p>Кроссовки {data.title}</p>
      <h4>{data.price.toLocaleString("ru-RU")} &#8381;</h4>
    </div>
  );
};
