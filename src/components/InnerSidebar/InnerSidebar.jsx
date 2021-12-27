import { NavLink, useHistory, useLocation } from "react-router-dom";
import { innerNavigation } from "constants/inner-navigation";
import styles from "./inner-sidebar.module.scss";
import routes from "../../constants/routes";
import { observer } from "mobx-react-lite";
import ScriptsStore from "../../store/ScriptsStore";
import Popup from "reactjs-popup";
import PopupComponent from "../popups/PopupComponent/PopupComponent";
import ButtonIcon from "../buttons/ButtonIcon";
import { DeleteIcon } from "../../icons";
import { useState } from "react";
import Loader from "../Loader";
import cn from "classnames";

const InnerSidebar = observer((props) => {
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState("");
  const { presets, deletePreset, getPresets, isLoading } = ScriptsStore;

  const handleRemove = async ({ preset_id, setError, close }) => {
    const status = await deletePreset({ preset_id, setError });
    close();

    if (status === 204) {
      if (props.match.params.preset_id)
        history.push(`/scripts/${+props.match.params.id}/mode=launch`);
      getPresets(+props.match.params.id);
    }
  };

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
          {props.match.params.id !== "new" ? (
            <div className={styles.presets}>
              <div className={styles.presets__title}>Presets</div>
              <div className={styles.presets__content}>
                {presets.length &&
                !isLoading &&
                props.match.params.id !== "new" ? (
                  presets.map((preset, index) => (
                    <div className={styles.presets__preset}>
                      <Popup
                        modal
                        trigger={
                          <ButtonIcon
                            Icon={DeleteIcon}
                            className={styles.presets__icon}
                          />
                        }
                      >
                        {(close) => (
                          <PopupComponent
                            onClose={close}
                            text={"Are you sure you want to delete preset:"}
                            buttonText={"Delete"}
                            titleText={"Delete"}
                            dedicatedText={preset.name}
                            onClick={(e) =>
                              handleRemove({
                                preset_id: preset.pk,
                                setError,
                                close,
                              })
                            }
                          />
                        )}
                      </Popup>
                      {+props.match.params.preset_id !== preset.pk ? (
                        <NavLink
                          className={styles.innerMenu__link}
                          activeClassName={styles.active}
                          key={index}
                          to={`${routes.scriptsLaunch
                            .split(":id")
                            .join(props.match.params.id)}/${preset.pk}`}
                        >
                          <span>{preset.name}</span>
                        </NavLink>
                      ) : (
                        <div
                          className={cn(
                            styles.innerMenu__link,
                            styles.active,
                            styles.disabled
                          )}
                          key={index}
                        >
                          <span>{preset.name}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : isLoading ? (
                  <Loader types={["small"]} />
                ) : !presets.length ? (
                  <div className={cn(styles.innerMenu__link, styles.disabled)}>
                    No presets
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
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

export default InnerSidebar;
