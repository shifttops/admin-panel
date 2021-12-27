import { useState } from "react";
import Checkbox from "../Checkbox";
import styles from "./scripts_stores_table.module.scss";
import cn from "classnames";
import Loader from "../Loader";

export default function ScriptsStoresTable({
  enabledStores,
  setEnabledStores,
  hosts,
  isFetching,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [mode, setMode] = useState("Hosts");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleClick = (value) => {
    if (mode !== value) {
      setMode(value);
    }
  };

  const handleCheckStore = (e, store) => {
    e.preventDefault();
    e.stopPropagation();
    setEnabledStores((prev) => {
      const enabledStoreCurrentKey = Object.keys(prev).find((item) =>
        prev[item].includes(store)
      );
      if (enabledStoreCurrentKey) {
        prev[enabledStoreCurrentKey].splice(
          prev[enabledStoreCurrentKey].indexOf(store),
          1
        );
        return { ...prev };
      } else {
        prev[mode.toLowerCase()] = [...prev[mode.toLowerCase()], store];
        return { ...prev };
      }
    });
  };

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className={styles.stores_list}>
        {!isFetching && Object.keys(hosts).length ? (
          hosts[mode.toLowerCase()]
            .filter((host) =>
              host.display.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((host) => (
              <div
                className={cn(styles.list_row, {
                  [styles.list_row__checked]: enabledStores[
                    mode.toLowerCase()
                  ].includes(host.display),
                })}
                key={host.id}
                onClick={(e) => handleCheckStore(e, host.display)}
              >
                <Checkbox
                  checked={enabledStores[mode.toLowerCase()].includes(
                    host.display
                  )}
                  label={host.display}
                  onChange={() => undefined}
                />
              </div>
            ))
        ) : (
          <div className={styles.loader}>
            {isFetching ? <Loader types={["medium"]} /> : "No available hosts"}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <button
          className={`${styles.button} ${
            mode === "Hosts" ? styles.active : ""
          }`}
          onClick={(e) => handleClick(e.target.innerText)}
        >
          Hosts
        </button>
        <button
          className={`${styles.button} ${
            mode === "Groups" ? styles.active : ""
          }`}
          onClick={(e) => handleClick(e.target.innerText)}
        >
          Groups
        </button>
      </div>
    </div>
  );
}
