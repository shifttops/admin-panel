import styles from "./manage-item.module.scss";
import cn from "classnames";
import manageItemTypes from "types/manageItemTypes";
import ActionButtons from "../ActionButtons";

const manageItemTypeMap = {
  [manageItemTypes.yellow]: styles.yellow,
  [manageItemTypes.red]: styles.red,
  [manageItemTypes.blue]: styles.blue,
  [manageItemTypes.green]: styles.green,
};

export default function ManageItem({ title, type, Icon = () => null, url, setLogId }) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={cn(styles.icon, manageItemTypeMap[type])}>
          {Icon}
        </div>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.buttons}>
        <p className={styles.date}>Last updated 7 days ago</p>
        <ActionButtons url={url} setLogId={setLogId}/>
      </div>
    </div>
  );
}
