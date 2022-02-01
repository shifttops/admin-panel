import { useEffect, useRef, useState } from "react";
import styles from "./stores-select.module.scss";
import Button from "../buttons/Button";
import cn from "classnames";
import { ToastsStore } from "react-toasts";
import Loader from "../Loader";
import { observer } from "mobx-react";
import AppStore from "../../store/AppStore";

const StoresSelect = observer(
  ({ values, setValues, value, onSelect, isError = false }) => {
    const { allStores: stores, isLoadingAllStores: isLoading } = AppStore;

    const searchRef = useRef(null);
    const rootRef = useRef(null);
    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedStores, setSelectedStores] = useState([]);

    useEffect(() => {
      if (value && value.length) setSelectedStores(value);
    }, [value]);

    const handleSave = () => {
      if (selectedStores.length) {
        if (values && setValues) {
          const result = { ...values };
          result["stores"] = [...selectedStores];
          setValues(result);
        }
        if (onSelect) onSelect(selectedStores);
        setIsOpen(false);
        if (searchRef.current) searchRef.current.value = "";
      } else
        ToastsStore.error("You must select at least 1 store", 3000, "toast");
    };

    const handleSelect = (e, store_id) => {
      const tempStores = [...selectedStores];

      if (e.target.checked) {
        tempStores.push(store_id);
      } else tempStores.splice(tempStores.indexOf(store_id), 1);

      setSelectedStores(tempStores);
    };

    useEffect(() => {
      if (!ref.current) {
        const onClick = (e) => {
          if (!rootRef.current.contains(e.target)) setIsOpen(false);
        };

        document.addEventListener("click", onClick);

        return () => document.removeEventListener("click", onClick);
      }
    }, []);

    useEffect(() => {
      ref.current = true;
    }, []);

    return (
      <div className={styles.select} ref={rootRef}>
        <input
          ref={searchRef}
          className={cn(styles.input, { [styles.input__error]: isError })}
          placeholder={
            selectedStores.length
              ? `Selected: ${JSON.stringify(selectedStores).slice(1, -1)}`
              : "Select stores..."
          }
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
        <div
          className={cn(styles.dropdown, {
            [styles.dropdown__visible]: isOpen,
          })}
        >
          <div className={styles.dropdown__body}>
            {stores.get().length &&
            stores
              .get()
              .filter(({ store_id }) => `${store_id}`.includes(search))
              .length &&
            !isLoading ? (
              <div className={styles.dropdown__info}>
                <div className={styles.stores}>
                  {stores
                    .get()
                    .filter(({ store_id }) => `${store_id}`.includes(search))
                    .map(({ store_id }) => (
                      <label
                        key={`store-select-${store_id}`}
                        className={cn(styles.dropdown__item, {
                          [styles.dropdown__item__chosen]:
                            selectedStores.length &&
                            selectedStores.includes(store_id),
                        })}
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedStores.length &&
                            selectedStores.includes(store_id)
                          }
                          onChange={(e) => handleSelect(e, store_id)}
                        />
                        <span className={styles.span}>
                          Store ID: {store_id}
                        </span>
                      </label>
                    ))}
                </div>
                <div className={styles.buttons}>
                  <Button text={"Select"} onClick={(e) => handleSave(e)} />
                  <Button
                    text={"Cancel"}
                    className={"maintenance"}
                    onClick={() => setSelectedStores([])}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.loader}>
                {isLoading ? <Loader types={["small"]} /> : "No stores"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default StoresSelect;
