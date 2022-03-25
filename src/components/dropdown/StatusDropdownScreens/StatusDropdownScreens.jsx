import Popup from "reactjs-popup";
import styles from "../../SetStoreStatus/set-store-status.module.scss";
import PopupComponent from "../../popups/PopupComponent/PopupComponent";
import cn from "classnames";

const StatusDropdownScreens = ({
  status,
  maintenanceScreens,
  setStoreStatus,
  storeScreen,
}) => {
  return maintenanceScreens.map((screen) =>
    storeScreen !== screen ? (
      <Popup
        modal
        trigger={<div className={styles.screen__item}>{screen}</div>}
      >
        {(close) => (
          <PopupComponent
            onClose={close}
            onClick={async () => {
              await setStoreStatus({ storeStatus: status.name, title: screen });
              close();
            }}
            titleText="Select status"
            buttonText="Select"
            text="Do you want to select status"
            dedicatedText={status.visibleName}
            additionalText="with maintenance screen"
            additionalDedicatedText={screen}
            additionalText2="?"
          />
        )}
      </Popup>
    ) : (
      <div className={cn(styles.screen__item, styles.screen__item__selected)}>
        {screen}
      </div>
    )
  );
};

export default StatusDropdownScreens;
