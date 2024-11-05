import styles from "./styles.module.css";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Sneaker } from "../../types";
import IconViewProduct from '../../images/viewProduct.png';
import IconAddBasket from '../../images/addBasket.png';

type Props = {
  data: Sneaker;
};
export const SneakerCard: FC<Props> = ({ data }) => {
  return (
      <div className={styles.productCard} key={data.vendorСode}>
        <div className={styles.catalogImage}>
          <img className={styles.productImage} src={data.imgUrl} alt="" />
          <Link
            to={`/Vkrb/sneaker/${data.id}`}
            className={styles.wrapper}
          >
            <img className={styles.iconView} src={IconViewProduct} alt="Полное описание продукта" />
          </Link>
          <img className={styles.iconAdd} src={IconAddBasket} alt="Добавить в корзину" />
        </div>
          <p>Кроссовки {data.title}</p>
          <h4>{data.price.toLocaleString('ru-RU')} &#8381;</h4>
      </div>
  );
};
