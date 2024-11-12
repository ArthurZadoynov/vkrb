import styles from "./styles.module.css";
import { FC } from "react";

type Props = {
  id: string;
  labelFaq: string;
  answerFaq: string;
};

export const Accordeon: FC<Props> = ({ id, labelFaq, answerFaq }) => {
  return (
    <div className={styles.accordeon}>
      <div>
        <input type="checkbox" name="faq-group" id={id} />
        <label htmlFor={id}>{labelFaq}</label>
        <p>{answerFaq}</p>
      </div>
    </div>
  );
};
