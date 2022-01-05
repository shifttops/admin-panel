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
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import PlannerStore from "../../store/PlannerStore";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";

const PlannerPage = observer(() => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const history = useHistory();
  const { getPlannerTasks, plannerTasks, isFetching } = PlannerStore;

  useEffect(() => {
    getPlannerTasks({ setError });
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Planner</h2>
          <SearchQuick
            setSearch={setSearch}
            placeholderText={"Search by name"}
          />
        </div>
        <div className={styles.buttons}>
          {/*<div className={styles.group}>
            <ButtonIcon Icon={PlayIcon} type={iconButtonTypes.grey} />
            <ButtonIcon Icon={CheckIcon} />
          </div>
          <ButtonIcon Icon={PlannerIcon} className={styles.plannerIcon} />*/}
          <Button onClick={() => history.push("/scripts")} text="New task" />
        </div>
      </div>
      {!isFetching &&
      plannerTasks.length &&
      plannerTasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      ).length ? (
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              {/* <th /> */}
              <th>Store</th>
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
            {plannerTasks
              .filter((task) =>
                task.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((task) => (
                <PlannerItem
                  key={task.name}
                  className={styles.name}
                  globalStore
                  Icon={PauseIcon}
                  iconColor={iconButtonTypes.red}
                  taskData={task}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.loader}>
          {isFetching ? (
            <Loader types={["medium"]} />
          ) : !plannerTasks.length ? (
            "No planner tasks"
          ) : !plannerTasks.filter((task) =>
              task.name.toLowerCase().includes(search.toLowerCase())
            ).length ? (
            "Tasks with this name not founded"
          ) : null}
        </div>
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default PlannerPage;
