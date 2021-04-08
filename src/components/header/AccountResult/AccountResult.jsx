import styles from "components/header/Account/account.module.scss";
import { Link } from "react-router-dom";

export default function AccountResult() {
  return (
    <div className={styles.headerAccount__info}>
      <p className={styles.headerAccount__InfoName}>Ronald Mcdonald</p>
      <p className={styles.headerAccount__email}>Ronald_hate_kfc@gmail.com</p>
      <div className={styles.headerAccount__settings}>
        <p className={styles.headerAccount__text}>Account settings</p>
        <p className={styles.headerAccount__text}>Help</p>
        <Link
          to="/"
          className={styles.headerAccount__text + " " + styles.redText}
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
