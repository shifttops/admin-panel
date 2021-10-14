import styles from "./maintenance-screen.module.scss";
import Button from "../buttons/Button";
import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../../icons";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import SubmitPopup from "../popups/Submit Popup";
import Popup from "reactjs-popup";

const MaintenanceScreen = observer((props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [chosenScreen, setChosenScreen] = useState("");

  const {
    maintenanceScreens,
    updateMaintenanceScreens,
    getMaintenanceScreens,
    storeInfo,
    setMaintenanceScreen,
    getStoreInfo,
    updateJiraStatus,
  } = StoresStore;

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      maintenanceScreens.maintenanceScreens = null
    }
  }, []);

  return (
    <div className={styles.maintenanceScreen}>
      <div className={styles.maintenanceScreen__body}>
        <div className={styles.maintenanceScreen__content}>
          <div className={styles.maintenanceScreen__title}>
            Current maintenance screen:
          </div>
          <div
            className={styles.currentScreen}
            onClick={() => {
              setIsVisible((prevVisibility) => !prevVisibility);
              setIsPopupVisible(false);
            }}
          >
            <span className={styles.currentScreen__text}>
              {/* {maintenanceScreens.find(
                (screen) => screen === storeInfo.maintenance_screen
              ) || "Nothing chosen"} */}
              {storeInfo.maintenance_screen
                ? storeInfo.maintenance_screen
                : "Nothing chosen"}
            </span>
            {maintenanceScreens.maintenanceScreens && maintenanceScreens.maintenanceScreens[0] !== "" && (
              <ArrowDownIcon
                className={styles.currentScreen__icon}
                isOpen={isVisible}
              />
            )}
          </div>
          {maintenanceScreens.maintenanceScreens && maintenanceScreens.maintenanceScreens[0] !== "" && (
            <div
              className={
                styles.dropDown +
                " " +
                (isVisible ? styles.dropDown__visible : styles.dropDown__hidden)
              }
            >
              <div className={styles.dropDown__body}>
                {maintenanceScreens.maintenanceScreens && maintenanceScreens.maintenanceScreens.map((screen) =>
                  screen && screen !== storeInfo.maintenance_screen ? (
                    <Popup
                      key={screen}
                      modal
                      trigger={
                        <div
                          // onClick={() => handleClick(screen)}
                          className={
                            styles.innerScreen +
                            " " +
                            (screen === storeInfo.maintenance_screen
                              ? styles.innerScreen__current
                              : "")
                          }
                          key={screen}
                        >
                          {screen ? screen : "No screens"}
                        </div>
                      }
                    >
                      {(close) => (
                        <SubmitPopup
                          screen={screen}
                          onClose={close}
                          setIsVisible={setIsVisible}
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
              {/* {isPopupVisible && (
                <SubmitPopup
                  screen={chosenScreen}
                  handleSubmit={handleChoice}
                  onClose={onClose}
                />
              )} */}
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
