import { useHistory } from "react-router-dom";
import routes from "../../../constants/routes";
import styles from "./tickets-table-row.module.scss";
import UserAccount from "../../UserAccount";
import TicketStatus from "../../Ticket/TicketStatus";
import moment from "moment";
import {
  ticketReasonMapper,
  ticketStatusMapper,
  ticketTypesMapper,
} from "../../../helpers/mappers";

const TicketsTableRow = ({
  id,
  first_response_time,
  ticketType,
  ticketStatus,
  other_type,
  name,
  owner_first_name,
  owner_last_name,
  user,
  assignee,
  assignee_first_name,
  assignee_last_name,
  reason,
  customer_mail,
}) => {
  const history = useHistory();

  return (
    <tr
      key={`ticket-${id}`}
      onClick={() => history.push(`${routes.tickets}/${id}`)}
    >
      <td>
        {ticketTypesMapper.find((type) => type.name === ticketType)
          ? ticketTypesMapper.find((type) => type.name === ticketType)
              .visibleName
          : other_type
          ? other_type
          : "N/A"}
      </td>
      <td>McD-{id}</td>
      <td className={styles.titleField}>{name}</td>
      <td>
        <UserAccount
          accountName={
            user
              ? owner_first_name.length
                ? `${owner_first_name} ${owner_last_name}`
                : `User ${user}`
              : customer_mail
              ? customer_mail
              : "N/A"
          }
        />
      </td>
      <td>
        <UserAccount
          accountName={
            assignee
              ? assignee_first_name.length
                ? `${assignee_first_name} ${assignee_last_name}`
                : `User ${assignee}`
              : "No assignee"
          }
        />
      </td>
      <td>
        <TicketStatus
          className={styles.status}
          currentStatus={
            ticketStatus
              ? ticketStatusMapper.find(
                  (status) => status.name === ticketStatus.toUpperCase()
                )
              : ticketStatusMapper.find((status) => status.name === "SUPPORT")
          }
          centered={true}
        />
      </td>
      <td>
        <TicketStatus
          className={styles.status}
          currentStatus={
            reason
              ? ticketReasonMapper.find(
                  (reasonMapper) => reasonMapper.name === reason
                )
              : ticketReasonMapper.find((status) => status.name === "OTHER")
          }
          centered={true}
        />
      </td>
      {/*<td>{moment(ticket.created).format("DD.MM.YYYY, HH:mm")}</td>*/}
      <td>{moment(first_response_time).format("DD.MM.YYYY, HH:mm")}</td>
    </tr>
  );
};

export default TicketsTableRow;
