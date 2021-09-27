import styles from "./submit-popup.module.scss";
import { CloseIcon } from "icons";
import { observer } from "mobx-react";
import { useState } from "react";
import StoresStore from "../../../store/StoresStore";

const SubmitPopup = observer(({ onClose, screen, setIsVisible }) => {
  const [error, setError] = useState(false);
  const { setMaintenanceScreen } = StoresStore;

  const handleChoice = ({ setError, screen }) => {
    setMaintenanceScreen({ setError, screen });
    setIsVisible(false);
    onClose();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>Confirm</span>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <form>
        <div className={styles.block}>
          Are you sure you want to select <b>{screen}</b> screen?
        </div>
        <button
          className={styles.applyButton}
          type="button"
          onClick={(e) => {
            handleChoice({ setError, screen });
            onClose();
          }}
        >
          Confirm
        </button>
      </form>
    </div>
  );
});

export default SubmitPopup;
