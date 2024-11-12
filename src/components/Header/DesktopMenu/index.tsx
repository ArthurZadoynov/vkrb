import styles from "./styles.module.css";

interface DesktopMenuProps {
  openModal: () => void;
  data?: any[];
}

export const DesktopMenu: React.FC<DesktopMenuProps> = () => {
  return (
    <nav className={styles.nav}>
      <a href="#catalog">Каталог</a>
      <a href="#about">О нас</a>
      <a href="#selection">Подбор товара</a>
      <a href="#team">Наша команда</a>
      <a href="#faqs">Вопросы</a>
      <a href="#contact">Контакты</a>
    </nav>
  );
};
