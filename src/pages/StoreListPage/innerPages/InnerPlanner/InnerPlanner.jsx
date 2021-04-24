import styles from "./inner-planner.module.scss";
import {
  CheckIcon,
  ErrorIcon,
  PauseIcon,
  PlannerIcon,
  PlayIcon,
  ProcessIcon,
} from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import iconButtonTypes from "types/iconButtonTypes";
import Button from "components/buttons/Button";
import PlannerItem from "components/PlannerItem";

export default function InnerPlanner() {
  return (
    <div className={styles.planner}>
      <div className={styles.planner__head}>
        <h2 className="title">Planner</h2>
        <div className={styles.planner__buttons}>
          <div className={styles.planner__process}>
            <ButtonIcon
              Icon={PlayIcon}
              type={iconButtonTypes.grey}
              className={styles.iconSwitcher}
            />
            <ButtonIcon Icon={CheckIcon} />
          </div>
          <ButtonIcon Icon={PlannerIcon} />
          <div className={styles.planner__button}>
            <Button text="New task" />
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <tr>
          <th />
          <th>Task name</th>
          <th>Start date</th>
          <th>Period</th>
          <th>End date</th>
          <th />
          <th />
        </tr>
        <tbody>
          <PlannerItem
            text="Record video from lateral cameras"
            Icon={PauseIcon}
            iconColor={iconButtonTypes.red}
          />
          <PlannerItem
            text="Recording video from external cameras"
            Icon={ProcessIcon}
            iconColor={iconButtonTypes.yellow}
          />
          <PlannerItem
            text="Recording video from external and internal cameras"
            Icon={PlayIcon}
            iconColor={iconButtonTypes.green}
          />
          <PlannerItem
            text="Recording video from the monitor"
            Icon={PlannerIcon}
            iconColor={iconButtonTypes.blue}
          />
          <PlannerItem
            text="Recording video from the monitor"
            hasError
            Icon={ErrorIcon}
            iconColor={iconButtonTypes.error}
          />
        </tbody>
      </table>
    </div>
  );
}
