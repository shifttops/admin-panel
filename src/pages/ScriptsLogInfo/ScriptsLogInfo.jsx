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
      {/* <table className={styles.table}>
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
              <td key={key}>{logInfo[key] && logInfo[key].ansible_output ? logInfo[key].ansible_output : logInfo[key]}</td>
            ))}
          </tr>
        </tbody>
      </table> */}
      <div className={styles.table}>
        {Object.keys(logInfo).map((key) => (
          <div key={key} className={styles.row}>
            <b>{key.toUpperCase()}</b>

            <span>
              {logInfo[key] !== null || logInfo[key] !== undefined
                ? logInfo[key].ansible_output
                  ? logInfo[key].ansible_output.toString()
                  : logInfo[key].toString()
                : "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ScriptsLogInfo;
