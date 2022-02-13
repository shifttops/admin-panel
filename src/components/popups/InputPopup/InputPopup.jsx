import styles from "./input-popup.module.scss";
import { CloseIcon } from "icons";
import Button from "../../buttons/Button";
import { useState } from "react";
import { ToastsStore } from "react-toasts";

const InputPopup = ({
  onClose,
  onClick,
  buttonText,
  titleText,
  text,
  placeholder = "Input your text here..",
}) => {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (message.trim().length) {
      onClick(message.trim());
    } else ToastsStore.error("You can`t send empty message", 3000, "toast");
    onClose();
  };

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
          <span>{text}</span>
          <textarea
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.applyButton}>
          <Button text={buttonText} onClick={handleClick} type="button" />
        </div>
      </form>
    </div>
  );
};

export default InputPopup;
