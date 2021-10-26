import styles from "./launch.module.scss";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";
import ScriptsStoresTable from "../../../components/ScriptsStoresTable/ScriptsStoresTable";
import { observer } from "mobx-react";
import { useLocation } from "react-router";
import ScriptsStore from "../../../store/ScriptsStore";
import Popup from "reactjs-popup";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { NavLink } from "react-router-dom";
import routes from "../../../constants/routes";
import ScriptsPeriodTable from "../../../components/ScriptsPeriodTable/ScriptsPeriodTable";
import PopupComponent from "../../../components/popups/PopupComponent/PopupComponent";
import Loader from "../../../components/Loader";

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

  const handleClick = ({ onClose }) => {
    handleLaunch();
    setTimeout(() => {
      onClose();
    }, 300);
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
        <div className={styles.launch_block}>
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
                      className={styles.variable_input}
                      onChange={(e) => handleChange(e.target.value, variable)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ScriptsStoresTable
            enabledStores={enabledStores}
            setEnabledStores={setEnabledStores}
            hosts={hosts}
          />
          <div className={styles.set_preset}>
            <input
              type="text"
              value={name}
              placeholder="Enter preset name"
              className={styles.input_name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              text="Save as preset"
              // className="launch_btn"
              onClick={handleCreatePreset}
            />
          </div>
        </div>
        <div className={styles.periodic_block}>
          {/* </button> */}
          {isPeriodic ? (
            <div className={styles.periodic}>
              {/* <input
              type="text"
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className={styles.task_name_input}
            /> */}
              <ScriptsPeriodTable
                period={period}
                setPeriod={setPeriod}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                task_name={task_name}
                onChangeTaskName={(value) => setTaskName(value)}
              />
            </div>
          ) : (
            ""
          )}
          <Button
            text={isPeriodic ? "Close" : "Add period"}
            // className="launch_btn"
            onClick={() => setPeriodic((prev) => !prev)}
          />
        </div>
        <Popup modal trigger={<Button text="Launch" />}>
          {(close) => {
            let dedicatedText = "";
            let additionalDedicatedText = "";
            let additionalDedicatedText2 = "";

            Object.keys(rows).map((key) => {
              dedicatedText += `${key}: ${rows[key] ? rows[key] : '""'}\n`;
            });

            Object.keys(enabledStores).map((key) => {
              additionalDedicatedText += `${key}: ${
                enabledStores[key] ? enabledStores[key] : '""'
              },\n`;
            });

            if (isPeriodic) {
              const tempObject = { startDate, period, endDate };

              Object.keys(tempObject).map((key) => {
                additionalDedicatedText2 += `${key}: ${
                  tempObject[key] ? tempObject[key] : '""'
                }\n`;
              });
            }

            return (
              <PopupComponent
                onClose={close}
                planner={{ startDate, period, endDate }}
                titleText={"Launch"}
                buttonText={"Launch"}
                text={"Are you sure you want to launch the script with"}
                dedicatedText={dedicatedText}
                additionalText={"on"}
                additionalDedicatedText={additionalDedicatedText}
                additionalText2={isPeriodic ? "at" : null}
                additionalDedicatedText2={additionalDedicatedText2}
                onClick={() => handleClick({ onClose: close })}
              />
            );
          }}
        </Popup>
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
    </>
  ) : (
    <Loader />
  );
});
export default InnerLaunch;
