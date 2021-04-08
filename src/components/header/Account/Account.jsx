import styles from "./account.module.scss";
import accountIcon from "images/accountIcon.svg";
import { Link } from "react-router-dom";
import AccountResult from "components/header/AccountResult";
import { useState } from "react";

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
      <p className={styles.headerAccount__name}>Ronald Mcdonald</p>
      {isAccountInfo && <AccountResult />}
    </div>
  );
}
