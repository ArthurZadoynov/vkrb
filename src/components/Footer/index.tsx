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
        <ul>
          <li>
            <a href="#catalog">Каталог</a>
          </li>
          <li>
            <a href="#about">О нас</a>
          </li>
          <li>
            <a href="#selection">Подбор товара</a>
          </li>
          <li>
            <a href="#team">Наша команда</a>
          </li>
          <li>
            <a href="#faqs">Вопросы</a>
          </li>
          <li>
            <a href="#contact">Контакты</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
