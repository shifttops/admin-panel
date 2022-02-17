import { observer } from "mobx-react";
import { useEffect } from "react";
import StoresStore from "../../../../store/StoresStore";
import styles from "./InnerTickets.module.scss";
import Loader from "../../../../components/Loader";
import TicketsTableRow from "../../../../components/tables/TicketsTableRow";
import { AddGroupIcon, SortIcon } from "../../../../icons";
import Button from "../../../../components/buttons/Button";
import routes from "../../../../constants/routes";
import { useHistory } from "react-router-dom";
import { ticketsTableItems } from "../../../../helpers/mappers";
import { datesSort } from "../../../../helpers/functions/sort/datesSort";

const InnerTickets = observer((props) => {
  const history = useHistory();

  const { storeInfo, storeTickets, isTicketsFetching } = StoresStore;

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
                {ticketsTableItems.map((item) => (
                  <th>{item.visibleName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...storeTickets.get()]
                .sort((ticketLeft, ticketRight) =>
                  datesSort(
                    ticketLeft.first_response_time,
                    ticketRight.first_response_time
                  )
                )
                .map((ticket) => (
                  <TicketsTableRow
                    name={ticket.name}
                    reason={ticket.reason}
                    user={ticket.user}
                    owner_last_name={ticket.owner_last_name}
                    owner_first_name={ticket.owner_first_name}
                    id={ticket.id}
                    first_response_time={ticket.first_response_time}
                    assignee_last_name={ticket.assignee_last_name}
                    assignee_first_name={ticket.assignee_first_name}
                    assignee={ticket.assignee}
                    ticketType={ticket.type}
                    ticketStatus={ticket.status}
                    other_type={ticket.other_type}
                    customer_mail={ticket.customer_mail}
                  />
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
