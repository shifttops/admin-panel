import { useState } from "react";
import cn from "classnames";
import styles from "../../SetStoreStatus/set-store-status.module.scss";
import { ArrowDownIcon } from "../../../icons";
import Popup from "reactjs-popup";
import PopupComponent from "../../popups/PopupComponent/PopupComponent";
import StatusDropdownScreens from "../StatusDropdownScreens";

const StatusDropdown = ({
  storeStatus,
  status,
  maintenanceScreens,
  setStoreStatus,
  storeScreen,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={cn(styles.dropdown__item)}>
      {maintenanceScreens.length && maintenanceScreens[0].length ? (
        <div className={styles.screen}>
          <div
            className={cn(styles.screen__title, {
              [styles.screen__title__selected]: storeStatus === status.name,
            })}
            onClick={() => setIsVisible((prevState) => !prevState)}
          >
            {status.visibleName} <ArrowDownIcon isOpen={isVisible} />
          </div>
          {isVisible ? (
            <>
              <p className={styles.screen__text} />
              <StatusDropdownScreens
                status={status}
                storeScreen={storeScreen}
                setStoreStatus={setStoreStatus}
                maintenanceScreens={maintenanceScreens}
              />
            </>
          ) : null}
        </div>
      ) : storeStatus !== status.name ? (
        <Popup
          modal
          trigger={
            <div className={styles.statusWithout}>{status.visibleName}</div>
          }
        >
          {(close) => (
            <PopupComponent
              onClose={close}
              onClick={async () => {
                await setStoreStatus({
                  storeStatus: status.name,
                  title: "",
                });
                close();
              }}
              titleText="Select status"
              buttonText="Select"
              text="Do you want to select"
              dedicatedText={status.visibleName}
              additionalText="status?"
            />
          )}
        </Popup>
      ) : (
        <div className={styles.screen__title__selected}>
          {status.visibleName}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
