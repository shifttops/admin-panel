import { NavLink, useLocation } from "react-router-dom";
import { innerNavigation } from "constants/inner-navigation";
import styles from "./inner-sidebar.module.scss";
import { useEffect } from "react";
import { memo } from "react";
import routes from "../../constants/routes";
import { observer } from "mobx-react-lite";
import ScriptsStore from "../../store/ScriptsStore";
import { useRef } from "react";

const InnerSidebar = observer((props) => {
  const location = useLocation();
  const { presets } = ScriptsStore;

  return (
    <div className={styles.innerMenu}>
      <p className={styles.innerMenu__title}>Menu</p>
      {props.links ? (
        <>
          {props.links.map(({ to, name }) => (
            <NavLink
              className={styles.innerMenu__link}
              isActive={() => {
                return (
                  to.split(":id").join(props.match.params.id) ===
                  location.pathname
                );
              }}
              activeClassName={styles.active}
              key={to}
              to={to.split(":id").join(props.match.params.id)}
            >
              {name}
            </NavLink>
          ))}
          Presets
          {presets.length
            ? presets.map((preset, index) => (
                <NavLink
                  className={styles.innerMenu__link}
                  // isActive={() => {
                  //   return (
                  //     to.split(":id").join(props.match.params.id) ===
                  //     location.pathname
                  //   );
                  // }}
                  activeClassName={styles.active}
                  key={index}
                  to={`${routes.scriptsLaunch
                    .split(":id")
                    .join(props.match.params.id)}/${preset.pk}`}
                >
                  {preset.name}
                </NavLink>
              ))
            : ""}
        </>
      ) : (
        innerNavigation.map(({ to, name }) => (
          <NavLink
            className={styles.innerMenu__link}
            to={`${to}/${props.match.params.id}`}
            key={to}
            activeClassName={styles.active}
          >
            {name}
          </NavLink>
        ))
      )}
    </div>
  );
});

export default memo(
  InnerSidebar,
  (prevProps, nextProps) =>{
    console.log(99999999,prevProps, nextProps);
    return true
  }
);
