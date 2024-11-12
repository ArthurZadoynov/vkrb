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

const SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43];

interface FilterProps {
  availableSizes: Set<number>;
}

export const Filter: React.FC<FilterProps> = ({ availableSizes }) => {
  const sneakers = useSelector(sneakersSelector);
  const filtersState = useSelector(filtersSelector);

  const [filters, setFilters] = useState({
    price: filtersState.price,
    size: filtersState.size?.slice() || [],
    gender: {
      female: filtersState.gender.female,
      male: filtersState.gender.male,
    },
  });
  const updateStateFilters = (filters: Partial<FiltersState>) => {
    setFilters((state) => ({
      ...state,
      ...filters,
    }));
  };

  const dispatch = useDispatch();

  let minPrice = 0;
  let maxPrice = 0;

  sneakers.data.forEach((s) => {
    if (!minPrice || s.price < minPrice) {
      minPrice = s.price;
    }

    if (!maxPrice || s.price > maxPrice) {
      maxPrice = s.price;
    }
  });

  const currentMin = filters.price.min ?? minPrice;
  const currentMax = filters.price.max ?? maxPrice;

  const [inputMin, setInputMin] = useState(currentMin);
  const [inputMax, setInputMax] = useState(currentMax);

  const submitInputValues = () => {
    updateStateFilters({
      price: {
        min: Math.max(minPrice, inputMin),
        max: Math.min(maxPrice, inputMax),
      },
    });
  };

  const changeSizeFilter = (size: number, selected: boolean) => {
    let newSizes = filters.size.slice() || [];

    if (!selected) {
      newSizes = newSizes.filter((s) => s !== size);
    } else {
      newSizes.push(size);
    }
    console.log("newSizes", newSizes);
    updateStateFilters({
      size: newSizes,
    });
  };

  const onSliderUpdate = (data: number[]) => {
    const minValue = Math.floor(Number(data[0]));
    const maxValue = Math.ceil(Number(data[1]));
    setInputMin(minValue);
    setInputMax(maxValue);
  };

  const onSliderSet = (data: number[]) => {
    const minValue = Math.floor(Number(data[0]));
    const maxValue = Math.ceil(Number(data[1]));
    updateStateFilters({
      price: {
        min: minValue,
        max: maxValue,
      },
    });
  };

  const submitFilters = () => {
    dispatch(updateFilters(filters));
    dispatch(resetLimit());
  };

  const reset = () => {
    dispatch(clearFilters());
    setFilters(filtersState);
  };

  useEffect(() => {
    setInputMin(filters.price.min ?? minPrice);
    setInputMax(filters.price.max ?? maxPrice);
  }, [filters.price.min, filters.price.max]);

  useEffect(() => {
    setFilters(filtersState);
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
                  setInputMin(Number(event.target.value));
                }}
                onBlur={submitInputValues}
                onSubmit={submitInputValues}
                disabled
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
                  setInputMax(Number(event.target.value));
                }}
                onBlur={submitInputValues}
                onSubmit={submitInputValues}
                disabled
              />
            </label>
          </div>
          <Nouislider
            range={{
              min: minPrice,
              max: maxPrice,
            }}
            start={[currentMin, currentMax]}
            orientation="horizontal"
            onSlide={onSliderUpdate}
            onSet={onSliderSet}
            connect
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
                key={size}
                label={size}
                onClick={changeSizeFilter}
                selected={filters.size.includes(size)}
                disabled={!availableSizes.has(size)}
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
