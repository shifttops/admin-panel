import styles from "./maintenance-screen.module.scss";
import Button from "../buttons/Button";
import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../../icons";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import Popup from "reactjs-popup";
import PopupComponent from "../popups/PopupComponent/PopupComponent";

const MaintenanceScreen = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const {
    maintenanceScreens,
    updateMaintenanceScreens,
    getMaintenanceScreens,
    storeInfo,
    setMaintenanceScreen,
    updateJiraStatus,
  } = StoresStore;

  useEffect(() => {
    if (!maintenanceScreens.length) getMaintenanceScreens(setError);
    // else updateMaintenanceScreens();
  }, [maintenanceScreens.length]);

  const handleClick = ({ e, onClose, screen }) => {
    setMaintenanceScreen({ setError, screen });
    setIsVisible(false);
    onClose();
  };

  return (
    <div className={styles.maintenanceScreen}>
      <div className={styles.maintenanceScreen__body}>
        <div className={styles.maintenanceScreen__content}>
          <div className={styles.maintenanceScreen__title}>
            Current maintenance screen:
          </div>
          <div
            className={styles.currentScreen}
            onClick={() => setIsVisible((prevVisibility) => !prevVisibility)}
          >
            <span className={styles.currentScreen__text}>
              {storeInfo.maintenance_screen
                ? storeInfo.maintenance_screen
                : "Nothing chosen"}
            </span>
            {maintenanceScreens[0] !== "" && (
              <ArrowDownIcon
                className={styles.currentScreen__icon}
                isOpen={isVisible}
              />
            )}
          </div>
          {maintenanceScreens[0] !== "" && (
            <div
              className={styles.dropDown + " " + (isVisible ? styles.dropDown__visible : styles.dropDown__hidden)}
            >
              <div className={styles.dropDown__body}>
                {maintenanceScreens.map((screen) =>
                  screen && screen !== storeInfo.maintenance_screen ? (
                    <Popup
                      key={screen}
                      modal
                      trigger={
                        <div
                          className={styles.innerScreen + " " + (screen === storeInfo.maintenance_screen ? styles.innerScreen__current : "")}
                          key={screen}
                        >
                          {screen ? screen : "No screens"}
                        </div>
                      }
                    >
                      {(close) => (
                        <PopupComponent
                          onClose={close}
                          onClick={(e) => handleClick({e, onClose: close, screen})}
                          buttonText={'Confirm'}
                          titleText={'Confirm'}
                          text={'Are you sure you want to select screen:'}
                          dedicatedText={screen}
                        />
                      )}
                    </Popup>
                  ) : (
                    <div
                      className={styles.innerScreen + " " + (screen === storeInfo.maintenance_screen ? styles.innerScreen__current : "")}
                      key={screen}
                    >
                      {screen ? screen : "No screens"}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <Button
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

export default MaintenanceScreen;
