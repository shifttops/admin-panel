import styles from "./scripts_logs_page.module.scss";

import SearchQuick from "components/search/SearchQuick";
import { DateIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import ScriptsStore from "../../store/ScriptsStore";
import routes from "../../constants/routes";
import { useHistory } from "react-router";
import { useInView } from "react-intersection-observer";
import Loader from "../../components/Loader";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

const ScriptsLogsPage = observer(() => {
  const {
    isLoading,
    logs,
    running_logs,
    getScriptsLogs,
    getScriptsRunningLogs,
  } = ScriptsStore;
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });
  const [limit, setLimit] = useState(50);
  const [resCount, setResCount] = useState(0);
  const [isSearchOrSort, setIsSearchOrSort] = useState(false);

  const history = useHistory();

  const handleLogClick = (task_id) => {
    history.push(`${routes.scripts_logs}/${task_id}`);
  };

  const mapper = [
    {
      visibleName: "ID",
      key: "task_id",
    },
    {
      visibleName: "Name",
      key: "playbook_name",
    },
    {
      visibleName: "Servers",
      key: "servers",
    },
    {
      visibleName: "Variables",
      key: "variables",
    },
  ];

  const doneScriptsMapper = [
    {
      visibleName: "ID",
      key: "log_id",
    },
    {
      visibleName: "State",
      key: "state",
    },
    {
      visibleName: "Issuing time",
      key: "issuing_time",
    },
    {
      visibleName: "Finishing time",
      key: "finishing_time",
    },
    {
      visibleName: "Variables",
      key: "arguments",
    },
    {
      visibleName: "Playbook ID",
      key: "playbook",
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

  const refScriptLogs = useRef(false);
  const abortRef = useRef(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (abortRef.current && isLoading) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const { type, field } = sort;

    if (refScriptLogs.current) {
      setIsSearchOrSort(true);
      getScriptsLogs({
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

    return () => logs.get().clear();
  }, [search, sort]);

  useEffect(() => {
    getScriptsRunningLogs(setError);

    if (
      !logs.get().length &&
      !search.length &&
      !sort.field &&
      !refScriptLogs.current
    )
      getScriptsLogs({ limit, setResCount, setError });
  }, []);

  useEffect(() => {
    refScriptLogs.current = true;
  }, []);

  useEffect(() => {
    const { type, field } = sort;
    if (inView) {
      setIsSearchOrSort(false);
      getScriptsLogs({ search, setError, field, type, limit });
    }
  }, [inView]);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Scripts logs</h2>
          <SearchQuick
            setSearch={setSearch}
            placeholderText={"Search by playbook"}
          />
        </div>
        {/*        <div className={styles.button}>
          <Button className={styles.btnBorder} text="Report" />
          <Button Icon={DateIcon} text="Last 24 hours" />
        </div>*/}
      </div>
      {running_logs.length ? (
        <>
          <p className={styles.logs_type_name}>Running scripts</p>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {mapper.map((item) => (
                  <th key={item.key}>{item.visibleName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {running_logs.map((log) => (
                <tr
                  key={log.task_id}
                  onClick={() => handleLogClick(log.task_id)}
                >
                  {mapper.map((item) => (
                    <td key={item.key}>
                      {JSON.stringify(log[item.key], null, "\t")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
      <div>
        <p className={styles.logs_type_name}>Done Logs</p>
        <table className={`${styles.table} ${styles.all_logs_table}`}>
          <thead className={styles.tableHead}>
            <tr>
              {doneScriptsMapper.map((item) => (
                <th
                  className={
                    item.key === sort.field && sort.type !== "none"
                      ? styles.selectedSort
                      : ""
                  }
                  onClick={() => handleSort(item.key)}
                  key={item.key}
                >
                  {item.visibleName}
                  <SortIcon
                    className={
                      item.key === sort.field && sort.type === "inc"
                        ? styles.invertedSvg
                        : ""
                    }
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.get().map((log) => (
              <tr key={log.log_id} onClick={() => handleLogClick(log.log_id)}>
                {doneScriptsMapper.map((item) => (
                  <td key={item.key}>
                    {item.key === "issuing_time" ||
                    item.key === "finishing_time"
                      ? log[item.key]
                        ? `${new Date(
                            log[item.key]
                          ).toLocaleDateString()} ${new Date(
                            log[item.key]
                          ).toLocaleTimeString()}`
                        : "N/A"
                      : item.key === "arguments"
                      ? JSON.stringify(JSON.parse(log[item.key]), null, "\t")
                      : log[item.key]
                      ? JSON.stringify(log[item.key], null, "\t")
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {isLoading && isSearchOrSort ? (
            <div
              className={
                styles.scriptLogsLoader + " " + styles.scriptLogsLoader__search
              }
            >
              <Loader />
            </div>
          ) : null}
        </table>
      </div>
      {isLoading && !isSearchOrSort ? (
        <div className={styles.scriptLogsLoader}>
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

export default ScriptsLogsPage;
