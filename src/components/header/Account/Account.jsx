import styles from "./account.module.scss";
import accountIcon from "images/accountIcon.svg";
import AccountResult from "../AccountResult";
import { useRef, useState } from "react";
import { ArrowDownIcon } from "../../../icons";
import useClickOutside from "../../../helpers/hooks/useClickOutside";

export default function Account({ onClick }) {
  const ref = useRef(null);

  const [isAccountInfoVisible, setIsAccountInfoVisible] = useState(false);

  const isAccountClickHandler = () => {
    setIsAccountInfoVisible((prevState) => !prevState);
  };

  const isAccountBlurHandler = () => {
    setIsAccountInfoVisible(false);
  };

  useClickOutside({
    ref,
    onClickOutside: () => setIsAccountInfoVisible(false),
  });

  return (
    <div
      ref={ref}
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
        <ArrowDownIcon isOpen={isAccountInfoVisible} />
      </div>
      <AccountResult isVisible={isAccountInfoVisible} />
    </div>
  );
}
