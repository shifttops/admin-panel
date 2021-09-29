import React from "react";
import styles from "./button.module.scss";
import cn from "classnames";

export const ButtonForPopup = React.forwardRef((props, ref) => <Button {...props}/>)

export default function Button({
  text,
  disabled,
  className,
  Icon = () => null,
  onClick,
  type='button'
}) {
  return (
    <button
      className={cn(styles.btn, styles[className])}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Icon />
      {text}
    </button>
  );
}
