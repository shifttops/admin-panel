import styles from "./checkbox.module.scss";

export default function Checkbox({
  label,
  className = "",
  checked,
  onChange,
}) {
  return (
    <div className={styles.checkbox + " " + className}>
      <label className={styles.checkbox__wrapper}>
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
        <span className={styles.checkbox__label}>{label ? label : null}</span>
      </label>
    </div>
  );
}
