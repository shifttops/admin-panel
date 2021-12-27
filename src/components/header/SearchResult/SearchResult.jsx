import styles from "./search-result.module.scss";
import { useHistory } from "react-router-dom";
import Loader from "../../Loader";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import cn from "classnames";

const SearchResult = ({
  setSearchValue,
  stores,
  isLoading,
  getStores,
  search,
  resCount,
  setResCount,
  isVisible,
}) => {
  const history = useHistory();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const handleClick = (id) => {
    history.push(`/stores/store-info/${id}`);
    setSearchValue("");
  };

  useEffect(async () => {
    if (inView && /[\dа-яА-Яa-zA-Z]/.test(search)) {
      await getStores({ search, limit: 5, setResCount });
    }
  }, [inView]);

  return (
    <div className={styles.searchResult}>
      {stores.map((store) => (
        <div
          className={styles.searchResult__item}
          onClick={() => handleClick(store.store_id)}
          key={`search${store.store_id}`}
        >
          <p className={styles.searchResult__id}>Store ID: {store.store_id}</p>
          {[
            { label: "Region", field: "store_county" },
            { label: "Location", field: "address" },
            {
              label: "Store type",
              field: "store_type",
            },
          ].map((item) => (
            <p className={styles.searchResult__info}>
              {item.label}:{" "}
              <span>{store[item.field] ? store[item.field] : "N/A"}</span>
            </p>
          ))}
        </div>
      ))}
      {isLoading ? (
        <div className={styles.loader}>
          <Loader types={["medium"]} />
        </div>
      ) : null}
      {!isLoading && stores.length !== resCount ? (
        <div className={styles.emptyBlock} ref={ref} />
      ) : null}
    </div>
  );
};

export default SearchResult;
