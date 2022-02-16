import { observer } from "mobx-react";
import styles from "./tickets-page.module.scss";
import SearchQuick from "../../components/search/SearchQuick";
import { useEffect, useRef, useState } from "react";
import TicketsStore from "../../store/TicketsStore";
import Button from "../../components/buttons/Button";
import { useHistory } from "react-router-dom";
import routes from "../../constants/routes";
import { AddGroupIcon, BackIcon, DateIcon, SortIcon } from "../../icons";
import TicketsTableRow from "../../components/tables/TicketsTableRow";
import Loader from "../../components/Loader";
import { useInView } from "react-intersection-observer";
import cn from "classnames";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./customDateRangePicker.scss";
import moment from "moment";
import { ticketsTableItems } from "../../helpers/mappers";
import { handleSort } from "../../helpers/functions/sort/handleSort";
import { sortTypes } from "../../types/sortTypes";

const TicketsPage = observer(() => {
  const history = useHistory();

  const refTickets = useRef(false);
  const abortRef = useRef(false);

  let {
    tickets,
    getTickets,
    isTicketsFetching,
    statsPeriod: period,
    getAllTicketsByPeriod,
  } = TicketsStore;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ type: "desc", field: "id" });
  const [limit, setLimit] = useState(30);
  const [resCount, setResCount] = useState(0);
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [isPeriodSelected, setIsPeriodSelected] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const handlePeriodSelect = () => {
    setIsPeriodSelected(true);
    setIsDateRangeVisible(false);
  };

  const handlePeriodClear = () => {
    period.set({
      ...period,
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setIsPeriodSelected(false);
    setIsDateRangeVisible(false);
  };

  const handlePeriodChange = ({ selection: { startDate, endDate } }) => {
    if (isPeriodSelected) setIsPeriodSelected(false);
    period.set({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: "selection",
    });
  };

  useEffect(() => {
    if (abortRef.current && isTicketsFetching) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const { type, field } = sort;
    const { startDate: start, endDate: end } = period.get();

    if (refTickets.current) {
      if (isPeriodSelected) {
        getTickets({
          search,
          field,
          type,
          limit,
          offset: 0,
          signal: abortRef.current.signal,
          setResCount,
          start,
          end,
        });
      } else {
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
    }

    return () => TicketsStore.tickets.get().clear();
  }, [isPeriodSelected]);

  useEffect(() => {
    if (abortRef.current && isTicketsFetching) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const { type, field } = sort;
    const { startDate: start, endDate: end } = period.get();

    const reqBody = {
      search,
      field,
      type,
      limit,
      offset: 0,
      signal: abortRef.current.signal,
      setResCount,
    };
    if (isPeriodSelected) {
      reqBody.start = start;
      reqBody.end = end;
    }

    if (refTickets.current) {
      getTickets({
        ...reqBody,
      });
    }

    return () => TicketsStore.tickets.get().clear();
  }, [search, sort]);

  useEffect(() => {
    const { type, field } = sort;

    if (!tickets.get().length && !refTickets.current)
      getTickets({
        limit,
        setResCount,
        type,
        field,
      });
    refTickets.current = true;

    return () => TicketsStore.tickets.get().clear();
  }, []);

  useEffect(() => {
    const { type, field } = sort;
    const { startDate: start, endDate: end } = period.get();

    const reqBody = { search, field, type, limit, setResCount };
    if (isPeriodSelected) {
      reqBody.start = start;
      reqBody.end = end;
    }

    if (inView) {
      getTickets({ ...reqBody });
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
        {isPeriodSelected ? (
          <div className={styles.header__period}>
            <p>Chosen period: </p>
            <div>
              {[
                { title: "Start date", date: period.get().startDate },
                { title: "End date", date: period.get().endDate },
              ].map(({ title, date }) => (
                <div>
                  <span>{title}</span>: {moment(date).format("MMMM DD, YYYY")}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {isPeriodSelected && tickets.get().length ? (
          <div
            className={cn(styles.link, styles.link__withIcon)}
            onClick={() => {
              history.push(`${routes.tickets}/stats`);
              getAllTicketsByPeriod({
                start: period.get().startDate,
                end: period.get().endDate,
              });
            }}
          >
            Go to tickets stats page
            <span>
              <BackIcon />
            </span>
          </div>
        ) : null}
        <div className={styles.header__buttons}>
          <Button
            onClick={() => setIsDateRangeVisible((prevState) => !prevState)}
            text={`${
              isDateRangeVisible ? "Close" : "Choose period to analyse"
            } `}
            Icon={DateIcon}
            disabled={isTicketsFetching}
            className={`${isDateRangeVisible ? "maintenance" : null}`}
          />
          <Button
            onClick={() => history.push(`${routes.tickets}/create-ticket`)}
            text={"Create new ticket"}
            Icon={AddGroupIcon}
          />
        </div>
        {isDateRangeVisible ? (
          <div className={styles.dateRangePicker}>
            <DateRangePicker
              ranges={[period.get()]}
              onChange={handlePeriodChange}
              rangeColors={["#A9C23FFF"]}
            />
            <div className={styles.dateRangePicker__buttons}>
              <Button text={"Choose"} onClick={handlePeriodSelect} />
              <Button
                text={"Clear"}
                className={"maintenance"}
                onClick={handlePeriodClear}
              />
            </div>
          </div>
        ) : null}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {ticketsTableItems.map((item) => (
              <th
                className={cn(styles.table__sort, {
                  [styles.selectedSort]:
                    item.key === sort.field && sort.type !== "none",
                })}
                onClick={() =>
                  handleSort({ field: item.key, setSort, sort, sortTypes })
                }
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
            <TicketsTableRow
              name={ticket.name}
              other_type={ticket.other_type}
              ticketStatus={ticket.status}
              ticketType={ticket.type}
              assignee={ticket.assignee}
              assignee_first_name={ticket.assignee_first_name}
              assignee_last_name={ticket.assignee_last_name}
              first_response_time={ticket.first_response_time}
              id={ticket.id}
              owner_first_name={ticket.owner_first_name}
              owner_last_name={ticket.owner_last_name}
              user={ticket.user}
              reason={ticket.reason}
            />
          ))}
        </tbody>
      </table>
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
