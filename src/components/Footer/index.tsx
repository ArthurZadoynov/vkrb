import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <Link to="/Vkrb">
          <img src={logo} alt="logo" />
        </Link>
        <nav className={styles.navFooter}>
          <a href="#catalog">Каталог</a>
          <a href="#about">О нас</a>
          <a href="#selection">Подбор товара</a>
          <a href="#team">Наша команда</a>
          <a href="#faqs">Вопросы</a>
          <a href="#contact">Контакты</a>
        </nav>
      </div>
    </footer>
  );
};
