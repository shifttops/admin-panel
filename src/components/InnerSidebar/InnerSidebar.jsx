import { NavLink, useLocation } from "react-router-dom";
import { innerNavigation } from "constants/inner-navigation";
import styles from "./inner-sidebar.module.scss";
import { useEffect } from "react";
import { memo } from "react";
import routes from "../../constants/routes";

function InnerSidebar(props) {
  const location = useLocation();

  return (
    <div className={styles.innerMenu}>
      <p className={styles.innerMenu__title}>Menu</p>
      {props.links
        ? props.links.map(({ to, name }) => (
            <NavLink
              className={styles.innerMenu__link}
              // isActive={() => {
              //   return (
              //     to.split(":id").join(props.match.params.id) ===
              //     location.pathname
              //   );
              // }}
              activeClassName={styles.active}
              key={to}
              to={to.split(":id").join(props.match.params.id)}
            >
              {name}
            </NavLink>
          ))
        : innerNavigation.map(({ to, name }) => (
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

export default InnerSidebar;
// memo(InnerSidebar, () => true);
