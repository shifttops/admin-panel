import styles from "./planner-item.module.scss";
import "./cron.scss";
import ButtonIcon from "../buttons/ButtonIcon/ButtonIcon";

import cn from "classnames";
import { CheckIcon, DeleteIcon } from "icons";
import { useEffect, useRef, useState } from "react";
import Cron from "react-js-cron";
import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import SubmitPlannerPopup from "../popups/SubmitPlannerPopup";
import PlannerStore from "../../store/PlannerStore";

export default function PlannerItem({
  text,
  Icon = () => null,
  iconColor,
  hasError,
  setError,
  globalStore,
  className,
  taskData,
}) {
  const { getCrontab, handleChangeTask, deleteTask } = PlannerStore;
  const [isAllHostsOpened, setIsAllHostsOpen] = useState(false);

  const [task, setTask] = useState(JSON.parse(JSON.stringify(taskData)));
  const [period, setPeriod] = useState(
    task && task.crontab
      ? `${task.crontab.minute} ${task.crontab.hour} ${task.crontab.day_of_month} ${task.crontab.month_of_year} ${task.crontab.day_of_week}`
      : "* * * * *"
  );

  const [startDate, setStartDate] = useState(
    task && task.start_time ? new Date(task.start_time) : new Date()
  );
  const [endDate, setEndDate] = useState(
    task && task.expires ? new Date(task.expires) : new Date()
  );

  const handleEnabledChange = () => {
    setTask((prev) => {
      prev.enabled = !prev.enabled;
      return { ...prev };
    });
  };

  const handleChangeName = (value) => {
    if (value) {
      setTask((prev) => {
        prev.name = value;
        return { ...prev };
      });
    }
  };

  const handleDateChange = ({ date, isStartDate }) => {};

  const handleSaveTask = ({ task }) => {
    const tempTask = {};
    Object.keys(task).forEach((key) => {
      if (
        key !== "crontab" &&
        JSON.stringify(task[key]) !== JSON.stringify(taskData[key])
      ) {
        tempTask[key] = task[key];
      }
    });
    tempTask.pk = task.pk;
    if (endDate !== task.expires) {
      tempTask.expires = endDate;
    }
    if (startDate !== task.startTime) {
      tempTask.startTime = startDate;
    }
    let tempPeriod = period.split(" ");
    if (
      task.crontab.pk &&
      (task.crontab.minute !== tempPeriod[0] ||
        task.crontab.hour !== tempPeriod[1] ||
        task.crontab.day_of_week !== tempPeriod[4] ||
        task.crontab.day_of_month !== tempPeriod[2] ||
        task.crontab.month_of_year !== tempPeriod[3])
    ) {
      tempPeriod = {
        minute: tempPeriod[0],
        hour: tempPeriod[1],
        day_of_week: tempPeriod[4],
        day_of_month: tempPeriod[2],
        month_of_year: tempPeriod[3],
        // pk: task.crontab.pk,
      };
    }
    handleChangeTask({ task: tempTask, period: tempPeriod });
  };

  const ref = useRef();

  // useEffect(() => {
  //   if (task.crontab?.pk) {
  //     setPeriod(
  //       `${task.crontab.minute} ${task.crontab.hour} ${task.crontab.day_of_month} ${task.crontab.month_of_year} ${task.crontab.day_of_week}`
  //     );
  //   }
  // }, [task]);

  return (
    <tr className={cn({ [styles.errorContainer]: hasError })}>
      {/* <td>
        <ButtonIcon Icon={Icon} type={iconColor} />
      </td> */}
      {globalStore ? (
        <td className={styles.store}>
          {/* {task
            ? JSON.parse(task.kwargs).store_groups.map((store) => (
                <div key={`${task.name}${store}`}>{store}</div>
              ))
            : ""}
          {task
            ? JSON.parse(task.kwargs).server_ids
              ? JSON.parse(task.kwargs).server_ids.map((store) => (
                  <div key={`${task.name}${store}`}>{store}</div>
                ))
              : ""
            : ""} */}
          {isAllHostsOpened ? (
            <button
              className={styles.moreButton}
              onClick={() => setIsAllHostsOpen((prev) => !prev)}
            >
              Close
            </button>
          ) : (
            ""
          )}
          {task && task?.stores?.length
            ? isAllHostsOpened
              ? task.stores.join(", ")
              : task.stores.slice(0, 3).join(", ")
            : text}
          {task?.stores?.length > 3 && !isAllHostsOpened ? (
            <button
              className={styles.moreButton}
              onClick={() => setIsAllHostsOpen((prev) => !prev)}
            >
              See more
            </button>
          ) : (
            ""
          )}
        </td>
      ) : null}
      <td className={styles.plannerItem__text + " " + className}>
        <input
          type="text"
          value={task ? task.name : text}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        {/* {task ? task.name : text} */}
      </td>
      <td onClick={handleEnabledChange}>
        {task ? (task.enabled ? "Enabled" : "Disabled") : ""}
      </td>
      <td>{task && task.total_run_count}</td>
      {/* <td>
        {task && new Date(task.date_changed).toLocaleString().slice(0, -3)}
      </td> */}
      <td className={styles.plannerItem__date}>
        <DatePicker
          className={cn(
            styles.date
            // , { [styles.date__disabled]: globalStore }
          )}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd.MM.yyyy HH:mm"
          showTimeInput
          // disabled={globalStore}
        />
      </td>
      <td className={styles.plannerItem__period}>
        <Cron
          // disabled={globalStore}
          clearButton={false}
          value={period}
          setValue={setPeriod}
        />
      </td>
      <td className={styles.plannerItem__end}>
        <DatePicker
          className={cn(
            styles.date,
            styles.date__end
            // {[styles.date__disabled]: globalStore,}
          )}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd.MM.yyyy HH:mm"
          showTimeInput
          // disabled={globalStore}
        />
      </td>
      <td className={styles.buttons}>
        <div className={styles.buttonsWrap}>
          {/* {!globalStore ? ( */}
          <Popup
            modal
            trigger={
              <ButtonIcon className={styles.confirmIcon} Icon={CheckIcon} />
            }
          >
            {(close) => (
              <SubmitPlannerPopup
                onClose={close}
                onClick={() => handleSaveTask({ task })}
                plannerTask={{ startDate, period, endDate }}
              />
            )}
          </Popup>
          {/* ) : null} */}
          <ButtonIcon Icon={DeleteIcon} onClick={() => deleteTask(task.pk)} />
        </div>
      </td>
    </tr>
  );
}
