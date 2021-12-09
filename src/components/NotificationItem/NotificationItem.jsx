import React from "react";
import styles from "./notification__item.module.scss";

import {NavLink} from "react-router-dom";
import cn from "classnames";

const NotificationItem = ({item, isRead}) => (
  <NavLink
    to={`/stores/store-info/${item.store_id}`}
    className={styles.notification} key={item.id}
  >
    <div
      className={cn(styles.notification__label, {[styles.notification__error]: item.error_time}, {[styles.notification__read]: isRead})}
    >
      <span className={styles.notification__store}>Store ID: {item.store_id}</span>
      <span className={styles.notification__name}>{item.event_type}</span>
      <span
        className={styles.notification__time}>{item.changed_on ? new Date(item.changed_on).toLocaleString() : new Date(item.error_time).toLocaleString()}</span>
    </div>
  </NavLink>
)
export default NotificationItem;
