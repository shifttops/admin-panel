import styles from "./InnerStatistic.module.scss";
import { DateIcon } from "icons";
import cn from "classnames";
import Button from "components/buttons/Button";
import AdditionalInfo from "components/AdditionalInfo";
import { observer } from "mobx-react";
import StoresStore from "../../../../store/StoresStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const InnerStatistic = observer(() => {
  const { storeInfo, getMetrics } = StoresStore;
  const [error, setError] = useState(false);
  const location = useLocation();
  // avg_CASH: 35.014722891566265
  // avg_OECB: 12.630024096385542
  // avg_OEPE: 109.76281395348838
  // avg_OT: 37.99091860465116
  // avg_PRESENT: 40.4615
  // avg_TET
  const mapper = [
    {
      visibleName: "OEPE",
      key: "avg_OEPE",
    },
    {
      visibleName: "PRESENT",
      key: "avg_PRESENT",
    },
    {
      visibleName: "CASH",
      key: "avg_CASH",
    },
    {
      visibleName: "OECB",
      key: "avg_OECB",
    },
    {
      visibleName: "OT",
      key: "avg_OT",
    },
    {
      visibleName: "TET",
      key: "avg_TET",
    },
  ];

  useEffect(() => {
    const id =
      +location.pathname.split("/")[location.pathname.split("/").length - 1];
    if (storeInfo.store_id === id) {
      getMetrics(id, setError);
    }
  }, [storeInfo.store_id]);

  return (
    <>
      <div className={styles.head}>
        <h2 className={styles.title}>Metrics</h2>
        <Button Icon={DateIcon} text="Today" />
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
            {mapper.map((item) => (
              <tr key={item.visibleName}>
                <td className={styles.category}>{item.visibleName}</td>
                <td className={styles.period}>Today</td>
                <td
                  className={cn(
                    styles.time,
                    item.visibleName === "OEPE" &&
                      (storeInfo[item.key] < 120
                        ? styles.timeGreen
                        : styles.timeRed)
                  )}
                >
                  {storeInfo[item.key]
                    ? `${Math.round(storeInfo[item.key])} s`
                    : "N/A"}
                </td>
              </tr>
            ))}
            {/* <tr>
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
            </tr> */}
          </tbody>
        </table>
        <AdditionalInfo leftTitle="hardware" rightTitle="Last 24 hours" />
      </div>
    </>
  );
});

export default InnerStatistic;
