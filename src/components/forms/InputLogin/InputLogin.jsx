import styles from "./input-login.module.scss";

export default function InputLogin({ placeholder, value, setValue }) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
