import {useState} from "react";
import styles from "../../pages/ActivityLogsPage/activity-logs-page.module.scss";

const Description = ({ log }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <td
      className={
        (log.error_time ? styles.fail : styles.success) +
        " " +
        (isDescriptionVisible ? styles.fail__visible : null)
      }
    >
      {log.error_time ? (
        <>
          {log.description}
          <span
            onClick={() => setIsDescriptionVisible((prevState) => !prevState)}
          >
            {!isDescriptionVisible ? "More..." : "Hide"}
          </span>
        </>
      ) : (
        "Success"
      )}
    </td>
  );
};

export default Description;