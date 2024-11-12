import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import { basketSelector } from "../../Redux/basket/basketSelector";
import { useAppDispatch } from "../../Redux/store";
import "./styles.css";
import { clearBasket, fetchBasket, removeItem } from "../../api/basket";
import { BasketCard } from "../../components/BasketCard";
import {
  handlePhoneInput,
  handlePhoneKeyDown,
} from "../../components/FormNumberValue";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormType, postDataOrder } from "../../api/orderPost";

export const BasketPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSelector(basketSelector);

  const orderNumber = generateRandomOrderNumber();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

  function generateRandomOrderNumber() {
    return Math.floor(Math.random() * 10000000);
  }
  const message = `Заказ успешно оформлен. Номер Вашего заказа ${orderNumber}`;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await postDataOrder(data);
      await dispatch(clearBasket());
      reset();
      alert(message);
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchBasket());
  }, []);

  const handleRemove = async (id: number): Promise<void> => {
    await dispatch(removeItem(id));
  };

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
        <div className="basket_container">
          <div className="basketTitle">
            <h3>Оформление заказа</h3>
            <span className="numOrder">{orderNumber}</span>
          </div>
          <div className="basket">
            <div className="topContent">
              <div className="topContentInfo">
                <span>
                  Товаров в заказе: <span>{data.length}</span>
                </span>
                <span>
                  Общая сумма заказа:{" "}
                  <span>
                    {data
                      .reduce((acc, item) => acc + item.price, 0)
                      .toLocaleString("ru-RU")}{" "}
                    &#8381;
                  </span>
                </span>
                <span>Состав заказа</span>
              </div>
              <div className="basketCard">
                {data.map((item) => (
                  <BasketCard
                    key={`team_item_${item.id}`}
                    data={item}
                    handleRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Ваше имя"
                {...register("user_name", {
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  minLength: {
                    value: 2,
                    message: "Имя должно содержать не менее 2 символов",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "Имя должно содержать не более не более 30 символов",
                  },
                })}
              />
              {errors.user_name && <p>{errors.user_name.message}</p>}
            </label>
            <label>
              <input
                type="tel"
                placeholder="Номер телефона"
                {...register("user_telephone", {
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  minLength: {
                    value: 16,
                    message: "Телефон должен иметь не менее 16 символов",
                  },
                  maxLength: {
                    value: 25,
                    message: "Телефон не более 25 символов",
                  },
                })}
                onInput={handlePhoneInput}
                onKeyDown={handlePhoneKeyDown}
              />
              {errors.user_telephone && <p>{errors.user_telephone.message}</p>}
            </label>
            <label>
              <input
                type="email"
                placeholder="E-mail"
                {...register("user_email", {
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                  minLength: {
                    value: 5,
                    message: "Email адрес должен иметь не менее 5 символов",
                  },
                  maxLength: {
                    value: 30,
                    message: "Email адрес должен быть не более 30 символов",
                  },
                })}
              />
              {errors.user_email && <p>{errors.user_email.message}</p>}
            </label>
            <input type="submit" value="Оформить заказ" />
          </form>
        </div>
      )}
      <span className="bg" onClick={handleBgClick}></span>
      {isError && <Error />}
    </>
  );
};
