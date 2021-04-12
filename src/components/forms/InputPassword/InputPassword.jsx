import styles from "components/forms/InputPassword/input-password.module.scss";

export default function InputPassword({ placeholder, value, setValue }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="password"
        placeholder={placeholder}
        value={value} onChange={(e) => setValue(e.target.value)}
      />
      <a href="#" className={styles.passwordControl}></a>
    </div>
  );
}
