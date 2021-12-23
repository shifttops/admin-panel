import { Link } from "react-router-dom";
import styles from "./notifications.module.scss";
import AppStore from "../../../store/AppStore";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import NotificationItem from "../../NotificationItem";

const NotificationResult = observer(() => {
  const { notificationsData, unreadNotificationCount, readNotification } =
    AppStore;

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [isAllRead, setIsAllRead] = useState(!unreadNotificationCount);

  const handleAllRead = () => {
    if (unreadNotificationCount) readNotification();
  };

  useEffect(() => {
    if (!unreadNotificationCount) setIsAllRead(true);
  }, [unreadNotificationCount]);

  useEffect(() => {
    if (inView && unreadNotificationCount) readNotification();
  }, [inView]);

  return (
    <div className={styles.notifications}>
      <div className={styles.notifications__head}>
        <p className={styles.notifications__title}>Notifications</p>
        <p className={styles.notifications__actions} onClick={handleAllRead}>
          Read all
        </p>
      </div>
      <div className={styles.notifications__item}>
        <div className={styles.notifications__info}>
          {notificationsData.get().length ? (
            notificationsData
              .get()
              .map((item) => (
                <NotificationItem item={item} isRead={isAllRead} />
              ))
          ) : (
            <div className={styles.notifications__info__empty}>
              No notifications
            </div>
          )}
        </div>
        {/*<div className={styles.notifications__icon}>
          <img src={notificationsIcon} alt="" />
        </div>*/}
        <div ref={ref} />
      </div>
    </div>
  );
});

export default NotificationResult;
