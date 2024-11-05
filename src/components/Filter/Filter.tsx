import { useEffect, useReducer, useState } from 'react';
import Nouislider from 'nouislider-react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSelector } from '../../Redux/filters/filterSelector';
import { updateFilters, clearFilters } from '../../Redux/filters/filterSlice';
import { sneakersSelector } from '../../Redux/sneakers/sneakersSelector';

import { Size } from './Size';
import { FiltersState } from '../../types/state';

import "nouislider/distribute/nouislider.css";

const SIZES = [35, 36, 37, 38, 39, 40, 41, 42];

export const Filter: React.FC = () => {
    const sneakers = useSelector(sneakersSelector);
    const filtersState = useSelector(filtersSelector);

    const [filters, setFilters] = useState({
        price: filtersState.price,
        size: filtersState.size?.slice() || [],
        gender: {
            female: filtersState.gender.female,
            male: filtersState.gender.male,
        },
    })
    const updateStateFilters = (filters: Partial<FiltersState>) => {
        setFilters((state) => ({
            ...state,
            ...filters
        }))
    }

    const dispatch = useDispatch();

    let minPrice = 0;
    let maxPrice = 0;

    sneakers.data.forEach(s => {
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
            }
        })
    }

    const changeSizeFilter = (size: number, selected: boolean) => {
        let newSizes = filters.size.slice() || [];

        if (!selected) {
            newSizes = newSizes.filter(s => s !== size);
        } else {
            newSizes.push(size);
        }

        updateStateFilters({
            size: newSizes
        })
    }

    const onSliderUpdate = (data: number[]) => {
        updateStateFilters({
            price: {
                min: data[0],
                max: data[1],
            }
        })
    }

    const submitFilters = () => {
        dispatch(updateFilters(filters));
    }

    const reset = () => {
        dispatch(clearFilters());
        setFilters(filtersState)
    }

    useEffect(() => {
        setInputMin(filters.price.min ?? minPrice);
        setInputMax(filters.price.max ?? maxPrice);
    }, [filters.price.min, filters.price.max]);

    useEffect(() => {
        setFilters(filtersState)
    }, [filtersState]);

    return (
        <div>
            <p>Подбор по параметрам</p>
            <div>
                <input value={inputMin} type='number' onChange={(event) => {
                    setInputMin(Number(event.target.value));
                }} onBlur={submitInputValues} onSubmit={submitInputValues} />
                <input value={inputMax} type='number' onChange={(event) => {
                    setInputMax(Number(event.target.value));
                }} onBlur={submitInputValues} onSubmit={submitInputValues} />
                <Nouislider
                    range={{
                        min: minPrice,
                        max: maxPrice,
                    }}
                    start={[
                        currentMin,
                        currentMax,
                    ]}
                    orientation='horizontal'
                    onSet={onSliderUpdate}
                    onEnd={onSliderUpdate}
                    connect
                />
                <div>
                    Пол
                    <label>
                        <input type='checkbox' checked={filters.gender.male} onChange={(event) => {
                            updateStateFilters({
                                gender: {
                                    male: event.target.checked,
                                    female: filters.gender.female
                                }
                            })
                        }} />
                        Мужские
                    </label>
                    <label>
                        <input type='checkbox' checked={filters.gender.female} onChange={(event) => {
                            updateStateFilters({
                                gender: {
                                    female: event.target.checked,
                                    male: filters.gender.male
                                }
                            })
                        }} />
                        Женские
                    </label>
                </div>
                <div>
                    Размер
                    {SIZES.map(size => (
                        <Size key={size} label={size} onClick={changeSizeFilter} selected={filters.size.includes(size)} />
                    ))}

                </div>
            </div>

            <button onClick={submitFilters}>Применить</button>
            <button onClick={reset}>Сбросить</button>
        </div>
    );
}