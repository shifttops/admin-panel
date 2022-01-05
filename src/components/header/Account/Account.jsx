import styles from "./account.module.scss";
import accountIcon from "images/accountIcon.svg";
import AccountResult from "../AccountResult";
import { useState } from "react";
import { ArrowDownIcon } from "../../../icons";

export default function Account({ onClick }) {
  const [isAccountInfo, setIsAccountInfo] = useState(false);

  const isAccountClickHandler = () => {
    setIsAccountInfo((prevState) => !prevState);
  };

  const isAccountBlurHandler = () => {
    setIsAccountInfo(false);
  };

  return (
    <div
      className={styles.headerAccount}
      onClick={isAccountClickHandler}
      onBlur={isAccountBlurHandler}
    >
      <div className={styles.headerAccount__icon}>
        <img src={accountIcon} alt="" />
      </div>
      <div className={styles.headerAccount__content}>
        <p className={styles.headerAccount__name}>
          {localStorage.getItem("userName")}
        </p>
        <ArrowDownIcon isOpen={isAccountInfo} />
      </div>
      <AccountResult isVisible={isAccountInfo} />
    </div>
  );
}
