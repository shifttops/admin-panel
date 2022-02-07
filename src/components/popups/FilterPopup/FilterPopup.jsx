import styles from "./filter-popup.module.scss";
import { CloseIcon, DateIcon } from "icons";
import Button from "components/buttons/Button";
import StoresStore from "../../../store/StoresStore";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useState } from "react";
import { filtersMapper } from "../../../helpers/mappers";
import FilterDropdownButton from "../../buttons/FilterDropdownButton";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { toJS } from "mobx";
import { ToastsStore } from "react-toasts";
import Loader from "../../Loader";

const FilterPopup = observer(({ onClose }) => {
  const { filters, getFilters, enabledFilters, isFiltersFetching } =
    StoresStore;
  const [error, setError] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const applyFilters = (e) => {
    console.log(toJS(enabledFilters));

    if (Object.keys(toJS(enabledFilters)).length) {
      history.push({
        pathname: location.pathname,
        search: queryString.stringify(enabledFilters, {
          arrayFormat: "comma",
          // skipNull: true,
          // skipEmptyString: true,
        }),
      });
    } else ToastsStore.error("Select at least 1 option", 3000, "toast");
    // getStores(setError);
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      getFilters(setError);
    }
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>Filter options</span>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <form>
        <div className={styles.block}>
          {!isFiltersFetching ? (
            <>
              <p className={styles.category}>Choose category</p>
              {filters
                ? Object.keys(filters).map((filterKey) => (
                    <FilterDropdownButton
                      enabledFiltersForKey={enabledFilters[filterKey]}
                      key={filterKey}
                      allEnabledFilters={enabledFilters}
                      text={
                        filtersMapper.find((item) => item.name === filterKey)
                          ?.visibleName
                      }
                      filterKey={filterKey}
                      filterValues={filters[filterKey]}
                    />
                  ))
                : null}
            </>
          ) : (
            <div className={styles.loader}>
              <Loader types={["small"]} />
            </div>
          )}
        </div>
        <div className={styles.applyButton}>
          <Button
            disabled={isFiltersFetching}
            text={"Apply"}
            onClick={applyFilters}
            type="button"
          />
        </div>
      </form>
    </div>
  );
});

export default FilterPopup;
