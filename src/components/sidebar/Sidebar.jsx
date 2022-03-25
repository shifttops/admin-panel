import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import minLogo from "../../images/min-logo.svg";
import mainNavigation from "../../constants/main-navigation";
import styles from "./sidebar.module.scss";
import cn from "classnames";
import { memo, useEffect } from "react";
import routes from "../../constants/routes";
import { observer } from "mobx-react";
import AppStore from "../../store/AppStore";

const Sidebar = observer(() => {
  let { isSidebarOpen, isSidebarOverlap } = AppStore;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (
      new RegExp(`${routes.home}\/.+`).test(location.pathname) &&
      isSidebarOpen.get()
    ) {
      isSidebarOpen.set(false);
    }
  }, [location.pathname]);

  return (
    <div className={styles.sidebar__wrap}>
      <div
        className={cn(styles.sidebar, {
          [styles.sidebarOpen]: isSidebarOpen.get(),
          [styles.overlap]: isSidebarOverlap,
        })}
      >
        <img
          onClick={() => history.push(routes.home)}
          className={styles.sidebar__logo}
          src={isSidebarOpen.get() ? logo : minLogo}
          alt="logo"
        />
        <div className={styles.sidebar__items}>
          <p className={styles.sidebar__title}>menu</p>
          {mainNavigation.map(({ to, name, icon }) => (
            <NavLink
              //exact
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
});

export default Sidebar;
