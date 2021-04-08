import styles from "./input-login.module.scss";

export default function InputLogin({ placeholder }) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} placeholder={placeholder} />
    </div>
  );
}
