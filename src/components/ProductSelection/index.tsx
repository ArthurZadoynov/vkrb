import styles from "./styles.module.css";
import PhotoSneaker from "../../images/photoSneaker.jpg";
import { FC } from "react";

type Props = {
  id: string;
};

type SizeProps = {
  id: string;
  text: string;
};

export const ProductSelection: FC<Props> = ({ id }) => {
  return (
    <div className={styles.selectionItems}>
      <img src={PhotoSneaker} alt="" />
      <span>
        <input
          type="checkbox"
          className={styles.customCheckbox}
          name="sneakers"
          id={id}
        />
        <label className={styles.checkboxLabel} htmlFor={id}></label>
        <span>кеды</span>
      </span>
    </div>
  );
};

export const SizeSelection: FC<SizeProps> = ({ id, text }) => {
  return (
    <div className={styles.selectionSize}>
      <span>
        <input
          type="checkbox"
          className={styles.customCheckbox}
          name="size"
          id={id}
        />
        <label className={styles.checkboxLabel} htmlFor={id}></label>
        <span>{text}</span>
      </span>
    </div>
  );
};
