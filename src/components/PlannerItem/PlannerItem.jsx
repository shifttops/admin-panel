import styles from "./planner-item.module.scss";
import './cron.scss'
import ButtonIcon from "../buttons/ButtonIcon/ButtonIcon";

import cn from "classnames";
import { MoreIcon, PathIcon, CheckIcon } from "icons";
import {useEffect, useState} from "react";
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
  taskData
}) {
  const {getCrontab} = PlannerStore

  const [period, setPeriod] = useState('* * * * *')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(taskData ? new Date(taskData.expires) : new Date())

  useEffect(async () => {
    if(globalStore && taskData){
      const crontab_schedule = await getCrontab({setError, crontabId: taskData.crontab})
      if(crontab_schedule) setPeriod(`${crontab_schedule.minute} ${crontab_schedule.hour} ${crontab_schedule.day_of_week} ${crontab_schedule.day_of_month} ${crontab_schedule.month_of_year}`)
    }
  }, [taskData])

  return (
    <tr className={cn({ [styles.errorContainer]: hasError })}>
      <td>
        <ButtonIcon Icon={Icon} type={iconColor} />
      </td>
      {globalStore ? (
        <td className={styles.store}>
          {taskData ?
            JSON.parse(taskData.kwargs).store_groups.map((store) => (
              <div key={`${taskData.name}${store}`}>{store}</div>
            )) : ''}
          {taskData ?
            (JSON.parse(taskData.kwargs).server_ids ? JSON.parse(taskData.kwargs).server_ids.map((store) => (
              <div key={`${taskData.name}${store}`}>{store}</div>
            )) : '') : ''}
        </td>
      ) : ''}
      <td className={styles.plannerItem__text + " " + className}>
        {taskData ? taskData.name : text}
      </td>
      {globalStore ? (
        <td>{taskData ? (taskData.enabled ? "Enabled" : "Disabled") : ''}</td>
      ) : ''}
      {globalStore ? <td>{taskData && taskData.total_run_count}</td> : ''}
      {globalStore ? <td>{taskData && new Date(taskData.date_changed).toLocaleString().slice(0, -3)}</td> : ''}
      <td className={styles.plannerItem__date}>
        <DatePicker
          className={styles.date}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd.MM.yyyy H:mm"
          showTimeInput
        />
      </td>
      <td className={styles.plannerItem__period}>
        <Cron clearButton={false} value={period} setValue={setPeriod} />
      </td>
      <td className={styles.plannerItem__end}>
        <DatePicker
          className={styles.date + " " + styles.date__end}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd.MM.yyyy H:mm"
          showTimeInput
        />
      </td>
      <td className={styles.buttons}>
        <div className={styles.buttonsWrap}>
          <Popup modal trigger={<ButtonIcon Icon={CheckIcon} />}>
            {(close) => (
              <SubmitPlannerPopup
                onClose={close}
                plannerTask={{ startDate, period, endDate }}
              />
            )}
          </Popup>
          <ButtonIcon Icon={MoreIcon} />
        </div>
      </td>
    </tr>
  );
}
