import { NavLink } from "react-router-dom";
import innerNavigation from "constants/inner-navigation";
import styles from "./inner-sidebar.module.scss";
import { useEffect } from "react";
import { memo } from "react";

function InnerSidebar(props) {
  return (
    <div className={styles.innerMenu}>
      <p className={styles.innerMenu__title}>Menu</p>
      {innerNavigation.map(({ to, name }) => (
        <NavLink
          className={styles.innerMenu__link}
          to={`${to}/${props.match.params.id}`}
          key={to}
          activeClassName={styles.active}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}

export default memo(InnerSidebar, () => true);
