import styles from "./InnerStatistic.module.scss";
import { DateIcon } from "icons";
import cn from "classnames";
import Button from "components/buttons/Button";
import AdditionalInfo from "components/AdditionalInfo";
import { observer } from "mobx-react";
import StoresStore from "../../../../store/StoresStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../../../components/Loader";

const InnerStatistic = observer((props) => {
  const { storeInfo, metrics, isMetricsFetching } = StoresStore;
  const [error, setError] = useState(false);
  const location = useLocation();

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

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      metrics.set(null);
    }
  }, []);

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
            {!isMetricsFetching ? (
              metrics.get() &&
              mapper.map((item) => (
                <tr key={item.visibleName}>
                  <td className={styles.category}>{item.visibleName}</td>
                  <td className={styles.period}>Today</td>
                  <td
                    className={cn(
                      styles.time,
                      item.visibleName === "OEPE" &&
                        (metrics.get()[item.key] < 120
                          ? styles.timeGreen
                          : styles.timeRed)
                    )}
                  >
                    {metrics.get()[item.key]
                      ? `${Math.round(metrics.get()[item.key])} s`
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.loader}>
                <td />
                <Loader types={["medium"]} />
                <td />
              </tr>
            )}
          </tbody>
        </table>
        <AdditionalInfo leftTitle="hardware" rightTitle="Last 24 hours" />
      </div>
    </>
  );
});

export default InnerStatistic;
