import styles from "../../../pages/TicketPage/ticket-page.module.scss";
import UserAccount from "../../UserAccount";
import {
  ticketDetailsMapper,
  ticketPriorityMapper,
  ticketTypesMapper,
} from "../../../helpers/mappers";
import Select from "../../Select";
import StoresSelect from "../../StoresSelect";
import { useEffect, useRef, useState } from "react";
import Button from "../../buttons/Button";
import { ToastsStore } from "react-toasts";
import routes from "../../../constants/routes";
import { useHistory } from "react-router-dom";

const TicketDetails = ({
  ticket,
  isEditMode,
  priority,
  setPriority,
  type,
  setType,
  stores,
  setStores,
  assignee,
  setAssignee,
  assigneeList,
  isAssigneeListFetching,
  setOtherType,
  otherType,
}) => {
  const history = useHistory();
  const [mapper, setMapper] = useState(ticketDetailsMapper);

  useEffect(() => {
    const newMapper = [...mapper];

    if (
      type.name === "OTHER_TYPE" &&
      !newMapper.filter((item) => item.field === "other_type").length
    ) {
      newMapper.push({ title: "Other type", field: "other_type" });
      setMapper(newMapper);
    } else if (
      type.name !== "OTHER_TYPE" &&
      newMapper.filter((item) => item.field === "other_type").length
    ) {
      newMapper.splice(-1, 1);
      setMapper(newMapper);
    }
  }, [type]);

  return (
    <div className={styles.details}>
      {mapper.map((item) => (
        <div className={styles.details__body} key={`details-${item.field}`}>
          <div className={styles.details__body__title}>{item.title}</div>
          <div className={styles.details__body__field}>
            {item.field === "stores" ? (
              !isEditMode ? (
                stores.length ? (
                  stores.map((store, index) => (
                    <>
                      <span
                        className={styles.storeLink}
                        onClick={() =>
                          history.push(`${routes.innerTickets}/${store}`)
                        }
                      >
                        {store}
                      </span>
                      {index === stores.length - 1 ? "" : ", "}
                    </>
                  ))
                ) : (
                  "No stores selected"
                )
              ) : (
                <StoresSelect value={stores} onSelect={setStores} />
              )
            ) : item.field === "reporter" || item.field === "assignee" ? (
              item.field === "assignee" ? (
                isEditMode ? (
                  <Select
                    isFetching={isAssigneeListFetching}
                    mapper={
                      assigneeList.length
                        ? assigneeList.map((user) => ({
                            name: user.pk,
                            visibleName:
                              user.first_name.length && user.last_name.length
                                ? `${user.first_name} ${user.last_name}`
                                : user.username,
                          }))
                        : []
                    }
                    value={assignee}
                    onClick={(item) => setAssignee(item.name)}
                  />
                ) : (
                  <UserAccount
                    accountName={
                      ticket.assignee_first_name.length
                        ? `${ticket.assignee_first_name} ${ticket.assignee_last_name}`
                        : `User ${ticket.assignee}`
                    }
                  />
                )
              ) : (
                <UserAccount
                  accountName={
                    ticket.owner_first_name.length
                      ? `${ticket.owner_first_name} ${ticket.owner_last_name}`
                      : ticket.user
                      ? `User ${ticket.user}`
                      : null
                  }
                />
              )
            ) : item.field === "priority" ? (
              !isEditMode ? (
                priority ? (
                  priority.visibleName
                ) : (
                  "N/A"
                )
              ) : (
                <Select
                  field={item.field}
                  mapper={ticketPriorityMapper}
                  value={priority.name}
                  onClick={(item) => setPriority(item)}
                />
              )
            ) : item.field === "type" ? (
              !isEditMode ? (
                type ? (
                  type.visibleName
                ) : (
                  "N/A"
                )
              ) : (
                <Select
                  field={item.field}
                  mapper={ticketTypesMapper}
                  value={type.name}
                  onClick={(item) => setType(item)}
                />
              )
            ) : item.field === "other_type" && isEditMode ? (
              <Input onChange={setOtherType} initialValue={otherType} />
            ) : ticket[item.field] ? (
              ticket[item.field]
            ) : (
              "N/A"
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const Input = ({ onChange, initialValue }) => {
  const [text, setText] = useState(initialValue);

  const handleClick = () => {
    if (text.trim().length) onChange(text);
    else ToastsStore.error("Other type can`t be empty", 3000, "toast");
  };

  return (
    <div className={styles.otherType}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text !== initialValue ? (
        <Button text={"Set other type"} onClick={handleClick} />
      ) : null}
    </div>
  );
};

export default TicketDetails;
