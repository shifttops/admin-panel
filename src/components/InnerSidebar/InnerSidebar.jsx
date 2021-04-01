import { NavLink } from "react-router-dom";
import innerNavigation from "../../constants/inner-navigation";
import styles from "./innerSidebar.module.scss";

export default function InnerSidebar() {
  return (
    <div className={styles.innerMenu}>
      <p className={styles.innerMenu__title}>Menu</p>
      {innerNavigation.map(({ to, name }) => (
        <NavLink
          className={styles.innerMenu__link}
          to={to}
          key={to}
          activeClassName={styles.active}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}
