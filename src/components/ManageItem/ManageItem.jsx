import styles from "./manage-item.module.scss";
import cn from "classnames";
import manageItemTypes from "types/manageItemTypes";

const manageItemTypeMap = {
  [manageItemTypes.yellow]: styles.yellow,
  [manageItemTypes.red]: styles.red,
  [manageItemTypes.blue]: styles.blue,
  [manageItemTypes.green]: styles.green,
};

export default function ManageItem({
  title,
  type,
  ActionButtons = () => null,
  Icon = () => null,
}) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={cn(styles.icon, manageItemTypeMap[type])}>
          <Icon />
        </div>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.buttons}>
        <p className={styles.date}>Last updated 7 days ago</p>
        <ActionButtons />
      </div>
    </div>
  );
}
