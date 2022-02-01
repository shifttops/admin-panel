import { observer } from "mobx-react";
import { useEffect } from "react";
import StoresStore from "../../../../store/StoresStore";
import styles from "./InnerTickets.module.scss";
import Loader from "../../../../components/Loader";
import TicketsTableRow from "../../../../components/tables/TicketsTableRow";
import cn from "classnames";
import { AddGroupIcon, SortIcon } from "../../../../icons";
import Button from "../../../../components/buttons/Button";
import routes from "../../../../constants/routes";
import { useHistory } from "react-router-dom";

const InnerTickets = observer((props) => {
  const history = useHistory();

  const { storeInfo, storeTickets, isTicketsFetching } = StoresStore;

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

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      storeTickets.set(null);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h2 className={styles.title}>Tickets</h2>
        <div className={styles.buttons}>
          <Button
            onClick={() => history.push(`${routes.tickets}/create-ticket`)}
            text={"Create new ticket"}
            Icon={AddGroupIcon}
          />
        </div>
      </div>
      {!isTicketsFetching && storeTickets.get() && storeTickets.get().length ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                {items.map((item) => (
                  <th>{item.visibleName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {storeTickets.get().map((ticket) => (
                <TicketsTableRow ticket={ticket} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className={styles.loader}>
          {isTicketsFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "No tickets on this store"
          )}
        </div>
      )}
    </div>
  );
});

export default InnerTickets;
