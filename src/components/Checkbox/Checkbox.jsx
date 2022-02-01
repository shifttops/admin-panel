import styles from "./checkbox.module.scss";
import cn from "classnames";

export default function Checkbox({
  label,
  className = "",
  checked = false,
  onChange = () => {},
}) {
  return (
    <div className={cn(styles.checkbox, className)}>
      <label className={styles.checkbox__wrapper}>
        <input
          className={styles.checkbox__input}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className={styles.checkbox__label}>{label ? label : null}</span>
      </label>
    </div>
  );
}
