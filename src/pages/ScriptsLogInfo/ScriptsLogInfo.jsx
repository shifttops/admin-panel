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
import Loader from "../../components/Loader";

const ScriptsLogInfo = observer((props) => {
  const { logInfo, getScriptLogInfo, isLogFetching } = ScriptsStore;
  const [error, setError] = useState("");
  const task_id = props.match.params.id;

  useEffect(() => {
    getScriptLogInfo({ task_id, setError });
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Script log info</h2>
        </div>
      </div>
      {!isLogFetching && Object.keys(logInfo).length ? (
        <div className={styles.table}>
          {Object.keys(logInfo).map((key) => (
            <div key={key} className={styles.row}>
              <b>{key.toUpperCase()}</b>
              <span>
                {logInfo[key] !== null && logInfo[key] !== undefined
                  ? logInfo[key].ansible_output
                    ? logInfo[key].ansible_output.toString()
                    : key.includes("time")
                    ? moment(logInfo[key]).format("DD MMMM YYYY, HH:mm")
                    : logInfo[key].toString()
                  : "N/A"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.loader}>
          {isLogFetching ? <Loader types={["medium"]} /> : "No log info"}
        </div>
      )}
    </div>
  );
});

export default ScriptsLogInfo;
