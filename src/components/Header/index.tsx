import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useIsMobile } from "../../hooks/useMobile";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";

export const Header = () => {
  const isMobile = useIsMobile();
  return (
    <header>
      <span></span>
      <div className={styles.container}>
        <Link to="/Vkrb">
          <img src={logo} alt="logo" />
        </Link>
        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </div>
    </header>
  );
};
