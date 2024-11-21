import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { handlePhoneInput, handlePhoneKeyDown } from "../FormNumberValue";
import { postData } from "../../api/userPost";
import logoInstagram from "../../images/logoInstagram.png";
import InstagramImage1 from "../../images/InstagramImage1.png";
import InstagramImage2 from "../../images/InstagramImage2.png";
import InstagramImage3 from "../../images/InstagramImage3.png";
import InstagramImage4 from "../../images/InstagramImage4.png";
import InstagramImage5 from "../../images/InstagramImage5.png";

export type FormType = {
  user_name: string;
  user_telephone: string;
};

export const MainSectionQuestionsForm = () => {
  // Инициализируем хук useForm для управления состоянием формы
  const {
    register, // Метод для регистрации полей ввода
    handleSubmit, // Метод для обработки отправки формы
    reset, // Метод для сброса формы
    formState: { errors }, // Объект состояния формы с ошибками валидации
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    // Функция, вызываемая при успешной отправке формы
    postData(data); // Отправляет данные формы на сервер
    reset(); // Сбрасывает поля формы после отправки
  };

  return (
    <section id="questions" className={styles.containerQuestions}>
      <div>
        <div>
          <div className={styles.leftContent}>
            <h2>Есть вопросы?</h2>
            <p>Заполните форму и наш менеджер свяжется с вами</p>
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
                {errors.user_telephone && (
                  <p>{errors.user_telephone.message}</p>
                )}
              </label>
              <input type="submit" />
            </form>
          </div>
          <div className={styles.rightContent}>
            <img src={logoInstagram} alt="Логотип Instagram" />
            <div>
              <img
                className={styles.InstagramImage1}
                src={InstagramImage1}
                alt="Фото из Instagram"
              />
              <img
                className={styles.InstagramImage2}
                src={InstagramImage2}
                alt="Фото из Instagram"
              />
              <img
                className={styles.InstagramImage3}
                src={InstagramImage3}
                alt="Фото из Instagram"
              />
              <img
                className={styles.InstagramImage4}
                src={InstagramImage4}
                alt="Фото из Instagram"
              />
              <img
                className={styles.InstagramImage5}
                src={InstagramImage5}
                alt="Фото из Instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
