import styles from "./styles.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { sneakersSelector } from "../../Redux/sneakers/sneakersSelector";
import { useAppDispatch } from "../../Redux/store";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { fetchSneakers } from "../../api/sneakers";
import { SneakerCard } from "../SneakerCard";

export const MainSectionCatalog = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useSelector(sneakersSelector);

  useEffect(() => {
    dispatch(fetchSneakers());
  }, []);

  return (
    <section className={styles.containerCatalog}>
      <div className={styles.catalog}>
        <h2 id="catalog">Каталог</h2>
        <div className={styles.catalogContent}>
          <div className={styles.filter}></div>
          {isLoading && data.length === 0 ? (
            <Loader />
          ) : (
            <div className={styles.products}>
              {data.map((item) => (
                <SneakerCard key={`sneakers_item_${item.id}`} data={item} />
              ))}
            </div>
          )}
        </div>
      </div>
      {isError && <Error />}
    </section>
  );
};
