import styles from "./inner-manage.module.scss";
import ManageItem from "../../../../components/ManageItem";
import manageItemTypes from "types/manageItemTypes";
import {
  RefreshIcon,
  VersionManageIcon,
  VideoManageIcon,
  WeightIcon,
} from "../../../../icons";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { useState } from "react";
import routes from "../../../../constants/routes";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import StoresStore from "../../../../store/StoresStore";
import SetStoreStatus from "../../../../components/SetStoreStatus";

const InnerManage = observer((props) => {
  const [log_id, setLogId] = useState("");

  const { isCamerasStatusFetching, isBrowserRefreshing } = StoresStore;

  const manageMapper = [
    {
      title: "Update algorithm version",
      url: null,
      type: manageItemTypes.yellow,
      icon: <VersionManageIcon />,
      isFetching: null,
    },
    {
      title: "Update weights",
      url: null,
      type: manageItemTypes.green,
      icon: <WeightIcon />,
      isFetching: null,
    },
    {
      title: "Refresh browser",
      url: "/refresh_browser",
      type: manageItemTypes.red,
      icon: <RefreshIcon />,
      isFetching: isBrowserRefreshing,
    },
    {
      title: "Reboot all cameras",
      url: "/reboot_cameras",
      type: manageItemTypes.red,
      icon: <VideoManageIcon />,
      isFetching: isCamerasStatusFetching,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Manage store</h2>
      <SetStoreStatus {...props} />
      {manageMapper.map((item) => (
        <ManageItem
          key={item.title}
          type={item.type}
          Icon={item.icon}
          title={item.title}
          url={item.url}
          setLogId={setLogId}
          isFetching={item.isFetching}
        />
      ))}
      <div className={log_id ? styles.popup : styles.closed}>
        {log_id ? (
          <NavLink to={`${routes.scripts_logs}/${log_id.task_id}`}>
            Click here to check execution
          </NavLink>
        ) : (
          ""
        )}
      </div>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default InnerManage;
