import styles from "./launch-popup.module.scss";
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

const LaunchPopup = observer(
  ({ onClose, handleLaunch, enabledStores, rows, planner }) => {
    const { filters, getFilters, enabledFilters, getStores } = StoresStore;
    const [error, setError] = useState(false);
    const history = useHistory();
    const location = useLocation();

    return (
      <div className={styles.popup}>
        <div className={styles.popupHead}>
          <span className={styles.title}>Launch</span>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form>
          <div className={styles.block}>
            Are you sure you want to launch the script with
            <span>{JSON.stringify(rows)}</span>
            <span>{JSON.stringify(planner)}</span>
            on
            <span>{JSON.stringify(enabledStores)}?</span>
          </div>
          <button
            className={styles.applyButton}
            type="button"
            onClick={(e) => {
              handleLaunch();
              setTimeout(() => {
                onClose();
              }, 300);
            }}
          >
            Launch
          </button>
        </form>
      </div>
    );
  }
);

export default LaunchPopup;
