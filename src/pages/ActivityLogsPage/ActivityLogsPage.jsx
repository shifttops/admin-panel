import styles from "./activity-logs-page.module.scss";
import stylesTH from "../../components/tables/TableHead/table-head.module.scss";

import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import ActivityLogsStore from "../../store/ActivityLogsStore";
import { useEffect, useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";

const ActivityLogsPage = observer(() => {
  const { jira_logs, logs, searchLogs, fault_logs, getJiraLogs, getFaultLogs } =
    ActivityLogsStore;
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });

  useEffect(() => {
    getJiraLogs(setError);
    getFaultLogs(setError);
  }, []);

  const sortFunc = (logs, sort) => {
    const { type, field } = sort;
    if (type !== "none" && field) {
      return [...logs].sort((a, b) => {
        if (type === "desc") {
          if (field === "description") {
            return a[field] ? 1 : b[field] ? -1 : 0;
          } else return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
        } else {
          if (field === "description") {
            return a[field] ? -1 : b[field] ? 1 : 0;
          } else return b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0;
        }
      });
    } else return logs;
  };

  const sortTypes = ["none", "desc", "inc"];

  const handleSort = (field) => {
    if (sort.field === field) {
      setSort({
        field,
        type: sortTypes[(sortTypes.indexOf(sort.type) + 1) % sortTypes.length],
      });
    } else {
      setSort({ field, type: sortTypes[1] });
    }
  };

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Activity logs</h2>
          <SearchQuick setSearch={setSearch} />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={stylesTH.tableHead}>
          <tr>
            <th>
              <Checkbox label="user" />
            </th>
            <th
              className={stylesTH.table__sort}
              onClick={() => handleSort("status")}
            >
              Event type <SortIcon />
            </th>
            <th
              className={stylesTH.table__sort}
              onClick={() => handleSort("description")}
            >
              Message <SortIcon />
            </th>
            <th
              className={stylesTH.table__sort}
              onClick={() => handleSort("store")}
            >
              Store id <SortIcon />
            </th>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("time")}>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortFunc(searchLogs(search), sort).map((log) => (
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
                {moment(log.error_time ? log.error_time : log.changed_on).format("DD.MM.YYYY")}
              </td>
              <td>
                {moment(log.error_time ? log.error_time : log.changed_on).format("HH:mm")}
              </td>
              <td>
                <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ActivityLogsPage;
