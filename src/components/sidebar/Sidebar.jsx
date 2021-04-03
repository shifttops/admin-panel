import { NavLink } from "react-router-dom";
import logo from "images/logo.svg";
import minLogo from "images/min-logo.svg";
import mainNavigation from "constants/main-navigation";
import styles from "./sidebar.module.scss";
import cn from "classnames";

export default function Sidebar({ isOpen, isOverlap }) {
  return (
    <div className={styles.sidebar__wrap}>
      <div
        className={cn(styles.sidebar, {
          [styles.sidebarOpen]: isOpen,
          [styles.sidebarOverlap]: isOverlap,
        })}
      >
        <img className={styles.sidebar__logo} src={isOpen ? logo : minLogo} />
        <div className={styles.sidebar__items}>
          <p className={styles.sidebar__title}>menu</p>
          {mainNavigation.map(({ to, name, icon }) => (
            <NavLink
              exact
              className={styles.sidebar__item}
              to={to}
              key={to}
              activeClassName={styles.active}
            >
              <div className={styles.sidebar__icon}>{icon}</div>
              <span className={styles.sidebar__link}>{name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
