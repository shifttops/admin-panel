import styles from "./store-groups-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import {
  CheckIcon,
  DeleteIcon,
  ErrorIcon,
  MoreIcon,
  PauseIcon,
  PlannerIcon,
  PlayIcon,
} from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";

export default function StoreGroupsPage(params) {
  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Store groups</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <ButtonIcon Icon={DeleteIcon} className={styles.deleteIcon} />
          <Button text="Create group" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>
              <Checkbox label="user" />
            </th>
            <th>Files</th>
            <th>Last Edited</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="McD stores" />
            </td>
            <td className={styles.text}>64 restaurants</td>
            <td className={styles.text}>17 March 2021</td>
            <td>
              <ButtonIcon Icon={MoreIcon} />
            </td>
          </tr>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="Franchaise" />
            </td>
            <td className={styles.text}>64 restaurants</td>
            <td className={styles.text}>17 March 2021</td>
            <td>
              <ButtonIcon Icon={MoreIcon} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
