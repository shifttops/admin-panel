import styles from "./inner-manage.module.scss";
import ManageItem from "components/ManageItem";
import manageItemTypes from "types/manageItemTypes";
import {
  RefreshIcon,
  ScreenIcon,
  VersionIcon,
  VersionManageIcon,
  VideoManageIcon,
  WeightIcon,
} from "icons";
import Button from "components/buttons/Button";
import ButtonIcon from "components/buttons/ButtonIcon";
import MaintenanceScreen from "../../../../components/MaintenanceScreen";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { useState } from "react";
import routes from "../../../../constants/routes";
import { NavLink } from "react-router-dom";

export default function InnerManage(props) {
  const [log_id, setLogId] = useState('');
  const manageMapper = [
    {
      title: "Update algorithm version",
      url: null,
      type: manageItemTypes.yellow,
      icon: <VersionManageIcon />,
    },
    {
      title: "Update weights",
      url: null,
      type: manageItemTypes.green,
      icon: <WeightIcon />,
    },
    {
      title: "Refresh browser",
      url: "/refresh_browser",
      type: manageItemTypes.red,
      icon: <RefreshIcon />,
    },
    {
      title: "Reboot all cameras",
      url: "/reboot_cameras",
      type: manageItemTypes.red,
      icon: <VideoManageIcon />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Manage store</h2>
      <MaintenanceScreen {...props} />
      {manageMapper.map((item) => (
        <ManageItem
          key={item.titl}
          type={item.type}
          Icon={item.icon}
          title={item.title}
          url={item.url}
          setLogId={setLogId}
        />
      ))}
      {/* <ManageItem
        ActionButtons={ActionButtons}
        type={manageItemTypes.green}
        Icon={WeightIcon}
        title="Update weights"
      />
      <ManageItem
        ActionButtons={ActionButtons}
        type={manageItemTypes.red}
        Icon={RefreshIcon}
        title="Refresh browser"
      />
      <ManageItem
        ActionButtons={ActionButtons}
        type={manageItemTypes.red}
        Icon={VideoManageIcon}
        title="Reboot all cameras"
      /> */}
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
}
