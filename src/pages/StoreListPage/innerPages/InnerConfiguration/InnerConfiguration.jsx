import styles from "./inner-configuration.module.scss";
import {
  ErrorIcon,
  PauseIcon,
  PlannerIcon,
  PlayIcon,
  ProcessIcon,
} from "icons";
import SearchQuick from "components/search/SearchQuick";
import Button from "components/buttons/Button";
import ConfItem from "components/ConfItem";
import iconButtonTypes from "types/iconButtonTypes";

export default function InnerConfiguration() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headSearch}>
          <h2 className={styles.title}>Configuration</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <Button text="Create" className={styles.borderBtn} />
          <Button text="Upload file" />
        </div>
      </div>
      <table className={styles.table}>
        <tr>
          <th />
          <th>Name</th>
          <th>Last update</th>
          <th>Added</th>
          <th />
          <th />
        </tr>
        <tbody>
          <ConfItem Icon={PauseIcon} iconColor={iconButtonTypes.red} />
          <ConfItem Icon={PlayIcon} iconColor={iconButtonTypes.green} />
          <ConfItem Icon={PlayIcon} iconColor={iconButtonTypes.green} />
          <ConfItem Icon={PlayIcon} iconColor={iconButtonTypes.green} />
          <ConfItem Icon={PlayIcon} iconColor={iconButtonTypes.green} />
          <ConfItem Icon={PlayIcon} iconColor={iconButtonTypes.green} />
        </tbody>
      </table>
    </div>
  );
}
