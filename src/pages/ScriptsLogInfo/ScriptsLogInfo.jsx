import styles from "./script_log_info.module.scss";

import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import { useEffect, useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import ScriptsStore from "../../store/ScriptsStore";
import { useLocation } from "react-router";

const ScriptsLogInfo = observer((props) => {
  const { logInfo, getScriptLogInfo } = ScriptsStore;
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });
  const location = useLocation();
  const task_id = props.match.params.id;
  console.log(props);

  useEffect(() => {
    getScriptLogInfo({ task_id, setError });
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Scripts log info</h2>
          <SearchQuick setSearch={setSearch} />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {Object.keys(logInfo).map((key) => (
              <td key={key}>{key.toUpperCase()}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(logInfo).map((key) => (
              <td key={key}>{logInfo[key]}</td>
            ))}
          </tr>
          {/* {logs.map((log) => (
          ))} */}
          {/* {sortFunc(searchLogs(search), sort).map((log) => (
            <tr key={`${log.error_time ? "Error " : ""}${log.id}`}>
              <td className={styles.name}>
                <Checkbox
                  className={styles.checkbox}
                  label={log.error_time ? "Fault Log" : "Jira Log"}
                />
              </td>
              <td>{log.error_time ? "Store Error" : log.status}</td>
              <td className={log.error_time ? styles.fail : styles.success}>
                {log.error_time ? "Error" : "Success"}
              </td>
              <td>{log.store}</td>
              <td>
                {moment(
                  log.error_time ? log.error_time : log.changed_on
                ).format("DD.MM.YYYY")}
              </td>
              <td>
                {moment(
                  log.error_time ? log.error_time : log.changed_on
                ).format("HH:mm")}
              </td>
              <td>
                <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
});

export default ScriptsLogInfo;
