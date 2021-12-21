import { useEffect, useRef, useState } from "react";
import ButtonIcon from "components/buttons/ButtonIcon";
import styles from "./header-dashboard.module.scss";
import { ChatIcon, BellIcon, BurgerIcon } from "icons";
import SearchResult from "components/header/SearchResult";
import NotificationResult from "components/header/NotificationResult";
import Account from "components/header/Account";
import AppStore from "../../../store/AppStore";
import { observer } from "mobx-react";

const HeaderDashboard = observer(({ sidebarToggle }) => {
  const [searchValue, setSearchValue] = useState("");
  const [resCount, setResCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const {
    unreadNotificationCount,
    getStoresForSearch,
    searchStores,
    isLoadingSearch,
  } = AppStore;

  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchBlurHandler = (e) => {
    setSearchValue("");
  };

  const notificationClickHandler = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  const notificationBlurHandler = () => {
    setIsNotificationOpen(false);
  };

  const abortRef = useRef(false);

  useEffect(() => {
    if (abortRef.current && isLoadingSearch) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    if (/\d/.test(searchValue)) {
      getStoresForSearch({
        search: searchValue,
        limit: 5,
        offset: 0,
        signal: abortRef.current.signal,
        setResCount,
      });
    }

    return () => searchStores.get().clear();
  }, [searchValue]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__wrapper}>
          <div className={styles.burger} onClick={sidebarToggle}>
            <BurgerIcon />
          </div>
          <div className={styles.header__search}>
            <div className={styles.header__searchBox}>
              <input
                className={styles.header__searchInput}
                onChange={searchChangeHandler}
                value={searchValue}
                onBlur={searchBlurHandler}
                type="text"
                placeholder="Search store by store id..."
              />
            </div>
            <SearchResult
              isVisible={Boolean(
                (!!searchValue.length && searchStores.get().length) ||
                  isLoadingSearch
              )}
              resCount={resCount}
              setResCount={setResCount}
              search={searchValue}
              setSearchValue={setSearchValue}
              stores={searchStores.get()}
              isLoading={isLoadingSearch}
              getStores={getStoresForSearch}
            />
          </div>
        </div>
        <div className={styles.header__icons}>
          <ButtonIcon Icon={ChatIcon} />
          <div className={styles.header__bellWrapper}>
            <ButtonIcon Icon={BellIcon} onClick={notificationClickHandler} />
            {unreadNotificationCount ? (
              <span className={styles.indicator}>
                <p>
                  {unreadNotificationCount < 99
                    ? unreadNotificationCount
                    : "99+"}
                </p>
              </span>
            ) : null}
            {isNotificationOpen && (
              <NotificationResult onBlur={notificationBlurHandler} />
            )}
          </div>
        </div>
        <Account />
      </div>
    </header>
  );
});

export default HeaderDashboard;
