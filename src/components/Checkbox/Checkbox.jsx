import styles from "./checkbox.module.scss";

export default function Checkbox({ label, className = "" }) {
  return (
    <div className={styles.storeList__checkbox + " " + className}>
      <label className={styles.storeList__checkboxWrap}>
        <input
          className={styles.checkbox__input}
          type="checkbox"
          name="store-id"
        />
        <span className={styles.storeList__label}>{label}</span>
      </label>
    </div>
  );
}
