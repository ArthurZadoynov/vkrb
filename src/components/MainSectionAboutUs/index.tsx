import styles from "./styles.module.css";
import logo from "../../images/logo.png";
import about from "../../images/aboutUs.png";
import EllipseAboutSvg from "../../assets/icons/ellipseAbout.svg?react";

export const MainSectionAboutUs = () => {
  return (
    <section id="about" className={styles.containerAbout}>
      <EllipseAboutSvg />
      <div className={styles.aboutContent}>
        <div className={styles.aboutUs}>
          <div className={styles.aboutText}>
            <h2>Пара слов о нас</h2>
            <p>
              Спорт держит нас в форме. Учит дисциплине. Объединяет нас. Через
              спорт мы можем менять жизни. В том числе с помощью воодушевляющих
              историй спортсменов. Чтобы помочь тебе подняться и двигаться
              вперед.
            </p>
            <div className={styles.logoAboutUs}>
              <span></span>
              <img src={logo} alt="logo" />
            </div>
          </div>
          <img src={about} alt="фото парня с крутыми кроссовками" />
        </div>
      </div>
    </section>
  );
};
