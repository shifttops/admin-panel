import styles from "./filter-popup.module.scss";
import { CloseIcon, DateIcon } from "icons";
import Checkbox from "components/Checkbox";
import global from "scss/global.scss";
import ButtonChoice from "components/buttons/ButtonChoice";
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

const FilterPopup = observer(({ onClose }) => {
  const { filters, getFilters, enabledFilters, getStores } = StoresStore;
  const [error, setError] = useState(false);
  // const [enabledFilters, setEnabledFilters] = useState(queryString.parse(location.search, { arrayFormat: 'comma' }));
  const history = useHistory();
  const location = useLocation();

  const applyFilters = (e) => {
    // Object.keys(enabledFilters).forEach((filterKey) => {
    //   const dateFilterKey = filterKey.split("__lte")[0].split("__gte")[0];
    //   if (
    //     enabledFilters[`${dateFilterKey}__lte`] &&
    //     enabledFilters[`${dateFilterKey}__gte`]
    //   ) {
    //     enabledFilters[`${dateFilterKey}__range`] = [
    //       enabledFilters[`${dateFilterKey}__gte`],
    //       enabledFilters[`${dateFilterKey}__lte`],
    //     ];
    //   } else if (enabledFilters[`${dateFilterKey}__gte`]) {
    //     enabledFilters[`${dateFilterKey}__lte`] = new Date().toISOString();
    //   } else if (enabledFilters[`${dateFilterKey}__lte`]) {
    //     enabledFilters[`${dateFilterKey}__gte`] = new Date().toISOString();
    //   }
    // });
    console.log(toJS(enabledFilters));
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(enabledFilters, {
        arrayFormat: "comma",
        // skipNull: true,
        // skipEmptyString: true,
      }),
    });
    getStores(setError);
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
        <CloseIcon onClick={onClose} />
      </div>
      <form>
        <div className={styles.block}>
          <p className={styles.category}>Choose category</p>
          {filters &&
            Object.keys(filters).map((filterKey) => (
              <FilterDropdownButton
                enabledFiltersForKey={
                  // filterKey === "date_created" ||
                  // filterKey === "date_deployment"
                  //   ? [
                  //       enabledFilters[`${filterKey}__range`],
                  //       // enabledFilters[`${filterKey}__range`],
                  //     ]
                  //   :
                  enabledFilters[filterKey]
                }
                key={filterKey}
                allEnabledFilters={enabledFilters}
                text={
                  filtersMapper.find((item) => item.name === filterKey)
                    ?.visibleName
                }
                filterKey={filterKey}
                filterValues={filters[filterKey]}
              />
              // <Checkbox className={styles.checkbox} label={filtersMapper.find(item => item.name === filterKey)?.visibleName} />

              // <Checkbox className={styles.checkbox} label="Events" />
              // <Checkbox className={styles.checkbox} label="System status" />
              // <Checkbox className={styles.checkbox} label="Status of devices" />
            ))}
        </div>
        {/* <div className={styles.block}>
          <p className={styles.category}>Format</p>
          <ButtonChoice text="Excel" />
          <ButtonChoice text="PDF" />
          <ButtonChoice text="Web" />
          <div className={styles.popupButton}>
            <Button text="Create report" />
          </div>
        </div> */}
        <button
          className={styles.applyButton}
          type="button"
          onClick={applyFilters}
        >
          Apply
        </button>
      </form>
    </div>
  );
});

export default FilterPopup;
