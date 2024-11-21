import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import Nouislider from "nouislider-react";
import { useDispatch, useSelector } from "react-redux";
import { filtersSelector } from "../../Redux/filters/filterSelector";
import {
  updateFilters,
  clearFilters,
  resetLimit,
} from "../../Redux/filters/filterSlice";
import { sneakersSelector } from "../../Redux/sneakers/sneakersSelector";

import { Size } from "./Size/Size";
import { FiltersState } from "../../types/state";

import "nouislider/distribute/nouislider.css";

const SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43]; // Определяем массив доступных размеров кроссовок.

interface FilterProps {
  availableSizes: Set<number>; // Определяем интерфейс FilterProps с пропсом availableSizes для типизации входных данных компонента.
}

export const Filter: React.FC<FilterProps> = ({ availableSizes }) => {
  const sneakers = useSelector(sneakersSelector); // Получаем данные о кроссовках из Redux с помощью селектора sneakersSelector.
  const filtersState = useSelector(filtersSelector); // Получаем текущее состояние фильтров из Redux с помощью селектора filtersSelector.

  const [filters, setFilters] = useState({
    // Создаем состояние filters с начальным значением из filtersState. Состояние содержит информацию о цене, размере и поле (пол).
    price: filtersState.price,
    size: filtersState.size?.slice() || [],
    gender: {
      female: filtersState.gender.female,
      male: filtersState.gender.male,
    },
  });
  const updateStateFilters = (filters: Partial<FiltersState>) => {
    // Функция для обновления состояния фильтров.
    setFilters((state) => ({
      ...state, // Сохраняем текущее состояние.
      ...filters, // Обновляем его новыми значениями.
    }));
  };

  const dispatch = useDispatch(); // Получаем функцию dispatch для отправки действий в Redux.

  let minPrice = 0;
  let maxPrice = 0;

  sneakers.data.forEach((s) => {
    // Перебираем массив кроссовок для определения минимальной и максимальной цены.
    if (!minPrice || s.price < minPrice) {
      minPrice = s.price; // Обновляем минимальную цену.
    }

    if (!maxPrice || s.price > maxPrice) {
      maxPrice = s.price; // Обновляем максимальную цену.
    }
  });

  // Устанавливаем текущие значения минимальной и максимальной цены. Если они не заданы в фильтрах, используем minPrice и maxPrice.
  const currentMin = filters.price.min ?? minPrice;
  const currentMax = filters.price.max ?? maxPrice;

  // Создаем состояния inputMin и inputMax для хранения значений полей ввода цен.
  const [inputMin, setInputMin] = useState(currentMin);
  const [inputMax, setInputMax] = useState(currentMax);

  const submitInputValues = () => {
    // Функция для обновления фильтров на основе введенных значений цен.
    updateStateFilters({
      price: {
        min: Math.max(minPrice, inputMin), // Устанавливаем минимальную цену.
        max: Math.min(maxPrice, inputMax), // Устанавливаем максимальную цену.
      },
    });
  };

  const changeSizeFilter = (size: number, selected: boolean) => {
    // Функция для изменения фильтра по размеру кроссовок.
    let newSizes = filters.size.slice() || []; // Копируем текущие размеры фильтра.

    if (!selected) {
      newSizes = newSizes.filter((s) => s !== size); // Удаляем размер, если он был снят с выбора.
    } else {
      newSizes.push(size); // Добавляем размер в массив выбранных размеров.
    }
    updateStateFilters({
      size: newSizes, // Обновляем состояние фильтров с новыми размерами.
    });
  };

  const onSliderUpdate = (data: number[]) => {
    // Функция обратного вызова при изменении положения слайдера.
    const minValue = Math.floor(Number(data[0])); // Получаем минимальное значение из данных слайдера.
    const maxValue = Math.ceil(Number(data[1])); // Получаем максимальное значение из данных слайдера.
    setInputMin(minValue); // Обновляем состояние inputMin.
    setInputMax(maxValue); // Обновляем состояние inputMax.
  };

  const onSliderSet = (data: number[]) => {
    // Функция обратного вызова при установке значений слайдера.
    const minValue = Math.floor(Number(data[0])); // Получаем минимальное значение из данных слайдера.
    const maxValue = Math.ceil(Number(data[1])); // Получаем максимальное значение из данных слайдера.
    updateStateFilters({
      price: {
        min: minValue, // Обновляем минимальную цену в состоянии фильтров.
        max: maxValue, // Обновляем максимальную цену в состоянии фильтров.
      },
    });
  };

  const submitFilters = () => {
    // Функция для отправки текущих фильтров в Redux.
    dispatch(updateFilters(filters)); // Отправляем действие обновления фильтров.
    dispatch(resetLimit()); // Сбрасываем лимит отображаемых товаров.
  };

  const reset = () => {
    // Функция для сброса всех фильтров к исходным значениям.
    dispatch(clearFilters()); // Отправляем действие очистки фильтров.
    setFilters(filtersState); // Сбрасываем локальные фильтры к исходному состоянию.
  };

  useEffect(() => {
    setInputMin(filters.price.min ?? minPrice); // Обновляем inputMin при изменении минимальной цены в фильтрах.
    setInputMax(filters.price.max ?? maxPrice); // Обновляем inputMax при изменении максимальной цены в фильтрах.
  }, [filters.price.min, filters.price.max]);

  useEffect(() => {
    setFilters(filtersState); // Обновляем локальные фильтры при изменении состояния фильтров в Redux.
  }, [filtersState]);

  return (
    <div className={styles.filterBlock}>
      <h3>
        Подбор <br />
        по параметрам
      </h3>
      <div className={styles.filterPrice}>
        <p>Цена, руб</p>
        <div className={styles.filterPriceContent}>
          <div className={styles.price}>
            <label htmlFor="minPrice">
              <input
                title="Минимальная цена"
                id="minPrice"
                value={inputMin}
                type="number"
                onChange={(event) => {
                  setInputMin(Number(event.target.value)); // Обновляем состояние inputMin при изменении значения
                }}
                onBlur={submitInputValues} // Вызываем submitInputValues при потере фокуса
                onSubmit={submitInputValues}
                disabled // Отключаем поле ввода
              />
            </label>
            <span></span>
            <label htmlFor="maxPrice">
              <input
                title="Максимальная цена"
                id="maxPrice"
                value={inputMax}
                type="number"
                onChange={(event) => {
                  setInputMax(Number(event.target.value)); // Обновляем состояние inputMax при изменении значения
                }}
                onBlur={submitInputValues} // Вызываем submitInputValues при потере фокуса
                onSubmit={submitInputValues}
                disabled // Отключаем поле ввода
              />
            </label>
          </div>
          <Nouislider
            range={{
              min: minPrice, // Устанавливаем минимальное значение слайдера равным minPrice.
              max: maxPrice, // Устанавливаем максимальное значение слайдера равным maxPrice.
            }}
            start={[currentMin, currentMax]} // Устанавливаем начальные значения слайдера равными текущим минимальному и максимальному значениям.
            orientation="horizontal" // Указываем, что слайдер будет горизонтальным.
            onSlide={onSliderUpdate} // Указываем функцию onSliderUpdate, которая будет вызываться при изменении положения слайдера.
            onSet={onSliderSet} // Указываем функцию onSliderSet, которая будет вызываться при установке значений слайдера.
            connect // Указываем, что слайдер будет соединять две точки (минимум и максимум).
          />
        </div>
      </div>
      <div className={styles.genderContent}>
        Пол
        <div>
          <input
            className={styles.customRadio}
            type="radio"
            id="male"
            name="gender"
            checked={filters.gender.male}
            onChange={() => {
              updateStateFilters({
                // Обновляем состояние фильтров при изменении радиокнопки.
                gender: {
                  male: true,
                  female: false,
                },
              });
            }}
          />
          <label className={styles.checkboxLabel} htmlFor="male">
            мужской
          </label>
          <input
            className={styles.customRadio}
            type="radio"
            id="female"
            name="gender"
            checked={filters.gender.female}
            onChange={() => {
              updateStateFilters({
                // Обновляем состояние фильтров при изменении радиокнопки.
                gender: {
                  female: true,
                  male: false,
                },
              });
            }}
          />
          <label className={styles.checkboxLabel} htmlFor="female">
            женский
          </label>
        </div>
      </div>
      <div className={styles.choisSizes}>
        Размер
        <div className={styles.gridContainer}>
          <div>
            {SIZES.map((size) => (
              <Size
                key={size} // Устанавливаем уникальный ключ для каждого компонента Size на основе размера.
                label={size} // Передаем размер как метку в компонент Size.
                onClick={changeSizeFilter} // Указываем функцию changeSizeFilter для обработки клика по размеру.
                selected={filters.size.includes(size)} // Проверяем, выбран ли размер в текущих фильтрах и передаем результат в качестве пропса selected.
                disabled={!availableSizes.has(size)} // Отключаем размер, если он недоступен (не входит в availableSizes).
              />
            ))}
          </div>
        </div>
      </div>

      <button className={styles.applyBtn} onClick={submitFilters}>
        Применить
      </button>
      <div className={styles.containerResetBtn}>
        <button onClick={reset}>cбросить</button>
      </div>
    </div>
  );
};
