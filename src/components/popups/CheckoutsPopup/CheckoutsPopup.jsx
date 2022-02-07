import styles from "./checkouts_popup.module.scss";
import { CloseIcon, DateIcon } from "icons";
import Checkbox from "../../../components/Checkbox";
import Button from "components/buttons/Button";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ScriptsStore from "../../../store/ScriptsStore";
import { ToastsStore } from "react-toasts";
import routes from "../../../constants/routes";
import DateComp from "../../Date";
import cn from "classnames";

const CheckoutsPopup = observer(({ onClose }) => {
  const { checkouts, script, scripts, checkoutScript, getCheckouts } =
    ScriptsStore;
  const [error, setError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [checked, setIsChecked] = useState("");

  const handleChange = (id) => {
    setIsChecked((prevState) => (prevState === id ? "" : id));
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
          {Object.keys(checkouts).map((key) => (
            <div className={styles.checkouts__block} key={key}>
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
                        <label
                          className={cn(styles.checkout__label, {
                            [styles.checkout__label__checked]:
                              checked === script.playbook_id,
                          })}
                        >
                          <span className={styles.checkout__name}>
                            <span>{script.name}</span> -{" "}
                            <DateComp date={script.date_created} />
                          </span>
                          <input
                            type="checkbox"
                            className={styles.checkout__input}
                            checked={checked && script.playbook_id === checked}
                            onChange={() => handleChange(script.playbook_id)}
                          />
                        </label>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          ))}
        </div>
        <div className={styles.applyButton}>
          <Button onClick={handleCheckout} text={"Apply"} type="button" />
        </div>
      </form>
    </div>
  );
});

export default CheckoutsPopup;
