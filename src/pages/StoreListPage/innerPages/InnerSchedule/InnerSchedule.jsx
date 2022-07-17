import StoresStore from "../../../../store/StoresStore";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Loader from "../../../../components/Loader";
import moment from "moment";
import styles from "./inner-schedule.module.scss";
import Button from "../../../../components/buttons/Button";
import { DateIcon } from "../../../../icons";
import DateRangePicker from "react-date-range/dist/components/DateRangePicker";
import useClickOutside from "../../../../helpers/hooks/useClickOutside";

const InnerSchedule = observer(
  ({
    match: {
      params: { id },
    },
  }) => {
    const dateRef = useRef(null);

    const { schedule, storeInfo, isScheduleFetching: isLoading } = StoresStore;

    const [isAllShown, setIsAllShown] = useState(false);
    const [isDatePickerShown, setIsDatePickerShown] = useState(false);
    const [period, setPeriod] = useState(null);

    const handlePeriodChange = ({ selection: { startDate, endDate } }) =>
      setPeriod({
        startDate,
        endDate,
        key: "selection",
      });

    useEffect(() => {
      if (isAllShown) {
        setPeriod(null);
      }
    }, [isAllShown]);

    // useEffect(() => {
    //   if (storeInfo.store_id === +id) {
    //     schedule.set(null);
    //   }
    //
    //   return () => schedule.set([]);
    // }, []);

    useClickOutside({
      ref: dateRef,
      onClickOutside: () => setIsDatePickerShown(false),
    });

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className="title">Schedule</h2>
          <div className={styles.buttons}>
            {isAllShown ? (
              <div ref={dateRef} className={styles.datepicker}>
                <Button
                  Icon={DateIcon}
                  onClick={() =>
                    setIsDatePickerShown((prevState) => !prevState)
                  }
                  text={`${isDatePickerShown ? "Close" : "Show"} date picker`}
                  className={isDatePickerShown ? "maintenance" : null}
                />
                {isDatePickerShown ? (
                  <div className={styles.datepicker__dropdown}>
                    <DateRangePicker
                      ranges={[
                        period
                          ? period
                          : {
                              startDate: new Date(),
                              endDate: new Date(),
                              key: "selection",
                            },
                      ]}
                      onChange={handlePeriodChange}
                      rangeColors={["#A9C23FFF"]}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className={styles.button}>
              <Button
                text={`Show ${isAllShown ? "latest" : "full"} schedule`}
                onClick={() => setIsAllShown((prevState) => !prevState)}
              />
            </div>
          </div>
        </div>
        {!isLoading && schedule.get() && schedule.get().length ? (
          <div className={styles.content}>
            <table className={styles.table}>
              <thead>
                <th>День недели</th>
                <th>Дата</th>
                <th>Время открытия</th>
                <th>Время закрытия</th>
              </thead>
              <tbody>
                {schedule
                  .get()
                  .filter(({ latest }) => (isAllShown ? true : latest))
                  .filter(({ start_datetime }) => {
                    return period && isAllShown
                      ? !moment(period.startDate).isSame(period.endDate)
                        ? moment(start_datetime).isBetween(
                            period.startDate,
                            period.endDate
                          )
                        : moment(start_datetime).isSame(period.startDate, "day")
                      : true;
                  })
                  .sort(
                    (
                      { start_datetime: createdA },
                      { start_datetime: createdB }
                    ) => {
                      const dateA = moment(createdA);
                      const dateB = moment(createdB);

                      if (dateA.isAfter(dateB)) return -1;
                      else if (dateA.isBefore(dateB)) return 1;
                      else return 0;
                    }
                  )
                  .map(({ start_datetime, end_datetime, latest }) => (
                    <tr className={latest ? styles.latest : null}>
                      <td>{moment(start_datetime).format("dddd")}</td>
                      <td>{moment(start_datetime).format("DD.MM.yyyy")}</td>
                      <td>{moment(start_datetime).format("HH:mm")}</td>
                      <td>{moment(end_datetime).format("HH:mm")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.loader}>
            {isLoading ? (
              <Loader types={["medium"]} />
            ) : (
              "No schedule for this store"
            )}
          </div>
        )}
      </div>
    );
  }
);

export default InnerSchedule;
