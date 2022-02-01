import styles from "./popup-image.module.scss";
import { CloseIcon } from "../../../icons";

const ImagePopup = ({ url, onClose }) => {
  return (
    <div className={styles.popup}>
      <img src={url} alt="Image broken" />
      <div onClick={onClose} className={styles.icon}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default ImagePopup;
