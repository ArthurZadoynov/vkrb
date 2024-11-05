import styles from "./styles.module.css";
import { FC } from "react";
import { Team } from "../../types";

type Props = {
  data: Team;
};
export const TeamCard: FC<Props> = ({ data }) => {
  return (
      <div className={styles.cardContent} key={data.id}>
          <img className={styles.cardImage} src={data.imgUrl} alt="" />
          <h3>{data.name}</h3>
          <span>{data.role}</span>
      </div>
  );
};
