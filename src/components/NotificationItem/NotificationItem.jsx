import React from "react";
import styles from "./notification__item.module.scss";

import { NavLink } from "react-router-dom";
import cn from "classnames";
import routes from "../../constants/routes";
import { storeStatusMapper } from "../../helpers/mappers";
import DateComp from "../Date";

const NotificationItem = ({ item, isRead }) => {
  const notificationsTypes = [
    {
      types: ["message"],
      visibleName: "New message",
      path: `${routes.innerChat}/${item.store_id}`,
    },
    {
      types: [...storeStatusMapper.map((item) => item.name), "Store errors"],
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
    {
      types: ["new_ticket"],
      visibleName: `New ticket ${
        item.store_ids && item.store_ids.length
          ? "on " + JSON.stringify(item.store_ids).slice(1, -1)
          : null
      }`,
      path: `${routes.tickets}/${item.id}`,
    },
  ];

  return (
    <NavLink
      to={
        notificationsTypes.find((route) =>
          route.types.includes(item.event_type)
        )?.path
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
        <div className={styles.notification__info}>
          <span className={styles.notification__store}>
            {item.event_type === "new_ticket"
              ? item.description
              : `Store ID: ${item.store_id}`}
          </span>
          <span className={styles.notification__time}>
            {item.changed_on ? (
              <DateComp date={item.changed_on} />
            ) : (
              <DateComp date={item.error_time} />
            )}
          </span>
        </div>
        <span className={styles.notification__name}>
          {
            notificationsTypes.find((route) =>
              route.types.includes(item.event_type)
            ).visibleName
          }
        </span>
      </div>
    </NavLink>
  );
};

export default NotificationItem;
