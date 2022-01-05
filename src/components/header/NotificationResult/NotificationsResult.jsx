import { Link, useHistory } from "react-router-dom";
import styles from "./notifications.module.scss";
import AppStore from "../../../store/AppStore";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import NotificationItem from "../../NotificationItem";
import { SettingsIcon } from "../../../icons";
import cn from "classnames";

const NotificationResult = observer(
  ({ readNotifications, setReadNotifications, isVisible }) => {
    const history = useHistory();
    const {
      notificationsData,
      unreadNotificationCount,
      updateNotificationsSettings,
    } = AppStore;

    const { ref, inView, entry } = useInView({
      threshold: 0,
    });

    const handleAllRead = async () => {
      if (unreadNotificationCount)
        await updateNotificationsSettings({ isDateOnly: true });
    };

    useEffect(() => {
      if (!unreadNotificationCount) {
        setReadNotifications([
          ...notificationsData.get(),
          ...readNotifications,
        ]);
        notificationsData.get().clear();
      }
    }, [unreadNotificationCount]);

    useEffect(async () => {
      if (inView) await handleAllRead();
    }, [inView]);

    return (
      <div
        className={cn(styles.notifications, {
          [styles.notifications__visible]: isVisible,
        })}
      >
        <div className={styles.notifications__head}>
          <div className={styles.notifications__title}>
            <span>Notifications</span>
            <div className={styles.notifications__title__icon}>
              <SettingsIcon onClick={() => history.push("/setting")} />
            </div>
          </div>
          {unreadNotificationCount ? (
            <p
              className={styles.notifications__actions}
              onClick={handleAllRead}
            >
              Read all
            </p>
          ) : null}
        </div>
        <div className={styles.notifications__item}>
          <div className={styles.notifications__info}>
            {notificationsData.get().length ? (
              notificationsData
                .get()
                .map((item) => <NotificationItem item={item} />)
            ) : !readNotifications.length ? (
              <div className={styles.notifications__info__empty}>
                No notifications
              </div>
            ) : null}
          </div>
          {/*          <div className={styles.notifications__icon}>
          <img src={notificationsIcon} alt="" />
        </div>*/}
          {isVisible ? <div ref={ref} className={styles.ref} /> : null}
          {readNotifications.length
            ? readNotifications.map((item) => (
                <div className={styles.notifications__info}>
                  <NotificationItem item={item} isRead={true} />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
);

export default NotificationResult;
