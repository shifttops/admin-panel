import styles from "./checkouts_popup.module.scss";
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
import { ToastsStore } from "react-toasts";
import routes from "../../../constants/routes";

const CheckoutsPopup = observer(({ onClose }) => {
  const { checkouts, script, scripts, checkoutScript, getCheckouts } =
    ScriptsStore;
  const [error, setError] = useState(false);
  // const [enabledFilters, setEnabledFilters] = useState(queryString.parse(location.search, { arrayFormat: 'comma' }));
  const history = useHistory();
  const location = useLocation();
  const [checked, setIsChecked] = useState("");

  const handleChange = (id) => {
    setIsChecked(() => (checked === id ? "" : id));
  };

  const handleCheckout = async () => {
    if (checked) {
      const newScript = await checkoutScript({
        playbook_id: script.current.playbook_id,
        checkout_id: checked,
        setError,
      });
      scripts.splice(
        scripts.findIndex(
          (playbook) => playbook.playbook_id === script.current.playbook_id
        ),
        1,
        newScript
      );
      script.current = { ...newScript };
      history.push(`${routes.scripts}/${checked}/mode=edit`);
    } else {
      ToastsStore.error("Select version", 3000, "toast");
    }
    // history.push();
  };

  useEffect(() => {
    console.log("checkout");
    if (
      // Object.values(checkouts).every((value) => !value.length)
      //  &&
      script.current.playbook_id
    ) {
      getCheckouts({ playbook_id: script.current.playbook_id, setError });
    }
  }, [script.current.playbook_id]);

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>Checkout options</span>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <form>
        <div className={styles.block}>
          <p className={styles.category}>Choose version</p>
          {Object.keys(checkouts).length &&
            Object.keys(checkouts).map((key) => (
              <div className={styles.checkouts_block} key={key}>
                <p>
                  {checkouts[key].length
                    ? key === "rollback"
                      ? "Previous version"
                      : "Next versions"
                    : ""}
                </p>
                {checkouts[key].length
                  ? checkouts[key].map((script) => (
                      <div className={styles.checkout} key={script.playbook_id}>
                        <div
                          className={styles.checkout_item}
                          key={script.playbook_id}
                        >
                          <input
                            type="checkbox"
                            checked={checked && script.playbook_id === checked}
                            onChange={() => handleChange(script.playbook_id)}
                            id={script.playbook_id}
                          />
                          <label htmlFor={script.playbook_id}>
                            {script.name} -{" "}
                            {new Date(script.date_created).toLocaleDateString(
                              "en-US",
                              { hour12: false }
                            )}{" "}
                            {new Date(script.date_created).toLocaleTimeString(
                              "en-US",
                              { hour12: false }
                            )}
                          </label>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            ))}
        </div>
        <button
          className={styles.applyButton}
          type="button"
          onClick={handleCheckout}
        >
          Apply
        </button>
      </form>
    </div>
  );
});

export default CheckoutsPopup;
