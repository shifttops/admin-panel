import React from "react";
import styles from "./notification__item.module.scss";

import { NavLink } from "react-router-dom";
import cn from "classnames";
import routes from "../../constants/routes";
import { statusMapper } from "../../helpers/mappers";

const NotificationItem = ({ item, isRead }) => {
  const notificationsTypes = [
    {
      types: ["message"],
      visibleName: "New message",
      path: `${routes.innerChat}/${item.store_id}`,
    },
    {
      types: statusMapper.map((item) => item.name),
      visibleName: item.event_type,
      path: `${routes.storeInfo}/${item.store_id}`,
    },
    {
      types: ["result_or_error_scripts"],
      visibleName: "Script finished",
      path: `${routes.storeInfo}/${item.store_id}`,
    },
    {
      types: ["scripts_running"],
      visibleName: "Script running on this store",
      path: `${routes.storeInfo}/${item.store_id}`,
    },
  ];

  return (
    <NavLink
      to={
        notificationsTypes.find((route) =>
          route.types.includes(item.event_type)
        ).path
      }
      className={styles.notification}
      key={item.id}
    >
      <div
        className={cn(
          styles.notification__label,
          { [styles.notification__error]: item.error_time },
          { [styles.notification__read]: isRead }
        )}
      >
        <span className={styles.notification__store}>
          Store ID: {item.store_id}
        </span>
        <span className={styles.notification__name}>
          {
            notificationsTypes.find((route) =>
              route.types.includes(item.event_type)
            ).visibleName
          }
        </span>
        <span className={styles.notification__time}>
          {item.changed_on
            ? new Date(item.changed_on).toLocaleString()
            : new Date(item.error_time).toLocaleString()}
        </span>
      </div>
    </NavLink>
  );
};

export default NotificationItem;
