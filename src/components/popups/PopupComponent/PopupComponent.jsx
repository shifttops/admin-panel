import styles from "./popup-component.module.scss";
import { CloseIcon } from "icons";

const PopupComponent = ({
  onClose,
  onClick,
  buttonText,
  titleText,
  text,
  dedicatedText,
  additionalText = null,
  additionalDedicatedText = null,
  additionalText2 = null,
  additionalDedicatedText2 = null,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>{titleText}</span>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <form>
        <div className={styles.block}>
          {text}
          <span>{dedicatedText}</span>
          {additionalText}
          <span>{additionalDedicatedText}</span>
          {additionalText2}
          <span>{additionalDedicatedText2}</span>
        </div>
        <button className={styles.applyButton} type="button" onClick={onClick}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default PopupComponent;
