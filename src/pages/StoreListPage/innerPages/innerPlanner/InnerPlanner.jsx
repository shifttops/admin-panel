import styles from './innerPlanner.module.scss';
import {CheckIcon, PlannerIcon, PlayIcon} from '../../../../icons/icons';
import Button from '../../../../components/buttons/Button';
import PlannerItem from '../../../../components/PlannerItem/PlannerItem';
import ButtonIcon from "../../../../components/buttons/ButtonIcon/ButtonIcon";
import iconButtonTypes from "../../../../types/iconButtonTypes";

export default function InnerPlanner() {
  return (
    <div className={styles.planner}>
      <div className={styles.planner__head}>
        <h2 className="title">Planner</h2>
        <div className={styles.planner__buttons}>
          <div className={styles.planner__process}>
            <ButtonIcon Icon={PlayIcon} type={iconButtonTypes.grey}/>
            <ButtonIcon Icon={CheckIcon}/>
          </div>
          <ButtonIcon Icon={PlannerIcon}/>
          <div className={styles.planner__button}>
            <Button text="New task"/>
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <tr>
          <th/>
          <th>Task name</th>
          <th>Start date</th>
          <th>Period</th>
          <th>End date</th>
          <th/>
          <th/>
        </tr>
        <PlannerItem text="Record video from leteral cameras" Icon={PlayIcon} iconColor={iconButtonTypes.green}/>
        <PlannerItem text="Recording video from external and internal cameras" hasError Icon={PlayIcon} iconColor={iconButtonTypes.yellow}/>
      </table>
    </div>
  );
}
