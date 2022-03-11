import styles from "../Account/account.module.scss";
import { useHistory } from "react-router-dom";
import cn from "classnames";

const AccountResult = ({ isVisible }) => {
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("date");
    localStorage.removeItem("refresh_date");
    localStorage.removeItem("userName");
    history.push("/");
  };

  return (
    <div
      className={cn(styles.headerAccount__info, {
        [styles.headerAccount__info__visible]: isVisible,
      })}
    >
      <p className={styles.headerAccount__InfoName}>
        {localStorage.getItem("userName")}
      </p>
      <p className={styles.headerAccount__email}>Ronald_hate_kfc@gmail.com</p>
      <div className={styles.headerAccount__settings}>
        <p className={styles.headerAccount__text}>Account settings</p>
        <p className={styles.headerAccount__text}>Help</p>
        <button
          onClick={handleLogOut}
          className={styles.headerAccount__text + " " + styles.redText}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default AccountResult;
