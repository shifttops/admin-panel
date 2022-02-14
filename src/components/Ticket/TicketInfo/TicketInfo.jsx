import { observer } from "mobx-react";
import styles from "./ticket-info.module.scss";
import UserAccount from "../../UserAccount";
import DateComp from "../../Date";
import cn from "classnames";
import {
  ArrowDownIcon,
  DeleteIcon,
  EditIcon,
  ReturnGroupIcon,
} from "../../../icons";
import File from "../../File";
import Loader from "../../Loader";
import TicketComments from "../TicketComments";
import TicketAside from "../TicketAside";
import { useHistory } from "react-router-dom";
import TicketsStore from "../../../store/TicketsStore";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  ticketPriorityMapper,
  ticketReasonMapper,
  ticketStatusMapper,
  ticketTypesMapper,
} from "../../../helpers/mappers";
import { ToastsStore } from "react-toasts";
import BackLink from "../../BackLink";
import routes from "../../../constants/routes";
import Button from "../../buttons/Button";
import Popup from "reactjs-popup";
import PopupComponent from "../../popups/PopupComponent/PopupComponent";
import InputPopup from "../../popups/InputPopup";

const TicketInfo = observer(({ id }) => {
  const history = useHistory();

  const {
    ticketInfo,
    getTicket,
    deleteTicket,
    editTicket,
    sendTicketByEmail,
    deleteTicketFile,
    isTicketFetching,
    isTicketDeleteFetching,
    isFilesFetching,
    isTicketCommentAddFetching,
    isCommentsFetching,
    assigneeList,
    isAssigneeListFetching,
    isTicketAnswerFetching,
  } = TicketsStore;

  const [isDetailsOpened] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAttachmentsVisible, setIsAttachmentsVisible] = useState(true);
  // const [isLightBoxVisible, setIsLightBoxVisible] = useState(true);

  const [text, setText] = useState("");
  const [frTime, setFRTime] = useState(moment(new Date()));
  const [currentStatus, setCurrentStatus] = useState({});
  const [priority, setPriority] = useState(null);
  const [type, setType] = useState(null);
  const [otherType, setOtherType] = useState("");
  const [stores, setStores] = useState([]);
  const [assignee, setAssignee] = useState(null);
  const [reason, setReason] = useState(null);

  const handleTicketDelete = async (close) => {
    const status = await deleteTicket({ id });

    if (+status === 204) history.push("/tickets");
    close();
  };

  const validateEditing = () => {
    if (!!(text !== ticketInfo.description && text.trim().length)) return true;
    else if (
      !moment(frTime).isSame(
        ticketInfo.first_response_time
          ? moment(ticketInfo.first_response_time).add(3, "hours")
          : moment(new Date())
      )
    )
      return true;
    else if (assignee !== ticketInfo.assignee) return true;
    else if (
      currentStatus.name !==
      ticketStatusMapper.find(
        (ticketStatus) => ticketInfo.status === ticketStatus.name
      ).name
    )
      return true;
    else if (
      reason.name !==
      (ticketInfo.reason
        ? ticketReasonMapper.find(
            (ticketReason) => ticketInfo.reason === ticketReason.name
          ).name
        : "OTHER")
    )
      return true;
    else if (
      priority.name !==
      ticketPriorityMapper.find(({ name }) => name === ticketInfo.priority).name
    )
      return true;
    else if (
      type.name !==
      ticketTypesMapper.find(({ name }) => name === ticketInfo.type)?.name
    )
      return true;
    else if (
      type.name === "OTHER_TYPE" &&
      otherType.trim().length &&
      (ticketInfo.other_type
        ? ticketInfo.other_type.toLowerCase() !== otherType.toLowerCase()
        : true)
    )
      return true;
    else
      return (
        !!stores.length &&
        (stores
          .map((store) => {
            return ticketInfo.stores.indexOf(store) === -1;
          })
          .includes(true) ||
          stores.length !== ticketInfo.stores.length)
      );
  };

  const handleEditSave = () => {
    if (validateEditing()) {
      editTicket({
        data: {
          status: currentStatus.name,
          description: text,
          first_response_time: frTime,
          priority: priority.name,
          type: type.name,
          otherType,
          stores,
          assignee,
          reason: reason.name,
        },
      });
      setIsEditMode(false);
    } else ToastsStore.error("No changes to save", 3000, "toast");
  };

  const setFields = () => {
    setText(
      ticketInfo.description && ticketInfo.description.length
        ? ticketInfo.description
        : ""
    );
    // setFRTime(
    //   ticketInfo.created
    //     ? moment(ticketInfo.created).add(3, "hours")
    //     : moment(new Date())
    // );
    setFRTime(
      ticketInfo.first_response_time
        ? moment(ticketInfo.first_response_time).add(3, "hours")
        : moment(new Date())
    );
    setCurrentStatus(
      ticketStatusMapper.find(
        (ticketStatus) => ticketInfo.status === ticketStatus.name
      )
        ? ticketStatusMapper.find(
            (ticketStatus) => ticketInfo.status === ticketStatus.name
          )
        : ticketStatusMapper.find(
            (ticketStatus) => ticketStatus.name === "SUPPORT"
          )
    );
    setReason(
      ticketReasonMapper.find(
        (ticketReason) => ticketInfo.reason === ticketReason.name
      )
        ? ticketReasonMapper.find(
            (ticketReason) => ticketInfo.reason === ticketReason.name
          )
        : ticketReasonMapper.find(
            (ticketReason) => ticketReason.name === "OTHER"
          )
    );
    setPriority(
      ticketPriorityMapper.find(({ name }) => name === ticketInfo.priority)
        ? ticketPriorityMapper.find(({ name }) => name === ticketInfo.priority)
        : null
    );
    setType(
      ticketTypesMapper.find(({ name }) => name === ticketInfo.type)
        ? ticketTypesMapper.find(({ name }) => name === ticketInfo.type)
        : /*        : ticketInfo.other_type
        ? ticketTypesMapper.find(({ name }) => name === "OTHER_TYPE")*/
          null
    );
    setOtherType(ticketInfo.other_type ? ticketInfo.other_type : null);
    setStores(
      ticketInfo.stores && ticketInfo.stores.length ? ticketInfo.stores : []
    );
    setAssignee(ticketInfo.assignee ? ticketInfo.assignee : "No assignee");
  };

  useEffect(() => {
    if (!isEditMode) setFields();
  }, [isEditMode]);

  useEffect(() => {
    if (Object.keys(ticketInfo)) setFields();
  }, [ticketInfo]);

  useEffect(() => {
    if (!Object.keys(ticketInfo).length && id) {
      getTicket({ id });
    }

    return () => {
      TicketsStore.ticketInfo = {};
    };
  }, []);

  return Object.keys(ticketInfo).length && !isTicketFetching ? (
    <>
      <div className={styles.header}>
        <BackLink path={routes.tickets} text={"Back to tickets list"} />
        <div className={styles.header__info}>
          <h2 className={styles.title}>Ticket info</h2>
          {Object.keys(ticketInfo).length && !isTicketFetching ? (
            <div className={styles.header__buttons}>
              {ticketInfo.from_mail ? (
                <Popup
                  modal
                  trigger={
                    <Button
                      text={"Send answer to reporter email"}
                      fetching={isTicketAnswerFetching}
                    />
                  }
                >
                  {(close) => (
                    <InputPopup
                      link={ticketInfo.customer_mail}
                      titleText={"Send to email"}
                      text={"Write your message to "}
                      buttonText={"Send"}
                      placeholder={"Type message..."}
                      onClose={close}
                      onClick={(message) => sendTicketByEmail({ message })}
                    />
                  )}
                </Popup>
              ) : null}
              {isEditMode ? (
                <>
                  <Button onClick={handleEditSave} text={"Save changes"} />
                  <Button
                    onClick={() => setIsEditMode(false)}
                    Icon={ReturnGroupIcon}
                    text={"Leave edit mode"}
                  />
                </>
              ) : (
                <Button
                  onClick={() => setIsEditMode(true)}
                  Icon={EditIcon}
                  text={"Edit"}
                />
              )}
              <Popup
                modal
                trigger={
                  <Button
                    Icon={DeleteIcon}
                    text={"Delete"}
                    className={"maintenance"}
                    fetching={isTicketDeleteFetching}
                  />
                }
              >
                {(close) => (
                  <PopupComponent
                    titleText={"Delete"}
                    text={"You sure you want to delete"}
                    dedicatedText={`${ticketInfo.name}`}
                    additionalText={"?"}
                    buttonText={"Delete"}
                    onClose={close}
                    onClick={() => handleTicketDelete(close)}
                  />
                )}
              </Popup>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.ticket}>
        <div className={styles.ticket__body}>
          <div className={styles.ticket__name}>{ticketInfo.name}</div>
          <div className={styles.info}>
            <div className={styles.description}>
              <div className={styles.description__header}>
                <div className={styles.description__header__reporter}>
                  <UserAccount
                    className={styles.description__header__reporter}
                    accountName={
                      ticketInfo.owner_first_name &&
                      ticketInfo.owner_first_name.length
                        ? `${ticketInfo.owner_first_name} ${ticketInfo.owner_last_name}`
                        : ticketInfo.user
                        ? `User ${ticketInfo.user}`
                        : "N/A"
                    }
                  />
                  <p>raised by</p>
                  <span>{ticketInfo.from_mail ? "E-mail" : "Admin Panel"}</span>
                </div>
                <span className={styles.description__header__date}>
                  {/*{ticketInfo.created ? (*/}
                  {/*  <DateComp date={ticketInfo.created} />*/}
                  {/*) : null}*/}
                  {ticketInfo.first_response_time ? (
                    <DateComp date={ticketInfo.first_response_time} />
                  ) : null}
                </span>
              </div>
              <div className={styles.description__text}>
                {isEditMode ? (
                  <>
                    <span className={styles.subtitle}>New description</span>
                    <textarea
                      autoFocus
                      defaultValue={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </>
                ) : text.length ? (
                  <>
                    <span className={styles.subtitle}>Description</span>
                    {text}
                  </>
                ) : null}
              </div>
              <div className={styles.attachments}>
                <span
                  className={cn(styles.subtitle, styles.attachments__title)}
                  onClick={
                    ticketInfo.files && ticketInfo.files.length
                      ? () => setIsAttachmentsVisible((prevState) => !prevState)
                      : null
                  }
                >
                  Attachments(
                  {ticketInfo.files ? ticketInfo.files.length : 0})
                  {ticketInfo.files && ticketInfo.files.length ? (
                    <ArrowDownIcon
                      color={"rgba(51, 51, 51, 0.5)"}
                      isOpen={isAttachmentsVisible}
                    />
                  ) : null}
                </span>
                {isAttachmentsVisible && !isFilesFetching ? (
                  <div className={styles.attachments__items}>
                    {ticketInfo.files.map((file) => (
                      <File
                        file={file}
                        withMore={isEditMode}
                        onDelete={() => deleteTicketFile({ id: file.pk })}
                        cardFile
                      />
                    ))}
                  </div>
                ) : null}
                {isFilesFetching ? (
                  <div className={styles.loader}>
                    <Loader types={["small"]} />
                  </div>
                ) : null}
                {/*<Lightbox
                    mainSrc={`${process.env.REACT_APP_URL}${ticketInfo.files[0].url}`}
                    onCloseRequest={() => setIsLightBoxVisible(false)}
                    />*/}
              </div>
            </div>
            <TicketComments
              isSending={isTicketCommentAddFetching}
              comments={ticketInfo.ticket_comments}
              isFetching={isCommentsFetching}
            />
          </div>
        </div>
        <TicketAside
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          ticket={ticketInfo}
          isDetailsOpened={isDetailsOpened}
          isEditMode={isEditMode}
          frTime={frTime}
          setFRTime={setFRTime}
          priority={priority}
          setPriority={setPriority}
          type={type}
          setType={setType}
          stores={stores}
          setStores={setStores}
          assignee={assignee}
          setAssignee={setAssignee}
          assigneeList={assigneeList.get()}
          isAssigneeListFetching={isAssigneeListFetching}
          otherType={otherType}
          setOtherType={setOtherType}
          reason={reason}
          setReason={setReason}
        />
      </div>
    </>
  ) : (
    <div className={styles.loader}>
      {isTicketFetching ? (
        <Loader types={["medium"]} />
      ) : (
        "No info about ticket"
      )}
    </div>
  );
});

export default TicketInfo;
