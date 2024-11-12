import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const MainSectionTitle = () => {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <h1>Кроссовки известных брендов с доставкой по России и СНГ</h1>
        <p>
          Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и
          многие другие по низким ценам
        </p>
        <Link to={`/Vkrb/basket`} className={styles.wrapperBasket}>
          <button>Перейти к покупкам</button>
        </Link>
      </div>
    </section>
  );
};
