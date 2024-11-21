import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useIsMobile } from "../../hooks/useMobile";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ModalWindow } from "./ModalBasketHeader";
import BasketSvg from "../../assets/icons/basket.svg?react";
import { basketSelector } from "../../Redux/basket/basketSelector";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Создаем состояние isModalOpen для управления открытием и закрытием модального окна, начальное значение - false.
  const { data } = useSelector(basketSelector); // Используем селектор basketSelector для получения данных о корзине из Redux.

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isMobile = useIsMobile(); // Используем хук useIsMobile для определения, является ли текущее устройство мобильным.

  return (
    <header>
      <span></span>
      <div className={styles.bg}>
        <div className={styles.bgHeader}>
          <div className={styles.container}>
            <Link to="/Vkrb">
              <img src={logo} alt="logo" />
            </Link>
            <div className={styles.navHeader}>
              {isMobile ? (
                <MobileMenu openModal={openModal} data={data} />
              ) : (
                <DesktopMenu openModal={openModal} data={data} />
              )}
              <button className={styles.basket} onClick={openModal}>
                Корзина <BasketSvg />
                <span>{data ? data.length : null}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalWindow isOpen={isModalOpen} onClose={closeModal} data={data} />
    </header>
  );
};
