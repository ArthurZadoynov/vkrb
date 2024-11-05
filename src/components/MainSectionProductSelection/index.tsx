import styles from "./styles.module.css";
import { ProductSelection, SizeSelection } from "../ProductSelection";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import slide2Selection from "../../images/slide2Selection.png";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button className={styles.nextBtn} onClick={() => swiper.slideNext()}>
      Следующий шаг
    </button>
  );
}

type FormType = {
  user_name: string;
  user_email: string;
};

export const MainSectionProductSelection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = () => {
    alert(
      "Спасибо за уделенное время, подготовленный каталог отправили на указанный вами Email"
    );
    reset();
  };

  const [currentIndex, setCurrenIndex] = useState(0);

  return (
    <section id="selection" className={styles.containerProductSelection}>
      <div className={styles.sectionSelection}>
        <h2>
          {currentIndex === 3
            ? "Ваша подборка готова!"
            : "Мы подберем идеальную пару для вас"}
        </h2>
        <p>
          {currentIndex === 3
            ? "Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог!"
            : "Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями"}
        </p>
        <span className={styles.topBorder}></span>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          allowTouchMove={false}
          simulateTouch={false}
          onSlideChange={(swiper) => setCurrenIndex(swiper.activeIndex)}
        >
          <SwiperSlide>
            <h3>Какой тип кроссовок рассматриваете?</h3>
            <div className={styles.infoSelection}>
              <ProductSelection id="chk1" />
              <ProductSelection id="chk2" />
              <ProductSelection id="chk3" />
              <ProductSelection id="chk4" />
              <ProductSelection id="chk5" />
              <ProductSelection id="chk6" />
            </div>
            <span className={styles.bottomBorder}></span>
            <div className={styles.nextStep}>
              <span>1 из 3</span>
              <SlideNextButton />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide2}>
              <h3>Какой размер вам подойдет?</h3>
              <div>
                <div>
                  <SizeSelection id="size1" text="менее 36" />
                  <SizeSelection id="size2" text="36-38" />
                  <SizeSelection id="size3" text="39-41" />
                  <SizeSelection id="size4" text="42-44" />
                  <SizeSelection id="size5" text="45 и больше" />
                </div>
                <img src={slide2Selection} alt="Кеды" />
              </div>
            </div>
            <span className={styles.bottomBorder}></span>
            <div className={styles.nextStep}>
              <span>2 из 3</span>
              <SlideNextButton />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide3}>
              <h3>Уточните какие-либо моменты</h3>
              <div>
                <label htmlFor="textField">
                  <textarea
                    className={styles.field}
                    name="textField"
                    id="textField"
                    rows={13}
                    cols={52}
                    maxLength={1000}
                    placeholder="Введите сообщение до 1000 символов"
                  ></textarea>
                </label>
              </div>
            </div>
            <span className={styles.bottomBorder}></span>
            <div className={styles.nextStep}>
              <span>3 из 3</span>
              <SlideNextButton />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.orderForm}>
              <div>
                <h2>Получить предложение</h2>
                <p>Получите подборку подходящих для вас моделей на почту</p>
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
                      })}
                    />
                    {errors.user_name && <p>{errors.user_name.message}</p>}
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
                          message:
                            "Email адрес должен иметь не менее 5 символов",
                        },
                        maxLength: {
                          value: 30,
                          message:
                            "Email адрес должен быть не более 30 символов",
                        },
                      })}
                    />
                    {errors.user_email && <p>{errors.user_email.message}</p>}
                  </label>
                  <input type="submit" />
                </form>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
