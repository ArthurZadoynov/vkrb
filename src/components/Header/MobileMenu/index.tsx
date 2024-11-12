import styles from "./styles.module.css";
import { BurgerMenu } from "../BurgerMenu";
import { useState } from "react";

interface DesktopMenuProps {
  openModal: () => void;
  data?: any[];
}

export const MobileMenu: React.FC<DesktopMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className={styles.wrapper}>
          <nav>
            <a href="#catalog">Каталог</a>
            <a href="#about">О нас</a>
            <a href="#selection">Подбор товара</a>
            <a href="#team">Наша команда</a>
            <a href="#faqs">Вопросы</a>
            <a href="#contact">Контакты</a>
          </nav>
        </div>
      )}
    </div>
  );
};
