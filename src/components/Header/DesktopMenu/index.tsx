import { Link } from "react-router-dom";

export const DesktopMenu = () => {
  return (
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
  );
};
