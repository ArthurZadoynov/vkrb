import styles from "./styles.module.css";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { sneakersSelector } from "../../Redux/sneakers/sneakersSelector";
import { useAppDispatch } from "../../Redux/store";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { fetchSneakers } from "../../api/sneakers";
import { SneakerCard } from "../SneakerCard";
import { Filter } from "../Filter/Filter";
import { filtersSelector } from "../../Redux/filters/filterSelector";

export const MainSectionCatalog = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useSelector(sneakersSelector);

  const filtersState = useSelector(filtersSelector);

  const filteredData = useMemo(() => {
    return data.filter((item => {
      debugger
      const { gender, price, size } = filtersState;
      if (gender.female !== gender.male) {
        if (gender.male && item.gender !== 'Мужской') {
          return false;
        }

        if (gender.female && item.gender !== 'Женский') {
          return false;
        }
      }

      if (price.min && item.price < price.min) {
        return false
      }

      if (price.max && item.price > price.max) {
        return false
      }

      if (size.length) {
        return item.sizes.some(itemSize => size.includes(itemSize))
      }

      return true;
    }));


  }, [filtersState, data])


  useEffect(() => {
    dispatch(fetchSneakers());
  }, []);

  return (
    <section className={styles.containerCatalog}>
      <div className={styles.catalog}>
        <h2 id="catalog">Каталог</h2>
        <div className={styles.catalogContent}>
          <div className={styles.filter}>
            {data.length ? <Filter /> : null}
          </div>
          {isLoading && data.length === 0 ? (
            <Loader />
          ) : (
            <div className={styles.products}>
              {filteredData.map((item) => (
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
