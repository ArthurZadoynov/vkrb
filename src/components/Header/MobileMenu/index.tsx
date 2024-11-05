import { BurgerMenu } from "../BurgerMenu";
import { useState } from "react";
import styles from "./styles.module.css";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className={styles.wrapper}>
          <ul>
            <li>
              <a onClick={handleLinkClick} href="#catalog">
                Каталог
              </a>
            </li>
            <li>
              <a onClick={handleLinkClick} href="#about">
                О нас
              </a>
            </li>
            <li>
              <a onClick={handleLinkClick} href="#selection">
                Подбор товара
              </a>
            </li>
            <li>
              <a onClick={handleLinkClick} href="#team">
                Наша команда
              </a>
            </li>
            <li>
              <a onClick={handleLinkClick} href="#faqs">
                Вопросы
              </a>
            </li>
            <li>
              <a onClick={handleLinkClick} href="#contact">
                Контакты
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
