import styles from "./activity-logs-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { ArrowDownIcon, DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import AccessButton from "components/buttons/AccessButton";

export default function ActivityLogsPage(params) {
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
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="Jane Cooper" />
            </td>
            <td>Updated the cameras</td>
            <td className={styles.success}>Success</td>
            <td>20209</td>
            <td>17.04.2021</td>
            <td>09:32</td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr>
          <tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}
