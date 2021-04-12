import styles from "./access-button.module.scss";
import { AcceptIcon, DeclineIcon } from "icons";
import { useState } from "react";

export default function AccessButton() {
  const [isAccessButtonChoice, setIsAccessButtonChoice] = useState(false);
  const isAccessButtonClickHandler = () => {
    setIsAccessButtonChoice((prevState) => !prevState);
  };

  const isAccessButtonBlurHandler = () => {
    setIsAccessButtonChoice(false);
  };
  return (
    <div className={styles.wrap}>
      <button
        className={styles.button}
        onClick={isAccessButtonClickHandler}
        onBlur={isAccessButtonBlurHandler}
      >
        <AcceptIcon />
      </button>
      {isAccessButtonChoice && (
        <div className={styles.choice}>
          <button className={styles.button + " " + styles.accept}>
            <AcceptIcon />
          </button>
          <button className={styles.button + " " + styles.decline}>
            <DeclineIcon />
          </button>
        </div>
      )}
    </div>
  );
}
