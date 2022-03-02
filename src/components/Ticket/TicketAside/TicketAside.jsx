import TicketsSLA from "../TicketsSLA";
import TicketDetails from "../TicketDetails";
import styles from "./aside.module.scss";
import TicketStatus from "../TicketStatus";
import withDropDown from "../../../helpers/HOC/withDropDown";
import moment from "moment";

const TicketAside = ({
  ticket,
  isEditMode,
  isDetailsOpened,
  currentStatus,
  setCurrentStatus,
  priority,
  setPriority,
  type,
  setType,
  setStores,
  stores,
  assignee,
  setAssignee,
  assigneeList,
  isAssigneeListFetching,
  setOtherType,
  otherType,
  reason,
  setReason,
}) => {
  const asideMapper = [
    {
      Component: TicketsSLA,
      title: "SLA`s",
      props: {
        frTime: ticket.first_response_time
          ? moment(ticket.first_response_time).add(3, "hours")
          : moment(new Date()),
      },
    },
    {
      Component: TicketDetails,
      title: "Details",
      props: {
        ticket,
        isEditMode,
        priority,
        setPriority,
        type,
        setType,
        setStores,
        stores,
        assignee,
        setAssignee,
        assigneeList,
        isAssigneeListFetching,
        setOtherType,
        otherType,
        reason,
        setReason,
      },
    },
  ];

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__status}>
        <TicketStatus
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          haveDropDown={isEditMode}
        />
      </div>
      {asideMapper.map(({ Component, title, props }) => (
        <div key={`aside-${title}`}>
          {withDropDown({
            Component,
            title,
            opened: isDetailsOpened,
            ...{ ...props },
          })}
        </div>
      ))}
    </aside>
  );
};

export default TicketAside;
