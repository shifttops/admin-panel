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

const ActionButtons = () => {
  return (
    <div className={styles.buttons}>
      <div className={styles.type}>
        <ButtonIcon Icon={VersionIcon} />
      </div>
      <Button className={styles.borderGreen} text="Old version" />
      <Button className={styles.yellow} text="Add a new" />
      <Button text="Update" />
    </div>
  );
};

export default function InnerManage() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Manage store</h2>
      <MaintenanceScreen />
      <ManageItem
        ActionButtons={ActionButtons}
        type={manageItemTypes.yellow}
        Icon={VersionManageIcon}
        title="Update algorithm version"
      />
      <ManageItem
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
        type={manageItemTypes.blue}
        Icon={ScreenIcon}
        title="Change screen"
      />
      <ManageItem
        ActionButtons={ActionButtons}
        type={manageItemTypes.red}
        Icon={VideoManageIcon}
        title="Reboot all cameras"
      />
    </div>
  );
}
