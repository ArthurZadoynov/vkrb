import styles from "./styles.module.css";
import { Sneaker } from "../../../types";
import { Link } from "react-router-dom";
import Bucket from "../../../assets/icons/bucket.svg?react";
import { useEffect } from "react";
import { useAppDispatch } from "../../../Redux/store";
import { fetchBasket, removeItem } from "../../../api/basket";

interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  data: Sneaker[];
}

const getNewGender = (gender: string) => {
  switch (gender) {
    case "Мужской":
      return "Мужские";
    case "Женский":
      return "Женские";
    default:
      return gender;
  }
};

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modal} onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </>
  );
};

export const ModalWindow: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const dispatch = useAppDispatch();

  const handleRemove = async (id: number): Promise<void> => {
    dispatch(removeItem(id));
  };

  useEffect(() => {
    dispatch(fetchBasket());
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.bgSneakerBlock}>
          <div className={styles.sneakerBasket}>
            {data?.map((item) => {
              const { imgUrl, gender, title, price, id } = item;
              return (
                <div className={styles.sneakerBlock} key={id}>
                  <div>
                    <img src={imgUrl} alt="sneaker" />
                    <div className={styles.sneakerContentBlock}>
                      <p>
                        {getNewGender(gender)} кроссовки {title}
                      </p>
                      <span>{price.toLocaleString("ru-RU")} &#8381;</span>
                    </div>
                  </div>
                  <button title="bucket" onClick={() => handleRemove(id)}>
                    <Bucket />
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.bottomModal}>
            <p>
              Итого:
              <span>
                {data
                  .reduce((acc, item) => acc + item.price, 0)
                  .toLocaleString("ru-RU")}{" "}
                &#8381;
              </span>
            </p>
            <Link
              to={`/Vkrb/basket`}
              onClick={onClose}
              className={styles.wrapperBasket}
            >
              <button>Перейти в корзину</button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
