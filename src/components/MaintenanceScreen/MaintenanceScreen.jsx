import styles from "./maintenance-screen.module.scss";
import Button from "../buttons/Button";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "../../icons";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";

const MaintenanceScreen = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  let {maintenanceScreens, getMaintenanceScreens, storeInfo, setMaintenanceScreen, getStoreInfo, updateJiraStatus} = StoresStore;

  useEffect(() => {
    getMaintenanceScreens(setError);
  }, [maintenanceScreens.length]);

  const handleChoice = async (screen) => {
    const isDone = await setMaintenanceScreen({ setError, screen });

    if (isDone) {
      getStoreInfo(storeInfo.store_id, setError);
    }
    setIsVisible((prevVisibility) => !prevVisibility);
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
              {storeInfo.status}
            </span>
            <ArrowDownIcon
              className={styles.currentScreen__icon}
              isOpen={isVisible}
            />
          </div>
          <div className={styles.dropDown + " " + (isVisible ? styles.dropDown__visible : styles.dropDown__hidden)}>
            <div className={styles.dropDown__body}>
              {maintenanceScreens.map((screen) => (
                <div
                  onClick={screen !== storeInfo.maintenance_screen && (() => handleChoice(screen))}
                  className={styles.innerScreen + " " + (screen === storeInfo.maintenance_screen && styles.innerScreen__current)}
                >
                  {screen ? screen : "No messages"}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className={styles.maintenanceScreen__button}
          onClick={() => updateJiraStatus()}
          text={"Update JIRA Status"}
        />
      </div>
    </div>
  );
});

export default MaintenanceScreen;