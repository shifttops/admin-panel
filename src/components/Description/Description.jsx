import { useState } from "react";
import styles from "./description.module.scss";
import cn from "classnames";

const Description = ({ message, className }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <td
      className={cn(className, {
        [styles.visible]: isDescriptionVisible,
      })}
    >
      <>
        {message}
        <span
          className={styles.button}
          onClick={() => setIsDescriptionVisible((prevState) => !prevState)}
        >
          {!isDescriptionVisible ? "More..." : "Hide"}
        </span>
      </>
    </td>
  );
};

export default Description;
