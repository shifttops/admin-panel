import styles from "./account.module.scss";
import accountIcon from "images/accountIcon.svg";

export default function Account() {
  return (
    <div className={styles.headerAccount}>
      <div className={styles.headerAccount__icon}>
        <img src={accountIcon} alt="" />
      </div>
      <p className={styles.headerAccount__name}>Ronald Mcdonald</p>
      <div className={styles.headerAccount__info}>
        <p className={styles.headerAccount__info - name}>Ronald Mcdonald</p>
        <p className={styles.headerAccount__email}>Ronald_hate_kfc@gmail.com</p>
        <div className={styles.headerAccount__settings}>
          <p className={styles.headerAccount__text}>Account settings</p>
          <p className={styles.headerAccount__text}>Help</p>
          <p className={styles.headerAccount__text}>Sign out</p>
        </div>
      </div>
    </div>
  );
}
