import styles from "./activity-logs-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { ArrowDownIcon, DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import AccessButton from "components/buttons/AccessButton";
import ActivityLogsStore from "../../store/ActivityLogsStore";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";

const ActivityLogsPage = observer(() => {
  const { jira_logs, logs, fault_logs, getJiraLogs, getFaultLogs } = ActivityLogsStore;
  const [error, setError] = useState('');

  useEffect(() => {
    getJiraLogs(setError);
    getFaultLogs(setError);
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Activity logs</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>
              <Checkbox label="user" />
            </th>
            <th>Event type</th>
            <th>Message</th>
            <th>Store id</th>
            <th>Date</th>
            <th>Time</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={`${log.error_time ? 'Error ' : ""}${log.id}`}>
              <td className={styles.name}>
                <Checkbox className={styles.checkbox} label={log.error_time ? 'Fault Log': 'Jira Log'} />
              </td>
              <td>{log.error_time ? 'Store Error' : log.status}</td>
              <td className={log.error_time? styles.fail : styles.success}>{log.error_time ? 'Error': 'Success'}</td>
              <td>{log.store}</td>
              <td>{moment(log.error_time ? log.error_time : log.changed_on).format('DD.MM.YYYY')}</td>
              <td>{moment(log.error_time ? log.error_time : log.changed_on).format('HH:mm')}</td>
              <td>
                <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
              </td>
            </tr>
          ))}
          {/* <tr>
            <td className={styles.name}>
              <Checkbox
                className={styles.checkbox}
                label="Cameron Williamson"
              />
            </td>
            <td>Updated the cameras</td>
            <td className={styles.fail}>Failed</td>
            <td>20209</td>
            <td>17.04.2021</td>
            <td>09:32</td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
});

export default ActivityLogsPage;
