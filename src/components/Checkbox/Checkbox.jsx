import styles from "./checkbox.module.scss";

export default function Checkbox({
  label,
  className = "",
  checked,
  onChange,
}) {
  return (
    <div className={styles.storeList__checkbox + " " + className}>
      <label className={styles.storeList__checkboxWrap}>
        {checked !== undefined && onChange ? (
          <input
            className={styles.checkbox__input}
            type="checkbox"
            name="store-id"
            checked={checked}
            onChange={onChange}
          />
        ) : (
          <input
            className={styles.checkbox__input}
            type="checkbox"
            name="store-id"
          />
        )}
        <span className={styles.storeList__label}>{label ? label : null}</span>
      </label>
    </div>
  );
}
