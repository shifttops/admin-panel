import styles from "./button.module.scss";
import cn from "classnames";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function FilterDropdownButton({
  text,
  filterValues,
  filterKey,
  disabled,
  className,
  enabledFiltersForKey = [],
  allEnabledFilters,
  type = 'button'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckFilter = (e, value) => {
    const enabledFilters = Array.isArray(enabledFiltersForKey) ? [...enabledFiltersForKey] : [enabledFiltersForKey];
    if (enabledFilters.includes(value)) {
      enabledFilters.splice(enabledFilters.indexOf(value), 1);
    } else {
      enabledFilters.push(value);
    }
    allEnabledFilters[filterKey] = [...enabledFilters];
    // setEnabledFilters(prev => ({ ...prev, [filterKey]: [...enabledFilters] }));

    setIsChecked(prev => !prev);
  }

  const handleDateChange = (isFrom, value) => {
    const key = isFrom ? 'gte' : 'lte';
    allEnabledFilters[`${filterKey}__${key}`] = value.toISOString();

    // setEnabledFilters(prev => ({ ...prev, [`${filterKey}__${key}`]: value }));
  }
  return (
    <>
      <button
        className={cn(styles.btn, className)}
        onClick={() => setIsOpen(prev => !prev)}
        type={type}
      >
        {text}
      </button>
      {isOpen &&
        <div className={styles.inside_div}>
          {(filterKey === "date_created" || filterKey === "date_deployment") ?
            (<div className={styles.checkbox_div}>
              {console.log(enabledFiltersForKey)}
              {/* <input type="date" defaultValue={enabledFiltersForKey[0]} onChange={(e) => handleDateChange(true, e.target.value)} />
              <input type="date" defaultValue={enabledFiltersForKey[1]} onChange={(e) => handleDateChange(false, e.target.value)} /> */}
              <DatePicker selected={enabledFiltersForKey[0] ? new Date(enabledFiltersForKey[0]) : new Date()} onChange={(date) => handleDateChange(true, date)} showTimeSelect/>
              <DatePicker selected={enabledFiltersForKey[1] ? new Date(enabledFiltersForKey[1]) : new Date()} onChange={(date) => handleDateChange(false, date)} showTimeSelect/>
            </div>) :
            filterValues.map((filter, i) => (filterKey === 'statuses' ? filter[1] : filter[filterKey]) ?
              (
                <div className={styles.checkbox_div} key={`${text}${i}`}>
                  <input type="checkbox"
                    checked={enabledFiltersForKey.includes(filterKey === 'statuses' ? filter[1] : filter[filterKey])}
                    onChange={(e) => handleCheckFilter(e, filterKey === 'statuses' ? filter[1] : filter[filterKey])} id={`${text}${i}`} />
                  <label htmlFor={`${text}${i}`}>{filterKey === 'statuses' ? filter[1] : filter[filterKey]}</label>
                </div>
              ) : null)}
        </div>
      }
    </>
  );
}
