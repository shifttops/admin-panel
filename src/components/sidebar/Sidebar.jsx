import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import minLogo from "../../images/min-logo.svg";
import mainNavigation from "../../constants/main-navigation";
import styles from "./sidebar.module.scss";
import cn from "classnames";
import { memo } from "react";

export default function Sidebar({ isOpen, isOverlap }) {


  return (
    <div className={styles.sidebar__wrap}>
      <div
        className={cn(styles.sidebar, {
          [styles.sidebarOpen]: isOpen,
          [styles.overlap]: isOverlap,
        })}
      >
        <img className={styles.sidebar__logo} src={isOpen ? logo : minLogo} />
        <div className={styles.sidebar__items}>
          <p className={styles.sidebar__title}>menu</p>
          {mainNavigation.map(({ to, name, icon, disabled }) => (
            !disabled && <NavLink
            // exact
            className={styles.sidebar__item}
            to={to}
            key={to}
            activeClassName={styles.active}
            disabled={disabled}
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