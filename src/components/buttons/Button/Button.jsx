import styles from "./button.module.scss";
import cn from "classnames";

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
      className={cn(styles.btn, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Icon />
      {text}
    </button>
  );
}
