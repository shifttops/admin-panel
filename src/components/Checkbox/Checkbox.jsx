import styles from "./checkbox.module.scss";

export default function Checkbox({ label }) {
  return (
    <div className={styles.storeList__checkbox}>
      <label className={styles.storeList__checkboxWrap}>
        <input
          className={styles.checkbox__input}
          type="checkbox"
          name="store-id-20"
        />
        <span className={styles.storeList__label}>{label}</span>
      </label>
    </div>
  );
}
