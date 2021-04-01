import Button from "../../../../components/buttons/Button";
import styles from "./innerConfiguration.module.scss";
import SearchQuick from "../../../../components/search/SearchQuick";
import PlannerItem from "../../../../components/PlannerItem/PlannerItem";
import {
  ErrorIcon,
  PauseIcon,
  PlannerIcon,
  PlayIcon,
  ProcessIcon,
} from "../../../../icons/icons";
import iconButtonTypes from "../../../../types/iconButtonTypes";
import ConfItem from "../../../../components/ConfItem";

export default function InnerConfiguration() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headSearch}>
          <h2 className={styles.title}>Configuration</h2>
          <SearchQuick />
        </div>
        <Button text="Upload file" />
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
