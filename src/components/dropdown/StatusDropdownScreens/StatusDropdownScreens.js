import Popup from "reactjs-popup";
import styles from "../../SetStoreStatus/set-store-status.module.scss";
import PopupComponent from "../../popups/PopupComponent/PopupComponent";

const StatusDropdownScreens = ({
  status,
  maintenanceScreens,
  setStoreStatus,
}) => {
  return maintenanceScreens.map((screen) => (
    <Popup modal trigger={<div className={styles.screen__item}>{screen}</div>}>
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
  ));
};

export default StatusDropdownScreens;
