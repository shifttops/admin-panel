import styles from "./button.module.scss";
import cn from "classnames";

export default function Button({
  text,
  disabled,
  className,
  Icon = () => null,
  onClick,
}) {
  return (
    <button
      className={cn(styles.btn, className)}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon />
      {text}
    </button>
  );
}
