import styles from "./button.module.scss";

export default function Button({
  text,
  disabled,
  yellow,
  greenBorder,
  Icon = () => null,
  onClick,
}) {
  return (
    <button
      className={`${styles.btn} ${yellow ? styles.yellow : ""} ${
        greenBorder ? styles.greenBorder : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon />
      {text}
    </button>
  );
}
