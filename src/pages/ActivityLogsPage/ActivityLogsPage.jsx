import styles from "./activity-logs-page.module.scss";

import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { DateIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import ActivityLogsStore from "../../store/ActivityLogsStore";
import { useEffect , useRef , useState } from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { useInView } from "react-intersection-observer";
import Loader from "../../components/Loader";

const ActivityLogsPage = observer(() => {
  const { jira_logs, logs, searchLogs, fault_logs, getJiraLogs, getFaultLogs, getFaultPart, getJiraPart, isLoading } =
    ActivityLogsStore;
  const [error, setError] = useState("");
  const [isSearchOrSort, setIsSearchOrSort] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });

  const refLogs = useRef(false);
  const abortRef = useRef(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const items = [
    {
      name: "Event type",
      key: "status",
    },
    {
      name: "Message",
      key: "description",
    },
    {
      name: "Store id",
      key: "store",
    },
    {
      name: "Date",
      key: "date",
    },
    {
      name: "Time",
      key: "time",
    },
  ];

  const sortFunc = (logs, sort) => {
    const { type, field } = sort;
    if (type !== "none" && field) {
      return [...logs].sort((a, b) => {
        if (field === "status") {
          if (!b[field]) {
            b = { ...b, [field]: "Store Error" };
          }
          if (!a[field]) {
            a = { ...a, [field]: "Store Error" };
          }
        }

        if (type === "desc") {
          if (field === "description") {
            return a[field] ? 1 : b[field] ? -1 : 0;
          } else return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
        } else {
          if (field === "description") {
            return a[field] ? -1 : b[field] ? 1 : 0;
          } else return b[field] > a[field] ? 1 : b[field] < a[field] ? -1 : 0;
        }
      });
    } else return logs;
  };

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
    getJiraLogs(setError);
    getFaultLogs(setError);
  }, []);

  useEffect(() => {
    if (abortRef.current && isLoading) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const { type, field } = sort;

    if (refLogs.current) {
      setIsSearchOrSort(true);
      getFaultPart({search, setError, field, type, limit: 50, offset: 0, signal: abortRef.current.signal});
      getJiraPart({search, setError, field, type, limit: 50, offset: 0, signal: abortRef.current.signal});
    }
  }, [search, sort]);

  useEffect(() => {
    refLogs.current = true;
  }, []);

  useEffect(() => {
    if(!logs.length && refLogs.current){
      getFaultPart({ search, setError, limit: 50 })
      getJiraPart({ search, setError, limit: 50 })
    }
  }, [logs.length])

  useEffect(() => {
    const { type, field } = sort;

    if (inView) {
      setIsSearchOrSort(false);
      getFaultPart({ search, setError, field, type, limit: 50 });
      getJiraPart({ search, setError, field, type, limit: 50 });
    }
  }, [inView]);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Activity logs</h2>
          <SearchQuick setSearch={setSearch} />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>
              <Checkbox label="user" />
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
            <th className={styles.table__sort}></th>
          </tr>
        </thead>
        <tbody>
          {   //logs.map((log) => (
              sortFunc(searchLogs(search), sort).map((log) => (
            <tr key={`${log.error_time ? "Error " : ""}${log.id}`}>
              <td className={styles.name}>
                <Checkbox
                  className={styles.checkbox}
                  label={log.error_time ? "Fault Log" : "Jira Log"}
                />
              </td>
              <td>{log.error_time ? "Store Error" : log.status}</td>
              <td className={log.error_time ? styles.fail : styles.success}>
                {log.error_time ? "Error" : "Success"}
              </td>
              <td>{log.store}</td>
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
            <div
                className={styles.logsLoader + " " + styles.logsLoader__search}
            >
              <Loader />
            </div>
        ) : (
            ""
        )}
      </table>
      {isLoading && !isSearchOrSort ? (
          <div className={styles.logsLoader}>
            <Loader />
          </div>
      ) : (
          ""
      )}
      {!isLoading ? <div ref={ref} /> : ""}
    </div>
  );
});

export default ActivityLogsPage;
