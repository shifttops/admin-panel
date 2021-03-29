import styles from "./button.module.scss";

export default function Button({text, disabled, yellow, Icon = () => null}) {
  return (
    <button
      className={`${styles.btn} ${yellow ? styles.yellow : ""}`}
      disabled={disabled}
    >
      <Icon/>
      {text}
    </button>
  );
}
