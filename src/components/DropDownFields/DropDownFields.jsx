import styles from "./dropdown_fields.module.scss";
import { ArrowDownIcon, SpeedIcon, TempIcon } from "icons";
import cn from "classnames";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import { useState } from "react";

const DropDownFields = observer(({ field }) => {
  const { storeInfo } = StoresStore;
  const [isOpen, setOpen] = useState(true);

  return (
    <button
      className={styles.dropdownHead}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className={styles.item_row}>
        <p className={cn(styles.category, styles.categoryDropdown)}>
          {field.visibleName}
          <ArrowDownIcon />
        </p>
        <div className={styles.temp_info}>
          {field.items
            .filter((item) => item.icon)
            .map((item) => (
              <div className={styles.resultInfo}>
                <div
                  className={
                    item.keyName.includes("temp") ? styles.temp : styles.process
                  }
                  key={item.keyName}
                >
                  {item.icon}
                  <span>
                    {storeInfo[item.keyName] === 0 || storeInfo[item.keyName]
                      ? `${Math.round(storeInfo[item.keyName])} ${
                          item.keyName.includes("util") ? "%" : ""
                        }`
                      : ""}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isOpen ? (
        <div className={styles.dropdown}>
          {field.items.map(
            (item) =>
              !item.icon && (
                <div className={styles.item}>
                  <p className={styles.category}>{item.visibleName}</p>
                  <span className={styles.result}>
                    {storeInfo[item.keyName]}
                  </span>
                </div>
              )
          )}
        </div>
      ) : (
        ""
      )}
    </button>
  );
});

export default DropDownFields;
