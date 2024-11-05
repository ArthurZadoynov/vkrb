import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useIsMobile } from "../../hooks/useMobile";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sneakersSelector } from "../../Redux/sneakers/sneakersSelector";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    isOpen && (
      <div className={styles.modal} onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    )
  );
};

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSelector(sneakersSelector);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isMobile = useIsMobile();
  return (
    <header>
      <span></span>
      <div className={styles.container}>
        <Link to="/Vkrb">
          <img src={logo} alt="logo" />
        </Link>
        {isMobile ? (
          <MobileMenu />
        ) : (
          <DesktopMenu openModal={openModal} data={data} />
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className={styles.modalContent}>
            <div className={styles.sneakerBasket}>
              {data?.map((item) => {
                const { imgUrl, gender, title, price } = item;
                return (
                  <div className={styles.sneakerBlock}>
                    <div>
                      <img src={imgUrl} alt="sneaker" />
                    </div>
                    <div className={styles.sneakerContentBlock}>
                      <p>{gender}</p>
                      <p>{title}</p>
                      <p>{price}</p>
                    </div>
                    <button>Удалить</button>
                  </div>
                );
              })}
            </div>
            <div className={styles.bottomModal}>
              <p>
                Итого: <span>12312</span>
              </p>
              <button>Перейти в корзину</button>
            </div>
          </div>
        </Modal>
      </div>
    </header>
  );
};
