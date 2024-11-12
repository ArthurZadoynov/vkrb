import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Redux/store";
import { teamSelector } from "../../Redux/team/teamSelector";
import { useEffect } from "react";
import { fetchTeam } from "../../api/team";
import { Loader } from "../Loader";
import { Error } from "../Error";
import { TeamCard } from "../MainTeamCard";
import EllipseTeamSvg from "../../assets/icons/ellipseTeam.svg?react";
import RedEllipseTeamSvg from "../../assets/icons/redEllipseTeam.svg?react";

export const MainSectionTeam = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useSelector(teamSelector);

  useEffect(() => {
    dispatch(fetchTeam());
  }, []);

  return (
    <section id="team" className={styles.containerTeam}>
      <RedEllipseTeamSvg className={styles.redTeamSvg} />
      <EllipseTeamSvg className={styles.teamSvg} />

      <div className={styles.teamContent}>
        <div className={styles.teamInfo}>
          <h2>Наша команда</h2>
          {isLoading && data.length === 0 ? (
            <Loader />
          ) : (
            <div className={styles.teamCard}>
              {data.map((item) => (
                <TeamCard key={`team_item_${item.id}`} data={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isError && <Error />}
    </section>
  );
};
