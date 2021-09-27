import styles from "./delete-popup.module.scss";
import { CloseIcon, DateIcon } from "icons";
import Checkbox from "components/Checkbox";
import global from "scss/global.scss";
import ButtonChoice from "components/buttons/ButtonChoice";
import Button from "components/buttons/Button";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useState } from "react";
import { filtersMapper } from "../../../helpers/mappers";
import FilterDropdownButton from "../../buttons/FilterDropdownButton";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { toJS } from "mobx";
import ScriptsStore from "../../../store/ScriptsStore";

const DeletePopup = observer(({ onClose, script }) => {
  const { handleRemove } = ScriptsStore;
  const [error, setError] = useState(false);

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>Delete</span>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <form>
        <div className={styles.block}>
          Are you sure you want to delete the script
          <span>{script.name}</span>?
        </div>
        <button
          className={styles.applyButton}
          type="button"
          onClick={(e) => {
            handleRemove({ playbook_id: script.playbook_id, setError});
            setTimeout(() => {
              onClose();
            }, 300);
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
});

export default DeletePopup;
