import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon, SortIcon } from "icons";
import styles from "./launch.module.scss";
import Checkbox from "components/Checkbox";
import { useState } from "react";
import Button from "../../../components/buttons/Button";
import ScriptsStoresTable from "../../../components/ScriptsStoresTable/ScriptsStoresTable";
import { observer } from "mobx-react";
import { useLocation } from "react-router";
import ScriptsStore from "../../../store/ScriptsStore";
import { useEffect } from "react";
import Popup from "reactjs-popup";
import LaunchPopup from "../../../components/popups/LaunchPopup";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { NavLink } from "react-router-dom";
import routes from "../../../constants/routes";

const InnerLaunch = observer(() => {
  const location = useLocation();
  const { scripts, hosts, getScripts, getHosts, launchScript } = ScriptsStore;
  const scriptId =
    +location.pathname.split("/")[location.pathname.split("/").length - 2];

  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [log_id, setLogId] = useState("");

  const [enabledStores, setEnabledStores] = useState({ hosts: [], groups: [] });

  const handleChange = (value, key) => {
    setRows((prev) => {
      prev[key] = value;
      return { ...prev };
    });
  };

  const handleLaunch = async () => {
    setLogId(
      await launchScript({
        hosts: enabledStores,
        playbook_id: scriptId,
        variables: rows,
        setError,
      })
    );
    setTimeout(() => setLogId(""), 5000);
  };

  useEffect(() => {
    if (!scripts.length) {
      getScripts(setError);
    }
    if (!Object.keys(hosts).length) {
      getHosts(setError);
    }
  }, []);

  useEffect(() => {
    if (scripts.length) {
      const temp = scripts.find((script) => script.playbook_id === scriptId);
      if (temp) {
        setRows(
          temp.variables.reduce((res, item) => {
            res[item] = "";
            return res;
          }, {})
        );
      }
    }
  }, [scripts]);

  return (
    <div className={styles.page}>
      {scripts.length ? (
        <>
          <div>
            <table className={styles.table}>
              <thead className={styles.head}>
                <tr>
                  <th>Variables</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(rows).map((variable, index) => (
                  <tr key={index} className={styles.table_row}>
                    <td>{variable}</td>
                    <td>
                      <input
                        type="text"
                        value={rows[variable]}
                        placeholder="Value"
                        onChange={(e) => handleChange(e.target.value, variable)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Popup
              modal
              trigger={
                <Button
                  text="Launch"
                  className="launch_btn"
                  // onClick={handleLaunch}
                />
              }
            >
              {(close) => (
                <LaunchPopup
                  handleLaunch={handleLaunch}
                  enabledStores={enabledStores}
                  rows={rows}
                  onClose={close}
                ></LaunchPopup>
              )}
            </Popup>
          </div>

          <ScriptsStoresTable
            enabledStores={enabledStores}
            setEnabledStores={setEnabledStores}
            hosts={hosts}
          />
          <div className={log_id ? styles.popup : styles.closed}>
            <NavLink to={`${routes.scripts_logs}/${log_id.task_id}`}>
              Click here to check execution
            </NavLink>
          </div>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.BOTTOM_RIGHT}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
});
export default InnerLaunch;
