import styles from "./planner-item.module.scss";
import './cron.scss'
import ButtonIcon from "../buttons/ButtonIcon/ButtonIcon";

import cn from "classnames";
import { MoreIcon, PathIcon, CheckIcon } from "icons";
import {useState} from "react";
import Cron from "react-js-cron";
import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import SubmitPlannerPopup from "../popups/SubmitPlannerPopup";

export default function PlannerItem({
  text,
  Icon = () => null,
  iconColor,
  hasError,
  globalStore,
  className,
}) {
  const [period, setPeriod] = useState('* * * * *')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <tr className={cn({ [styles.errorContainer]: hasError }, )}>
      <td>
        <ButtonIcon Icon={Icon} type={iconColor} />
      </td>
      {globalStore && <td className={styles.store}>20209</td>}
      <td className={styles.plannerItem__text + " " + className}>{text}</td>
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
        <Cron clearButton={false} value={period} setValue={setPeriod}/>
      </td>
      <td className={styles.plannerItem__end}>
        <DatePicker
          className={styles.date + ' ' + styles.date__end}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd.MM.yyyy H:mm"
          showTimeInput
        />
      </td>
      <td className={styles.buttons}>
        <div className={styles.buttonsWrap}>
          <Popup modal trigger={ <ButtonIcon Icon={CheckIcon} />}>
            {(close) => (
              <SubmitPlannerPopup
                onClose={close}
                plannerTask={{startDate, period, endDate}}
              />
            )}
          </Popup>
          <ButtonIcon Icon={MoreIcon} />
        </div>
      </td>
    </tr>
  );
}
