import styles from "./submit-planner-popup.module.scss";
import { CloseIcon } from "icons";
import { observer } from "mobx-react";
import { useState } from "react";
import StoresStore from "../../../store/StoresStore";

const SubmitPlannerPopup = observer(({ onClose, onClick, plannerTask, task}) => {
  const [error, setError] = useState(false);

  const handleChoice = ({ setError, plannerTask}) => {
    onClick();
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
            Are you sure you want to select this:
          <span>Start date: {plannerTask.startDate.toLocaleString().slice(0, -3)}</span>
          <span>Period: {plannerTask.period}</span>
          <span>End date: {plannerTask.endDate.toLocaleString().slice(0, -3)}</span> planner?
        </div>
        <button
          className={styles.applyButton}
          type="button"
          onClick={(e) => handleChoice({ setError, plannerTask})}
        >
          Confirm
        </button>
      </form>
    </div>
  );
});

export default SubmitPlannerPopup;
