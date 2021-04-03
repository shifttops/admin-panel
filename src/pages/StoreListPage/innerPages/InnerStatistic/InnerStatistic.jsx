import styles from "./InnerStatistic.module.scss";
import { DateIcon } from "icons";
import cn from "classnames";
import Button from "components/buttons/Button";
import AdditionalInfo from "components/AdditionalInfo";

export default function InnerStatistic() {
  return (
    <>
      <div className={styles.head}>
        <h2 className={styles.title}>Metrics</h2>
        <Button Icon={DateIcon} text="Last 24 hours" />
      </div>
      <div className={styles.wrapper}>
        <table className={styles.metrics}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Metrics</th>
              <th>Period</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.category}>OEPE</td>
              <td className={styles.period}>Last 24 hours</td>
              <td className={cn(styles.time, styles.timeGreen)}>190 s</td>
            </tr>
            <tr>
              <td className={styles.category}>PRESENT</td>
              <td className={styles.period}>Last 24 hours</td>
              <td className={cn(styles.time, styles.timeGreen)}>203 s</td>
            </tr>
            <tr>
              <td className={styles.category}>CASH</td>
              <td className={styles.period}>Last 24 hours</td>
              <td className={styles.time}>188 s</td>
            </tr>
            <tr>
              <td className={styles.category}>OECB</td>
              <td className={styles.period}>Last 24 hours</td>
              <td className={styles.time}>190 s</td>
            </tr>
            <tr>
              <td className={styles.category}>OT</td>
              <td className={styles.period}>Last 24 hours</td>
              <td className={styles.time}>217 s</td>
            </tr>
            <tr>
              <td className={styles.category}>TET</td>
              <td className={styles.period}>Last 24 hours</td>
              <td className={styles.time}>182 s</td>
            </tr>
          </tbody>
        </table>
        <AdditionalInfo leftTitle="hardware" rightTitle="Last 24 hours" />
      </div>
    </>
  );
}
