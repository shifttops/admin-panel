import styles from "./activity-logs-page.module.scss";

import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import ActivityLogsStore from "../../store/ActivityLogsStore";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { useInView } from "react-intersection-observer";
import Loader from "../../components/Loader";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import Description from "../../components/Description";

const ActivityLogsPage = observer(() => {
  const { logs, getLogs, isLoading } = ActivityLogsStore;

  const [error, setError] = useState("");
  const [isSearchOrSort, setIsSearchOrSort] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });
  const [limit, setLimit] = useState(50);
  const [resCount, setResCount] = useState(0);

  const refLogs = useRef(false);
  const abortRef = useRef(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const items = [
    {
      name: "Тип события",
      key: "event_type",
    },
    {
      name: "Сообщение",
      key: "type",
    },
    {
      name: "АЗС ID",
      key: "store_id",
    },
    {
      name: "Дата",
      key: "date",
    },
  ];

  const sortTypes = ["none", "desc", "inc"];

  const handleSort = (field) => {
    if (sort.field === field) {
      setSort({
        field,
        type: sortTypes[(sortTypes.indexOf(sort.type) + 1) % sortTypes.length],
      });
    } else {
      setSort({ field, type: sortTypes[1] });
    }
  };

  useEffect(() => {
    if (abortRef.current && isLoading) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const { type, field } = sort;

    if (refLogs.current) {
      setIsSearchOrSort(true);
      getLogs({
        search,
        setError,
        field,
        type,
        limit,
        offset: 0,
        signal: abortRef.current.signal,
        setResCount,
      });
    }
  }, [search, sort]);

  useEffect(() => {
    if (!logs.get().length && !refLogs.current)
      getLogs({ limit, setResCount, setError });

    return () => logs.get().clear();
  }, []);

  useEffect(() => {
    refLogs.current = true;
  }, []);

  useEffect(() => {
    const { type, field } = sort;
    if (inView) {
      setIsSearchOrSort(false);
      getLogs({ search, setError, field, type, limit });
    }
  }, [inView]);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Активити логи</h2>
          <SearchQuick
            setSearch={setSearch}
            placeholderText={"Найти по АЗС ID"}
          />
        </div>
        {/*        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>*/}
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.table__sort}>
              <Checkbox label="Пользователь" />
            </th>
            {items.map((item) => (
              <th
                className={
                  styles.table__sort +
                  " " +
                  (item.key === sort.field && sort.type !== "none"
                    ? styles.selectedSort
                    : "")
                }
                onClick={() => handleSort(item.key)}
                key={item.key}
              >
                {item.name}
                <SortIcon
                  className={
                    item.key === sort.field && sort.type === "inc"
                      ? styles.invertedSvg
                      : ""
                  }
                />
              </th>
            ))}
            <th className={styles.table__sort}>Время</th>
            <th className={styles.table__sort} />
          </tr>
        </thead>
        <tbody>
          {logs.get().map((log) => (
            <tr key={`${log.error_time ? "Error " : ""}${log.id}`}>
              <td className={styles.name}>
                <Checkbox
                  className={styles.checkbox}
                  label={log.error_time ? "Fault Log" : "Jira Log"}
                />
              </td>
              <td>{log.event_type}</td>
              {log.error_time ? (
                <Description
                  className={styles.fail}
                  message={log.description}
                />
              ) : (
                <td className={styles.success}>Success</td>
              )}
              <td>{log.store_id}</td>
              <td>
                {moment(
                  log.error_time ? log.error_time : log.changed_on
                ).format("DD.MM.YYYY")}
              </td>
              <td>
                {moment(
                  log.error_time ? log.error_time : log.changed_on
                ).format("HH:mm")}
              </td>
              <td>
                <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
              </td>
            </tr>
          ))}
        </tbody>
        {isLoading && isSearchOrSort ? (
          <div className={styles.logsLoader + " " + styles.logsLoader__search}>
            <Loader />
          </div>
        ) : null}
      </table>
      {isLoading && !isSearchOrSort ? (
        <div className={styles.logsLoader}>
          <Loader />
        </div>
      ) : null}
      {logs.get().length && logs.get().length !== resCount && !isLoading ? (
        <div ref={ref} />
      ) : null}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default ActivityLogsPage;
