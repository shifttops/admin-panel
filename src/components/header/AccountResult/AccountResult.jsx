import styles from "components/header/Account/account.module.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function AccountResult() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const history = useHistory();
  const handleLogOut = () => {
    removeCookie('token');
    history.push('/');
  }

  return (
    <div className={styles.headerAccount__info}>
      <p className={styles.headerAccount__InfoName}>Ronald Mcdonald</p>
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
}
