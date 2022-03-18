import { useState } from "react";
import cn from "classnames";
import styles from "../../SetStoreStatus/set-store-status.module.scss";
import { ArrowDownIcon } from "../../../icons";
import StatusDropdownScreens from "../StatusDropdownScreens";
import Popup from "reactjs-popup";
import PopupComponent from "../../popups/PopupComponent/PopupComponent";

const StatusDropdown = ({
  storeStatus,
  status,
  maintenanceScreens,
  setStoreStatus,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={cn(styles.dropdown__item)}>
      {maintenanceScreens.length &&
      maintenanceScreens[0].length &&
      status.name !== storeStatus ? (
        <div className={styles.screen}>
          <div
            className={cn(styles.screen__title)}
            onClick={() => setIsVisible((prevState) => !prevState)}
          >
            {status.visibleName} <ArrowDownIcon isOpen={isVisible} />
          </div>
          {isVisible ? (
            <>
              <p className={styles.screen__text} />
              <StatusDropdownScreens
                status={status}
                setStoreStatus={setStoreStatus}
                maintenanceScreens={maintenanceScreens}
              />
            </>
          ) : null}
        </div>
      ) : status.name !== storeStatus ? (
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
        <div className={styles.dropdown__selected}>{status.visibleName}</div>
      )}
    </div>
  );
};

export default StatusDropdown;
