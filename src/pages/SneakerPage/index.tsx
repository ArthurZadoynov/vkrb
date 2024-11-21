import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { sneakerSelector } from "../../Redux/sneaker/sneakerSelector";
import { useAppDispatch } from "../../Redux/store";
import "./styles.css";
import styles from "./styles.module.css";
import { getSneaker } from "../../api/sneaker";
import GalochkaSvg from "../../assets/icons/galochka.svg?react";
import { postBasket } from "../../api/basket";

interface SizeSelectedProps {
  number: number;
}

const SizeSelected: React.FC<SizeSelectedProps> = ({ number }) => {
  const [selected, setSelected] = useState(false); // Хранит состояние выбранного размера (по умолчанию false)
  const changeSelectedHandler = () => {
    // Функция для изменения состояния 'selected' при клике
    setSelected(!selected); // Меняет состояние на противоположное
  };
  return (
    <li
      onClick={changeSelectedHandler} // Обработчик события клика
      className={`${selected ? styles.selected : ""}`} // Применяет класс 'selected', если размер выбран
    >
      {number}
    </li>
  );
};

export const SneakerPage = () => {
  // Основной компонент страницы кроссовок
  const { id } = useParams() as { id: string }; // Получает параметр 'id' из URL
  const dispatch = useAppDispatch(); // Получает функцию dispatch из Redux
  const navigate = useNavigate(); // Получает функцию для навигации по страницам
  const { data, isLoading, isError } = useSelector(sneakerSelector); // Получает данные о кроссовках, состояние загрузки и ошибки из Redux

  useEffect(() => {
    // Эффект, который выполняется при изменении 'id'
    dispatch(getSneaker(id)); // Запрашивает данные о кроссовках по 'id'
  }, [id]);

  useEffect(() => {
    // Эффект, который управляет состоянием указателей на header и footer в зависимости от загрузки
    const headerElement = document.querySelector("header");
    const footerElement = document.querySelector("footer");

    if (headerElement && footerElement) {
      // Добавляет/убирает класс 'no-pointer' в зависимости от состояния загрузки
      headerElement.classList.toggle("no-pointer", !isLoading);
      footerElement.classList.toggle("no-pointer", !isLoading);
    }

    return () => {
      if (headerElement && footerElement) {
        // Возвращает функцию очистки, которая убирает класс при размонтировании компонента
        headerElement.classList.remove("no-pointer");
        footerElement.classList.remove("no-pointer");
      }
    };
  }, [isLoading]);

  const handleBgClick = () => {
    // Обработчик клика для фона, который перенаправляет на главную страницу
    navigate("/Vkrb/");
  };

  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <div className="sneaker_container">
          <div className="content">
            <img src={data.imgUrl} alt="" />
            <div className="rightContent">
              <span>Артикул: {data.vendorСode}</span>
              <span className="inStock">
                В наличии: <span>{data.inStock} шт</span>
              </span>
              <h2>Кроссовки {data.title}</h2>
              <div className="stars">
                <span>
                  {Array.from({ length: data.stars }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
              </div>
              <p className="size">Выберите размер:</p>
              <ul>
                {data.sizes.map((number, id) => (
                  // Отображает список доступных размеров
                  <SizeSelected number={number} key={id} /> // Использует компонент SizeSelected для каждого размера
                ))}
              </ul>
              <p className="price">
                <span>{data.price}</span>
                <span>{data.oldPrice}</span>
              </p>
              <Link to={`/Vkrb/basket`}>
                <button onClick={() => dispatch(postBasket(data))}>
                  Заказать
                </button>
              </Link>

              <div className="order">
                <span>
                  <GalochkaSvg /> Бесплатная доставка до двери{" "}
                </span>
                <span>
                  <GalochkaSvg /> Оплата заказа при получении
                </span>
                <span>
                  <GalochkaSvg /> Обмен в течении двух недель
                </span>
              </div>
            </div>
          </div>
          <div className="bottomContent">
            <div className="description">
              <h3>Описание</h3>
              <p>{data.description}</p>
            </div>
            <div className="specifications">
              <h3>Характеристики</h3>
              <p>Пол: {data.gender}</p>
              <p>Цвета: {data.color}</p>
              <p>Состав: {data.compound}</p>
              <p>Страна: {data.country}</p>
            </div>
          </div>
        </div>
      )}
      <span className="bg" onClick={handleBgClick}></span>
      {isError && <Error />}
    </>
  );
};
