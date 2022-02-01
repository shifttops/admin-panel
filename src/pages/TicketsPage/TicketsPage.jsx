import { observer } from "mobx-react";
import styles from "./tickets-page.module.scss";
import SearchQuick from "../../components/search/SearchQuick";
import { useEffect, useRef, useState } from "react";
import Checkbox from "../../components/Checkbox";
import TicketsStore from "../../store/TicketsStore";
import Button from "../../components/buttons/Button";
import { useHistory } from "react-router-dom";
import routes from "../../constants/routes";
import { AddGroupIcon, SortIcon } from "../../icons";
import TicketsTableRow from "../../components/tables/TicketsTableRow";
import StoresStore from "../../store/StoresStore";
import Loader from "../../components/Loader";
import { useInView } from "react-intersection-observer";
import cn from "classnames";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

const TicketsPage = observer(() => {
  const { tickets, getTickets, isTicketsFetching } = TicketsStore;

  const history = useHistory();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "none" });
  const [limit, setLimit] = useState(30);
  const [resCount, setResCount] = useState(0);

  const refTickets = useRef(false);
  const abortRef = useRef(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const items = [
    {
      visibleName: "Type",
      key: "type",
    },
    {
      visibleName: "Key",
      key: "id",
    },
    {
      visibleName: "Summary",
      key: "name",
    },
    {
      visibleName: "Reporter",
      key: "user",
    },
    {
      visibleName: "Assignee",
      key: "assignee",
    },
    {
      visibleName: "Status",
      key: "status",
    },
    {
      visibleName: "Created",
      key: "created",
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
    if (abortRef.current && isTicketsFetching) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const { type, field } = sort;

    if (refTickets.current) {
      getTickets({
        search,
        field,
        type,
        limit,
        offset: 0,
        signal: abortRef.current.signal,
        setResCount,
      });
    }

    return () => TicketsStore.tickets.get().clear();
  }, [search, sort]);

  useEffect(() => {
    if (!tickets.get().length)
      getTickets({
        limit,
        setResCount,
      });

    return () => TicketsStore.tickets.get().clear();
  }, []);

  useEffect(() => {
    refTickets.current = true;
  }, []);

  useEffect(() => {
    const { type, field } = sort;
    if (inView) {
      getTickets({ search, field, type, limit, setResCount });
    }
  }, [inView]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__info}>
          <h2 className={styles.title}>Tickets</h2>
          <SearchQuick
            placeholderText={"Find ticket..."}
            setSearch={setSearch}
          />
        </div>
        <div className={styles.header__button}>
          <Button
            onClick={() => history.push(`${routes.tickets}/create-ticket`)}
            text={"Create new ticket"}
            Icon={AddGroupIcon}
          />
        </div>
      </div>
      {tickets.get().length && !isTicketsFetching ? (
        <table className={styles.table}>
          <thead>
            <tr>
              {items.map((item) => (
                <th
                  className={cn(styles.th, {
                    [styles.th__selected]:
                      item.key === sort.field && sort.type !== "none",
                  })}
                  onClick={() => handleSort(item.key)}
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
            {tickets.get().map((ticket) => (
              <TicketsTableRow ticket={ticket} />
            ))}
          </tbody>
        </table>
      ) : isTicketsFetching ? null : (
        <div className={styles.loader}>
          No tickets. You can add ticket{" "}
          <span
            className={styles.link}
            onClick={() => history.push(`${routes.tickets}/create-ticket`)}
          >
            here
          </span>
        </div>
      )}
      {isTicketsFetching ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : null}
      {tickets.get().length &&
      tickets.get().length !== resCount &&
      !isTicketsFetching ? (
        <div className={styles.emptyBlock} ref={ref} />
      ) : null}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default TicketsPage;
