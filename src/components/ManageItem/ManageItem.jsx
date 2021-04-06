import styles from "./manage-item.module.scss";
import ManageItemTypes from "types/iconButtonTypes";
import cn from "classnames";
import ButtonIcon from "components/buttons/ButtonIcon";
import Button from "components/buttons/Button";

const ManageItemTypeMap = {
  [ManageItemTypes.yellow]: styles.yellow,
  [ManageItemTypes.red]: styles.red,
  [ManageItemTypes.blue]: styles.blue,
  [ManageItemTypes.green]: styles.green,
};

export default function ManageItem({
  iconButton,
  title,
  type,
  ButtonBorder,
  ButtonYellow,
  ButtonText,
  Icon = () => null,
  className,
}) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={cn(styles.icon, className, ManageItemTypeMap[type])}>
          <Icon />
        </div>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.buttons}>
        <p className={styles.date}>Last updated 7 days ago</p>
        <div className={styles.type}>
          <ButtonIcon Icon={iconButton} />
        </div>
        {ButtonBorder ? <Button greenBorder text="Old version" /> : ""}
        {ButtonYellow ? <Button yellow text="Add a new" /> : ""}
        <Button text={ButtonText} />
      </div>
    </div>
  );
}
