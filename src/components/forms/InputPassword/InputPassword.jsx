import styles from "components/forms/InputPassword/input-password.module.scss";

export default function InputPassword({ placeholder }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="password"
        placeholder={placeholder}
      />
      <a href="#" className={styles.passwordControl}></a>
    </div>
  );
}
