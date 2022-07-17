import styles from "./inner-planner.module.scss";
import { CheckIcon, PauseIcon, PlannerIcon, PlayIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import iconButtonTypes from "types/iconButtonTypes";
import Button from "components/buttons/Button";
import PlannerItem from "components/PlannerItem";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import StoresStore from "../../../../store/StoresStore";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import Loader from "../../../../components/Loader";
import { useHistory } from "react-router-dom";

const InnerPlanner = observer((props) => {
  const [error, setError] = useState("");
  const history = useHistory();
  const { storeInfo, periodicTasks, isPlannerFetching } = StoresStore;

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      periodicTasks.set(null);
    }
  }, []);

  return (
    <div className={styles.planner}>
      <div className={styles.planner__head}>
        <h2 className="title">Планировщик</h2>
        <div className={styles.planner__buttons}>
          {/*<div className={styles.planner__process}>
            <ButtonIcon
              Icon={PlayIcon}
              type={iconButtonTypes.grey}
              className={styles.iconSwitcher}
            />
            <ButtonIcon Icon={CheckIcon} />
          </div>
          <ButtonIcon Icon={PlannerIcon} />*/}
          <div className={styles.planner__button}>
            <Button onClick={() => history.push("/scripts")} text="Новая задача" />
          </div>
        </div>
      </div>

      {!isPlannerFetching &&
      periodicTasks.get() &&
      periodicTasks.get().length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              {/* <th /> */}
              <th>Task name</th>
              <th>Status</th>
              {/* <th>Total run count</th> */}
              {/* <th>Changed date</th> */}
              <th>Start date</th>
              <th>Period</th>
              <th>End date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {periodicTasks.get().map((task) => (
              <PlannerItem
                key={`store${storeInfo.store_id}-${task.name}`}
                taskData={task}
                Icon={PauseIcon}
                iconColor={iconButtonTypes.red}
                className={styles.name}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.loader}>
          {isPlannerFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "Нет задач для планировщика на этой АЗС"
          )}
        </div>
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default InnerPlanner;
