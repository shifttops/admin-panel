import styles from "./launch.module.scss";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";
import ScriptsStoresTable from "../../../components/ScriptsStoresTable/ScriptsStoresTable";
import { observer } from "mobx-react";
import { useLocation } from "react-router";
import ScriptsStore from "../../../store/ScriptsStore";
import Popup from "reactjs-popup";
import LaunchPopup from "../../../components/popups/LaunchPopup";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { NavLink } from "react-router-dom";
import routes from "../../../constants/routes";
import ScriptsPeriodTable from "../../../components/ScriptsPeriodTable/ScriptsPeriodTable";

const InnerLaunch = observer((props) => {
  const location = useLocation();
  const {
    scripts,
    script,
    preset,
    hosts,
    presets,
    getScripts,
    getHosts,
    launchScript,
    getPresets,
    createPreset,
  } = ScriptsStore;
  const scriptId = +props.match.params.id;
  const presetId = +props.match.params.preset_id;

  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [log_id, setLogId] = useState("");

  const [enabledStores, setEnabledStores] = useState({ hosts: [], groups: [] });

  const [period, setPeriod] = useState("* * * * *");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPeriodic, setPeriodic] = useState(false);
  const [task_name, setTaskName] = useState("");

  const handleChange = (value, key) => {
    setRows((prev) => {
      prev[key] = value;
      return { ...prev };
    });
  };

  const handleCreatePreset = () => {
    const launchHosts = {};
    Object.keys(enabledStores).forEach((key) => {
      launchHosts[key] = enabledStores[key].map(
        (name) => hosts[key].find((host) => host.display === name)?.id
      );
    });
    if (name) {
      createPreset({
        name,
        script_id: scriptId,
        hosts: launchHosts,
        variables: rows,
        planner: { startDate, period, endDate },
        setError,
      });
    }
  };

  const handleLaunch = async () => {
    const launchHosts = {};
    Object.keys(enabledStores).forEach((key) => {
      launchHosts[key] = enabledStores[key].map(
        (name) => hosts[key].find((host) => host.display === name)?.id
      );
    });
    setLogId(
      await launchScript({
        hosts: launchHosts,
        variables: rows,
        planner: isPeriodic ? { startDate, period, endDate } : null,
        task_name,
        setError,
        script: scripts.find((script) => scriptId === script.playbook_id),
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
    if (!presets.length) {
      getPresets(scriptId);
    }
    return () => {
      setEnabledStores({ hosts: [], groups: [] });
      preset.current = {};
    };
  }, []);

  useEffect(() => {
    if (presets.length && presetId) {
      preset.current = presets.find((item) => item.pk === presetId);
      if (preset.current) {
        setRows(() => {
          const temp = {};
          preset.current.mappings.forEach(
            (item) => (temp[item.variable] = item.value)
          );
          return temp;
        });
      }
    }
  }, [presets, preset.current]);

  useEffect(() => {
    if (hosts.hosts?.length && presets.length && preset.current.pk) {
      setEnabledStores((prev) => {
        prev.hosts = preset.current.hosts.map(
          (host) => hosts.hosts.find((item) => host === item.id)?.display
        );
        return { ...prev };
      });
    }
  }, [hosts, presets, preset.current]);

  useEffect(() => {
    if (
      scripts.length &&
      scripts.current &&
      !script.current.playbook_id &&
      !presetId
    ) {
      script.current = scripts.find(
        (script) => script.playbook_id === scriptId
      );
    }
    if (script.current && script.current.playbook_id) {
      setRows(
        script.current.variables.reduce((res, item) => {
          res[item] = "";
          return res;
        }, {})
      );
    }
  }, [scripts, script.current]);

  return scripts.length ? (
    <>
      <div className={styles.page}>
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
            trigger={<Button text="Launch" className="launch_btn" />}
          >
            {(close) => (
              <LaunchPopup
                handleLaunch={handleLaunch}
                enabledStores={enabledStores}
                rows={rows}
                onClose={close}
                planner={{ startDate, period, endDate }}
              />
            )}
          </Popup>
        </div>

        <ScriptsStoresTable
          enabledStores={enabledStores}
          setEnabledStores={setEnabledStores}
          hosts={hosts}
        />
        <div className={styles.periodic}>
          <button onClick={() => setPeriodic((prev) => !prev)}>
            {isPeriodic ? "Close" : "Add period"}
          </button>
          {isPeriodic ? (
            <ScriptsPeriodTable
              period={period}
              setPeriod={setPeriod}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          ) : (
            ""
          )}
          {isPeriodic ? (
            <input
              type="text"
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder='Enter task name'
            />
          ) : (
            ""
          )}
        </div>
        <div className={log_id ? styles.popup : styles.closed}>
          {log_id ? (
            <NavLink to={`${routes.scripts_logs}/${log_id.task_id}`}>
              Click here to check execution
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.BOTTOM_RIGHT}
        />
      </div>
      <div className={styles.set_preset}>
        <Button
          text="Save as preset"
          className="launch_btn"
          onClick={handleCreatePreset}
        />
        <input
          type="text"
          value={name}
          placeholder="Enter preset name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </>
  ) : (
    "Loading..."
  );
  // </>
});
export default InnerLaunch;
