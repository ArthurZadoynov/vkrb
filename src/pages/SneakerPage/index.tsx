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
  const [selected, setSelected] = useState(false);
  const changeSelectedHandler = () => {
    setSelected(!selected);
  };
  return (
    <li
      onClick={changeSelectedHandler}
      className={`${selected ? styles.selected : ""}`}
    >
      {number}
    </li>
  );
};

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

    if (headerElement && footerElement) {
      headerElement.classList.toggle("no-pointer", !isLoading);
      footerElement.classList.toggle("no-pointer", !isLoading);
    }

    return () => {
      if (headerElement && footerElement) {
        headerElement.classList.remove("no-pointer");
        footerElement.classList.remove("no-pointer");
      }
    };
  }, [isLoading]);

  const handleBgClick = () => {
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
                  <SizeSelected number={number} key={id} />
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
