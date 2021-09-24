import styles from "./scripts_logs_page.module.scss";

import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import { useEffect, useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import ScriptsStore from "../../store/ScriptsStore";
import routes from "../../constants/routes";
import { useHistory } from "react-router";

const ScriptsLogsPage = observer(() => {
  const { logs, running_logs, getScriptsLogs, getScriptsRunningLogs } =
    ScriptsStore;
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });
  const history = useHistory();

  const handleLogClick = (task_id) => {
    history.push(`${routes.scripts_logs}/${task_id}`);
  };

  const mapper = [
    {
      visibleName: "ID",
      key: "task_id",
    },
    {
      visibleName: "Name",
      key: "playbook_name",
    },
    {
      visibleName: "Servers",
      key: "servers",
    },
    {
      visibleName: "Variables",
      key: "variables",
    },
  ];

  const doneScriptsMapper = [
    {
      visibleName: "ID",
      key: "log_id",
    },
    {
      visibleName: "State",
      key: "state",
    },
    {
      visibleName: "Issuing time",
      key: "issuing_time",
    },
    {
      visibleName: "Finishing tine",
      key: "finishing_time",
    },
    {
      visibleName: "Variables",
      key: "arguments",
    },
    {
      visibleName: "Playbook ID",
      key: "playbook",
    },
  ];

  useEffect(() => {
    getScriptsRunningLogs(setError);
    getScriptsLogs(setError);
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Scripts logs</h2>
          <SearchQuick setSearch={setSearch} />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>
      </div>
      {running_logs.length ? (
        <>
          <p className={styles.logs_type_name}>Running scripts</p>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {mapper.map((item) => (
                  <th key={item.key}>{item.visibleName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {running_logs.map((log) => (
                <tr
                  key={log.task_id}
                  onClick={() => handleLogClick(log.task_id)}
                >
                  {mapper.map((item) => (
                    <td key={item.key}>
                      {JSON.stringify(log[item.key], null, "\t")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
      {logs.length ? (
        <>
          <p className={styles.logs_type_name}>Done Logs</p>
          <table className={`${styles.table} ${styles.all_logs_table}`}>
            <thead className={styles.tableHead}>
              <tr>
                {doneScriptsMapper.map((item) => (
                  <th key={item.key}>{item.visibleName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.log_id}
                  onClick={() => handleLogClick(log.log_id)}
                >
                  {doneScriptsMapper.map((item) => (
                    <td key={item.key}>
                      {item.key === "issuing_time" ||
                      item.key === "finishing_time"
                        ? `${new Date(
                            log[item.key]
                          ).toLocaleDateString()} ${new Date(
                            log[item.key]
                          ).toLocaleTimeString()}`
                        : item.key === "arguments"
                        ? JSON.stringify(JSON.parse(log[item.key], null, "\t"))
                        : JSON.stringify(log[item.key], null, "\t")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
});

export default ScriptsLogsPage;
