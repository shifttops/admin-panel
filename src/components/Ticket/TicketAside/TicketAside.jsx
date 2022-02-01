import TicketsSLA from "../TicketsSLA";
import TicketDetails from "../TicketDetails";
import styles from "./aside.module.scss";
import TicketStatus from "../TicketStatus";
import withDropDown from "../../../helpers/HOC/withDropDown";

const TicketAside = ({
  ticket,
  isEditMode,
  isDetailsOpened,
  frTime,
  setFRTime,
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
}) => {
  const asideMapper = [
    {
      Component: TicketsSLA,
      title: "SLA`s",
      props: {
        isEditMode,
        frTime,
        setFRTime,
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
