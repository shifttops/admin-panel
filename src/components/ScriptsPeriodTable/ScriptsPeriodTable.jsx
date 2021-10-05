import styles from "./scripts-period-table.module.scss";
import DatePicker from "react-datepicker";
import Cron from "react-js-cron";

export default function ScriptsPeriodTable({
    period,
    setPeriod,
    startDate,
    setStartDate,
    endDate,
    setEndDate}
  ) {
  return (
    <table className={styles.periodTable}>
      <thead className={styles.periodTable__head}>
        <tr>
          <th>Start date</th>
          <th>Period</th>
          <th>End date</th>
        </tr>
      </thead>
      <tbody className={styles.periodTable__body}>
        <tr>
          <td>
            <DatePicker
              className={styles.date}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd.MM.yyyy H:mm"
              showTimeInput
            />
          </td>
          <td>
            <Cron value={period} setValue={setPeriod} clearButton={false}/>
          </td>
          <td>
            <DatePicker
              className={styles.date + ' ' + styles.date__end}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd.MM.yyyy H:mm"
              showTimeInput
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
