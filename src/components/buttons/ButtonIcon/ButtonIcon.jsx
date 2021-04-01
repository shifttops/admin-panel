import styles from "./buttonIcon.module.scss";
import cn from "classnames";
import iconButtonTypes from "../../../types/iconButtonTypes";

const iconButtonClassNameTypeMap = {
  [iconButtonTypes.yellow]: styles.yellowButton,
  [iconButtonTypes.red]: styles.redButton,
  [iconButtonTypes.blue]: styles.blueButton,
  [iconButtonTypes.green]: styles.greenButton,
  [iconButtonTypes.error]: styles.errorButton,
  [iconButtonTypes.grey]: styles.greyButton,
};

export default function ButtonIcon({
  Icon = () => null,
  onClick,
  onBlur,
  type,
  className,
  style,
}) {
  return (
    <button
      style={style}
      onClick={onClick}
      onBlur={onBlur}
      className={cn(
        styles.dashboardIcon,
        className,
        iconButtonClassNameTypeMap[type]
      )}
    >
      <Icon />
    </button>
  );
}
