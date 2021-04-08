import { useState } from "react";
import ButtonIcon from "components/buttons/ButtonIcon";
import styles from "./header-dashboard.module.scss";
import burger from "images/burger.svg";
import { ChatIcon, BellIcon } from "icons";
import SearchResult from "components/header/SearchResult";
import NotificationResult from "components/header/NotificationResult";
import Account from "components/header/Account";

function HeaderDashboard({ sidebarToggle }) {
  const [searchValue, setSearchValue] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchBlurHandler = () => {
    setSearchValue("");
  };

  const notificationClickHandler = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  const notificationBlurHandler = () => {
    setIsNotificationOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__wrapper}>
          <div className={styles.burger} onClick={sidebarToggle}>
            <img src={burger} alt="" />
          </div>
          <div className={styles.header__search}>
            <div className={styles.header__searchBox}>
              <input
                className={styles.header__searchInput}
                onChange={searchChangeHandler}
                value={searchValue}
                onBlur={searchBlurHandler}
                type="text"
                placeholder="Search..."
              />
            </div>
            {!!searchValue.length && <SearchResult />}
          </div>
        </div>
        <div className={styles.header__icons}>
          <ButtonIcon Icon={ChatIcon} />
          <div className={styles.header__bellWrapper}>
            <ButtonIcon
              Icon={BellIcon}
              onClick={notificationClickHandler}
              onBlur={notificationBlurHandler}
            />
            <span className={styles.indicator} />
            {isNotificationOpen && <NotificationResult />}
          </div>
        </div>
        <Account />
      </div>
    </header>
  );
}

export default HeaderDashboard;
