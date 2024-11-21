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
  const dispatch = useAppDispatch(); // Получаем функцию dispatch для работы с экшенами Redux
  const { data, isLoading, isError } = useSelector(sneakersSelector); // Извлекаем данные о кроссовках, состояние загрузки и ошибки из Redux
  const filtersState = useSelector(filtersSelector); // Извлекаем состояние фильтров из Redux

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { gender, price, size } = filtersState; // Деструктурируем состояние фильтров
      // Проверяем выбранный пол и фильтруем по полу кроссовок
      if (gender.female !== gender.male) {
        if (gender.male && item.gender !== "Мужской") {
          return false;
        }

        if (gender.female && item.gender !== "Женский") {
          return false;
        }
      }

      // Фильтруем по минимальной цене
      if (price.min && item.price < price.min) {
        return false;
      }
      // Фильтруем по максимальной цене
      if (price.max && item.price > price.max) {
        return false;
      }
      // Фильтруем по размеру, если размеры выбраны
      if (size.length) {
        return item.sizes.some((itemSize) => size.includes(itemSize));
      }

      return true; // Если ни одно условие не сработало, возвращаем true
    });
  }, [filtersState, data]); // Зависимости: фильтры и данные о кроссовках

  useEffect(() => {
    // Используем useEffect для загрузки данных о кроссовках при первом рендере компонента
    dispatch(fetchSneakers()); // Диспатчим экшен для загрузки кроссовок
  }, []); // Пустой массив зависимостей означает выполнение только при монтировании

  const currentLimit = filtersState.limit; // Получаем текущий лимит отображаемых кроссовок
  const isLoadMoreDisabled = currentLimit >= filteredData.length; // Проверяем, можно ли загружать больше

  const availableSizes = new Set(filteredData.flatMap((item) => item.sizes)); // Создаем множество доступных размеров на основе отфильтрованных данных

  return (
    <section className={styles.containerCatalog}>
      <div className={styles.catalog}>
        <h2 id="catalog">Каталог</h2>
        <div className={styles.catalogContent}>
          <div className={styles.filter}>
            {/* Если есть данные о кроссовках, отображаем компонент фильтра */}
            {data.length ? <Filter availableSizes={availableSizes} /> : null}
          </div>
          <div className={styles.containerProducts}>
            {isLoading && data.length === 0 ? (
              <Loader />
            ) : (
              <div className={styles.products}>
                {filteredData.slice(0, currentLimit).map(
                  (
                    item // создаем новый массив, содержащий элементы с индексами от 0 до currentLimit
                  ) => (
                    <SneakerCard key={`sneakers_item_${item.id}`} data={item} />
                  )
                )}
              </div>
            )}
            <button
              className={styles.openBtnMore}
              onClick={() => dispatch(changeLimit())} // Диспатчим экшен для изменения лимита
              disabled={isLoadMoreDisabled} // Отключаем кнопку, если больше нечего загружать
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
