import styles from "./styles.module.css";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { sneakersSelector } from "../../Redux/sneakers/sneakersSelector";
import { useAppDispatch } from "../../Redux/store";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { fetchSneakers } from "../../api/sneakers";
import { SneakerCard } from "../MainCardCatalog";
import { filtersSelector } from "../../Redux/filters/filterSelector";
import { changeLimit } from "../../Redux/filters/filterSlice";
import { Filter } from "../MainFilterCatalog/Filter";

export const MainSectionCatalog = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useSelector(sneakersSelector);
  const filtersState = useSelector(filtersSelector);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { gender, price, size } = filtersState;
      if (gender.female !== gender.male) {
        if (gender.male && item.gender !== "Мужской") {
          return false;
        }

        if (gender.female && item.gender !== "Женский") {
          return false;
        }
      }

      if (price.min && item.price < price.min) {
        return false;
      }

      if (price.max && item.price > price.max) {
        return false;
      }

      if (size.length) {
        return item.sizes.some((itemSize) => size.includes(itemSize));
      }

      return true;
    });
  }, [filtersState, data]);

  useEffect(() => {
    dispatch(fetchSneakers());
  }, []);

  const currentLimit = filtersState.limit;
  const isLoadMoreDisabled = currentLimit >= filteredData.length;

  const availableSizes = new Set(filteredData.flatMap((item) => item.sizes));

  return (
    <section className={styles.containerCatalog}>
      <div className={styles.catalog}>
        <h2 id="catalog">Каталог</h2>
        <div className={styles.catalogContent}>
          <div className={styles.filter}>
            {data.length ? <Filter availableSizes={availableSizes} /> : null}
          </div>
          <div className={styles.containerProducts}>
            {isLoading && data.length === 0 ? (
              <Loader />
            ) : (
              <div className={styles.products}>
                {filteredData.slice(0, currentLimit).map((item) => (
                  <SneakerCard key={`sneakers_item_${item.id}`} data={item} />
                ))}
              </div>
            )}
            <button
              className={styles.openBtnMore}
              onClick={() => dispatch(changeLimit())}
              disabled={isLoadMoreDisabled}
            >
              Показать еще
            </button>
          </div>
        </div>
      </div>
      {isError && <Error />}
    </section>
  );
};
