import { Link } from "react-router-dom";
import styles from "./notifications.module.scss";
import notificationsIcon from "images/chat-notification.svg";

export default function NotificationResult() {
  return (
    <div className={styles.notifications}>
      <p className={styles.notifications__title}>Notification</p>
      <div className={styles.notifications__item}>
        <div className={styles.notifications__info}>
          <p className={styles.notifications__msg}>
            <span className={styles.notifications__store}>Store ID: 20209</span>{" "}
            Sent you a new message
          </p>
          <p className={styles.notifications__text}>Sat, 13 March</p>
          <Link className={styles.notifications__text} to="#">
            View message
          </Link>
        </div>
        <div className={styles.notifications__icon}>
          <img src={notificationsIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
