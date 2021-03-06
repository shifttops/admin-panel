import React from "react";
import styles from "./button-icon.module.scss";
import cn from "classnames";
import iconButtonTypes from "types/iconButtonTypes";

const iconButtonClassNameTypeMap = {
  [iconButtonTypes.yellow]: styles.yellowButton,
  [iconButtonTypes.red]: styles.redButton,
  [iconButtonTypes.delete]: styles.deleteButton,
  [iconButtonTypes.blue]: styles.blueButton,
  [iconButtonTypes.green]: styles.greenButton,
  [iconButtonTypes.error]: styles.errorButton,
  [iconButtonTypes.grey]: styles.greyButton,
};

const ButtonIcon = React.forwardRef(
  (
    {
      Icon = () => null,
      onClick,
      onBlur = () => {},
      type,
      className,
      style,
      disabled,
    },
    ref
  ) => (
    <button
      type="button"
      style={style}
      onClick={onClick}
      onBlur={onBlur}
      disabled={disabled}
      className={cn(
        styles.dashboardIcon,
        className,
        iconButtonClassNameTypeMap[type]
      )}
    >
      <Icon />
    </button>
  )
);

export default ButtonIcon;
