import styles from "./button-choice.module.scss";

export default function ButtonChoice({ text }) {
  return (
    <label className={styles.button}>
      <input type="checkbox" />
      <span>{text}</span>
    </label>
  );
}
