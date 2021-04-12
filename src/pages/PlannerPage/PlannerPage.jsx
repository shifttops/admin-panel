import styles from "./planner-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import {
  CheckIcon,
  ErrorIcon,
  PauseIcon,
  PlannerIcon,
  PlayIcon,
  ProcessIcon,
  SortIcon,
} from "icons";
import Button from "components/buttons/Button";
import iconButtonTypes from "types/iconButtonTypes";
import PlannerItem from "components/PlannerItem";

export default function PlannerPage() {
  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Planner</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <div className={styles.group}>
            <ButtonIcon Icon={PlayIcon} type={iconButtonTypes.grey} />
            <ButtonIcon Icon={CheckIcon} />
          </div>
          <ButtonIcon Icon={PlannerIcon} className={styles.plannerIcon} />
          <Button text="New task" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th />
            <th>Store</th>
            <th>Task name</th>
            <th>START DATE</th>
            <th>Period</th>
            <th>END DATE</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <PlannerItem
            className={styles.name}
            globalStore
            text="Record video from lateral cameras"
            Icon={PauseIcon}
            iconColor={iconButtonTypes.red}
          />
          <PlannerItem
            className={styles.name}
            globalStore
            text="Record video from lateral cameras"
            Icon={ErrorIcon}
            iconColor={iconButtonTypes.error}
          />
        </tbody>
      </table>
    </div>
  );
}
