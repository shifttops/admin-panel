import { useState } from "react";
import Checkbox from "../Checkbox";
import styles from "./scripts_stores_table.module.scss";

export default function ScriptsStoresTable({
  enabledStores,
  setEnabledStores,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [mode, setMode] = useState("Hosts");
  const allStores = [
    "123",
    "456",
    "777",
    "444",
    "12324",
    "645",
    "23423",
    "78345",
    "38462",
    "98234",
    "47283",
    "12353",
    "34522",
    "345221",
    "43579",
    "345764",
    "23467",
    "11111",
    "22222",
    "33333",
    "44444",
  ];

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
      if (prev.includes(store)) {
        prev.splice(prev.indexOf(store), 1);
        return [...prev];
      } else {
        return [...prev, store];
      }
    });
  };

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className={styles.stores_list}>
        {allStores
          .filter((store) => store.includes(searchValue))
          .map((store) => (
            <div
              className={styles.list_row}
              key={store}
              onClick={(e) => handleCheckStore(e, store)}
            >
              <Checkbox
                checked={enabledStores.includes(store)}
                label={store}
                onChange={() => undefined}
              ></Checkbox>
            </div>
          ))}
      </div>
      <div className={styles.footer}>
        <button
          className={`${styles.button} ${mode === 'Hosts' ? styles.active: ''}`}
          onClick={(e) => handleClick(e.target.innerText)}
        >
          Hosts
        </button>
        <button
          className={`${styles.button} ${mode === 'Groups' ? styles.active: ''}`}
          onClick={(e) => handleClick(e.target.innerText)}
        >
          Groups
        </button>
      </div>
    </div>
  );
}
