import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { sneakerSelector } from "../../Redux/sneaker/sneakerSelector";
import { useAppDispatch } from "../../Redux/store";
import "./styles.css";
import { getSneaker } from "../../api/sneaker";
import GalochkaSvg from "../../assets/icons/galochka.svg?react";

export const SneakerPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSelector(sneakerSelector);

  useEffect(() => {
    dispatch(getSneaker(id));
  }, [id]);

  useEffect(() => {
    const headerElement = document.querySelector("header");
    const footerElement = document.querySelector("footer");

    if (!isLoading) {
      // Добавляем класс no-pointer к header при загрузке
      if (headerElement && footerElement) {
        headerElement.classList.add("no-pointer");
        footerElement.classList.add("no-pointer");
      }
    } else {
      // Убираем класс no-pointer от header после загрузки
      if (headerElement && footerElement) {
        headerElement.classList.remove("no-pointer");
        footerElement.classList.remove("no-pointer");
      }
    }

    // Убираем класс при возвращении
    return () => {
      if (headerElement && footerElement) {
        headerElement.classList.remove("no-pointer");
        footerElement.classList.remove("no-pointer");
      }
    };
  }, [isLoading]);

  const handleBgClick = () => {
    navigate("/Vkrb/"); // Переход на главную страницу
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
                  <li key={id}>{number}</li>
                ))}
              </ul>
              <p className="price">
                <span>{data.price}</span>
                <span>{data.oldPrice}</span>
              </p>
              <button>Заказать</button>
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
