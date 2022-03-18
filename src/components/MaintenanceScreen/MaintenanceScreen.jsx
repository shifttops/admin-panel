import styles from "./maintenance-screen.module.scss";
import Button from "../buttons/Button";
import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, ScreenIcon } from "../../icons";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import Popup from "reactjs-popup";
import PopupComponent from "../popups/PopupComponent/PopupComponent";
import Loader from "../Loader";
import useClickOutside from "../../helpers/hooks/useClickOutside";
import cn from "classnames";

const MaintenanceScreen = observer((props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);

  const {
    maintenanceScreens,
    storeInfo,
    setMaintenanceScreen,
    updateJiraStatus,
    isJiraRefreshing,
    isStatusFetching,
  } = StoresStore;

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      maintenanceScreens.set(null);
    }
  }, []);

  const handleClick = ({ e, onClose, screen }) => {
    setMaintenanceScreen({ setError, screen });
    setIsVisible(false);
    onClose();
  };

  useClickOutside({ ref, onClickOutside: () => setIsVisible(false) });

  return (
    <div className={styles.maintenanceScreen}>
      <div className={styles.maintenanceScreen__body}>
        <div className={styles.maintenanceScreen__content}>
          <div className={styles.maintenanceScreen__icon}>
            <ScreenIcon />
          </div>
          <div className={styles.maintenanceScreen__title}>
            Current maintenance screen:
          </div>
          <div ref={ref}>
            {!isStatusFetching ? (
              <div
                className={styles.currentScreen}
                onClick={() =>
                  maintenanceScreens.get() && maintenanceScreens.get()[0] !== ""
                    ? setIsVisible((prevVisibility) => !prevVisibility)
                    : () => {}
                }
              >
                <span className={styles.currentScreen__text}>
                  {storeInfo.maintenance_screen && !isStatusFetching
                    ? storeInfo.maintenance_screen
                    : "Nothing chosen"}
                </span>
                {maintenanceScreens.get() &&
                  maintenanceScreens.get()[0] !== "" && (
                    <ArrowDownIcon
                      className={styles.currentScreen__icon}
                      isOpen={isVisible}
                    />
                  )}
              </div>
            ) : (
              <Loader types={["small"]} />
            )}
            {maintenanceScreens.get() &&
            maintenanceScreens.get()[0] !== "" &&
            isVisible ? (
              <Dropdown
                handleClick={handleClick}
                maintenanceScreens={maintenanceScreens}
                setIsVisible={setIsVisible}
                storeInfo={storeInfo}
              />
            ) : null}
          </div>
        </div>
        <Button
          fetching={isJiraRefreshing}
          className={styles.maintenanceScreen__button}
          onClick={() =>
            updateJiraStatus({ store_id: storeInfo.store_id, setError })
          }
          text={"Update JIRA Status"}
        />
      </div>
    </div>
  );
});

const Dropdown = ({ maintenanceScreens, storeInfo, handleClick }) => (
  <div className={styles.dropDown}>
    <div className={styles.dropDown__body}>
      {maintenanceScreens.get() &&
        maintenanceScreens.get().map((screen) =>
          screen && screen !== storeInfo.maintenance_screen ? (
            <Popup
              key={screen}
              modal
              trigger={
                <div
                  className={cn(styles.innerScreen, {
                    [styles.innerScreen__current]:
                      screen === storeInfo.maintenance_screen,
                  })}
                  key={screen}
                >
                  {screen ? screen : "No screens"}
                </div>
              }
            >
              {(close) => (
                <PopupComponent
                  onClose={close}
                  onClick={(e) => handleClick({ e, onClose: close, screen })}
                  buttonText={"Confirm"}
                  titleText={"Confirm"}
                  text={"Are you sure you want to select screen:"}
                  dedicatedText={screen}
                />
              )}
            </Popup>
          ) : (
            <div
              className={cn(styles.innerScreen, {
                [styles.innerScreen__current]:
                  screen === storeInfo.maintenance_screen,
              })}
              key={screen}
            >
              {screen ? screen : "No screens"}
            </div>
          )
        )}
    </div>
  </div>
);

export default MaintenanceScreen;
