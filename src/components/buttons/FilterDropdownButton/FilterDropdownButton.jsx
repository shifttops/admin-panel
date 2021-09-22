import styles from "./button.module.scss";
import cn from "classnames";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import DatePicker from "react-datepicker";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "react-datepicker/dist/react-datepicker.css";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import StoresStore from "../../../store/StoresStore";

const FilterDropdownButton = observer(
  ({
    text,
    filterValues,
    filterKey,
    disabled,
    className,
    enabledFiltersForKey = [],
    // allEnabledFilters,
    type = "button",
  }) => {
    const { filters, getFilters, enabledFilters, getStores } = StoresStore;
    let allEnabledFilters = enabledFilters;
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [min, max] = [
      Math.floor(Math.min(...filterValues.map((item) => item[filterKey]))),
      Math.ceil(Math.max(...filterValues.map((item) => item[filterKey]))),
    ];

    const handleCheckFilter = (e, value) => {
      const enabledFilters = Array.isArray(enabledFiltersForKey)
        ? [...enabledFiltersForKey]
        : [enabledFiltersForKey];
      if (enabledFilters.includes(value)) {
        enabledFilters.splice(enabledFilters.indexOf(value), 1);
      } else {
        enabledFilters.push(value);
      }
      allEnabledFilters[filterKey] = [...enabledFilters];
      // setEnabledFilters(prev => ({ ...prev, [filterKey]: [...enabledFilters] }));
      setIsChecked((prev) => !prev);
    };

    const handleDateChange = (isFrom, value) => {
      // const key = isFrom ? "gte" : "lte";
      // allEnabledFilters[`${filterKey}__${key}`] = value.toISOString();
      if (!allEnabledFilters[filterKey]) {
        allEnabledFilters[filterKey] = new Array(2).fill(null);
      }
      allEnabledFilters[filterKey][isFrom ? 0 : 1] = value.toISOString();
      enabledFiltersForKey[isFrom ? 0 : 1] = value.toISOString();
      if (!allEnabledFilters[filterKey][1]) {
        allEnabledFilters[filterKey][1] = new Date().toISOString();
      }
      console.log(allEnabledFilters);
    };

    const handleSpeedChange = ({ min, max }) => {
      allEnabledFilters[filterKey] = [min, max];
    };
    return (
      <>
        <button
          className={cn(styles.btn, className)}
          onClick={() => setIsOpen((prev) => !prev)}
          type={type}
        >
          {text}
        </button>
        {isOpen && (
          <div className={styles.inside_div}>
            {filterKey === "date_created" || filterKey === "date_deployment" ? (
              <div className={styles.checkbox_div}>
                {console.log(
                  allEnabledFilters[filterKey]
                    ? allEnabledFilters[filterKey][0]
                    : allEnabledFilters[filterKey]
                )}
                <DatePicker
                  selected={
                    enabledFiltersForKey[0]
                      ? new Date(allEnabledFilters[filterKey][0])
                      : new Date()
                  }
                  onChange={(date) => handleDateChange(true, date)}
                  // showTimeSelect
                  className={styles.calendar}
                  maxDate={
                    enabledFiltersForKey[1]
                      ? new Date(allEnabledFilters[filterKey][1])
                      : new Date()
                  }
                />
                <DatePicker
                  selected={
                    enabledFiltersForKey[1]
                      ? new Date(allEnabledFilters[filterKey][1])
                      : new Date()
                  }
                  onChange={(date) => handleDateChange(false, date)}
                  // showTimeSelect
                  maxDate={new Date()}
                  className={styles.calendar}
                />
              </div>
            ) : filterKey === "internet_speed" ? (
              <div className={styles.checkbox_div_range}>
                <InputRange
                  maxValue={max}
                  minValue={min}
                  formatLabel={(value) => `${value}mb/s`}
                  value={{
                    min: enabledFiltersForKey[0]
                      ? enabledFiltersForKey[0]
                      : min,
                    max: enabledFiltersForKey[1]
                      ? enabledFiltersForKey[1]
                      : max,
                  }}
                  onChange={(value) =>
                    handleSpeedChange({ min: value.min, max: value.max })
                  }
                />
              </div>
            ) : (
              filterValues.map((filter, i) =>
                (filterKey === "status" ? filter : filter[filterKey]) ? (
                  <div className={styles.checkbox_div} key={`${text}${i}`}>
                    <input
                      type="checkbox"
                      checked={enabledFiltersForKey.includes(
                        filterKey === "status" ? filter : filter[filterKey]
                      )}
                      onChange={(e) =>
                        handleCheckFilter(
                          e,
                          filterKey === "status" ? filter : filter[filterKey]
                        )
                      }
                      id={`${text}${i}`}
                    />
                    <label htmlFor={`${text}${i}`}>
                      {filterKey === "status" ? filter : filter[filterKey]}
                    </label>
                  </div>
                ) : null
              )
            )}
          </div>
        )}
      </>
    );
  }
);
export default FilterDropdownButton;
