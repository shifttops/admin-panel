import styles from "./inner-manage.module.scss";
import ManageItem from "components/ManageItem";
import manageItemTypes from "types/manageItemTypes";
import {
  BurgerIcon,
  FilesIcon,
  ImagesIcon,
  OpenPathIcon,
  PathIcon,
  RefreshIcon,
  ScreenIcon,
  VersionIcon,
  VersionManageIcon,
  VideoManageIcon,
  WeightIcon,
} from "icons";
import Button from "components/buttons/Button";

export default function InnerManage() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Manage store</h2>
      <ManageItem
        type={manageItemTypes.yellow}
        Icon={VersionManageIcon}
        ButtonBorder
        title="Update algorithm version"
        iconButton={VersionIcon}
        ButtonText="Update"
      />
      <ManageItem
        type={manageItemTypes.green}
        Icon={WeightIcon}
        ButtonText="Refresh"
        title="Update weights"
        iconButton={VersionIcon}
      />
      <ManageItem
        type={manageItemTypes.red}
        Icon={RefreshIcon}
        title="Refresh browser"
        iconButton={OpenPathIcon}
        ButtonText="Update"
      />
      <ManageItem
        type={manageItemTypes.blue}
        Icon={ScreenIcon}
        title="Change screen"
        ButtonYellow
        iconButton={ImagesIcon}
        ButtonText="Update"
      />
      <ManageItem
        type={manageItemTypes.red}
        Icon={VideoManageIcon}
        title="Reboot all cameras"
        ButtonText="Refresh"
        iconButton={VersionIcon}
      />
    </div>
  );
}
