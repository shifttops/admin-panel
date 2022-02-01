import { useHistory } from "react-router-dom";
import routes from "../../../constants/routes";
import styles from "./tickets-table-row.module.scss";
import UserAccount from "../../UserAccount";
import TicketStatus from "../../Ticket/TicketStatus";
import moment from "moment";
import {
  ticketStatusMapper,
  ticketTypesMapper,
} from "../../../helpers/mappers";

const TicketsTableRow = ({ ticket }) => {
  const history = useHistory();

  return (
    <tr
      key={`ticket-${ticket.id}`}
      onClick={() => history.push(`${routes.tickets}/${ticket.id}`)}
    >
      <td>
        {ticketTypesMapper.find((type) => type.name === ticket.type)
          ? ticketTypesMapper.find((type) => type.name === ticket.type)
              .visibleName
          : ticket.other_type
          ? ticket.other_type
          : "N/A"}
      </td>
      <td>McD-{ticket.id}</td>
      <td className={styles.titleField}>{ticket.name}</td>
      <td>
        <UserAccount
          accountName={
            ticket.user
              ? ticket.owner_first_name.length
                ? `${ticket.owner_first_name} ${ticket.owner_last_name}`
                : `User ${ticket.user}`
              : "N/A"
          }
        />
      </td>
      <td>
        <UserAccount
          accountName={
            ticket.assignee
              ? ticket.assignee_first_name.length
                ? `${ticket.assignee_first_name} ${ticket.assignee_last_name}`
                : `User ${ticket.assignee}`
              : "No assignee"
          }
        />
      </td>
      <td>
        <TicketStatus
          className={styles.status}
          currentStatus={
            ticket.status
              ? ticketStatusMapper.find(
                  (status) => status.name === ticket.status
                )
              : ticketStatusMapper.find((status) => status.name === "SUPPORT")
          }
          centered
        />
      </td>
      {/*<td>{moment(ticket.created).format("DD.MM.YYYY, HH:mm")}</td>*/}
      <td>{moment(ticket.first_response_time).format("DD.MM.YYYY, HH:mm")}</td>
    </tr>
  );
};

export default TicketsTableRow;
