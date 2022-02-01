import { observer } from "mobx-react";
import styles from "./ticket-page.module.scss";
import TicketsStore from "../../store/TicketsStore";
import BackLink from "../../components/BackLink";
import routes from "../../constants/routes";
import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import {
  ArrowDownIcon,
  DeleteIcon,
  EditIcon,
  MoreIcon,
  ReturnGroupIcon,
  TimeIcon,
} from "../../icons";
import Popup from "reactjs-popup";
import PopupComponent from "../../components/popups/PopupComponent/PopupComponent";
import UserAccount from "../../components/UserAccount";
import ImageCard from "../../components/cards/ImageCard1";
import Lightbox from "react-image-lightbox";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import "./customDatePicker.scss";
import TicketAside from "../../components/Ticket/TicketAside";
import TicketComments from "../../components/Ticket/TicketComments";
import AddTicketPage from "./AddTicketPage";
import {
  ticketPriorityMapper,
  ticketStatusMapper,
  ticketTypesMapper,
} from "../../helpers/mappers";
import moment from "moment";
import DateComp from "../../components/Date";
import File from "../../components/File";
import cn from "classnames";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";

const TicketPage = observer((props) => {
  const history = useHistory();

  const {
    ticketInfo,
    getTicket,
    deleteTicket,
    editTicket,
    deleteTicketFile,
    isTicketFetching,
    isTicketDeleteFetching,
    isFilesFetching,
    isTicketCommentAddFetching,
    isCommentsFetching,
    assigneeList,
    isAssigneeListFetching,
  } = TicketsStore;

  const [isDetailsOpened] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAttachmentsVisible, setIsAttachmentsVisible] = useState(true);
  const [isLightBoxVisible, setIsLightBoxVisible] = useState(true);
  const [text, setText] = useState("");
  const [frTime, setFRTime] = useState(moment(new Date()));
  const [currentStatus, setCurrentStatus] = useState({});
  const [priority, setPriority] = useState(null);
  const [type, setType] = useState(null);
  const [otherType, setOtherType] = useState("");
  const [stores, setStores] = useState([]);
  const [assignee, setAssignee] = useState(null);

  const handleTicketDelete = async (close) => {
    const status = await deleteTicket({ id: +props.match.params.id });

    if (status === 204) history.push("/tickets");
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
    if (!Object.keys(ticketInfo).length && +props.match.params.id) {
      getTicket({ id: +props.match.params.id });
    }

    return () => {
      TicketsStore.ticketInfo = {};
    };
  }, []);

  return +props.match.params.id ? (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BackLink path={routes.tickets} text={"Back to tickets list"} />
        <div className={styles.header__info}>
          <h2 className={styles.title}>Ticket info</h2>
          {Object.keys(ticketInfo).length && !isTicketFetching ? (
            <div className={styles.header__buttons}>
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
                    dedicatedText={` [McD-${ticketInfo.id}] #${JSON.stringify(
                      stores
                    ).slice(1, -1)} ${type ? type.visibleName : null}`}
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
      {Object.keys(ticketInfo).length && !isTicketFetching ? (
        <>
          <div className={styles.ticket}>
            <div className={styles.ticket__body}>
              <div className={styles.ticket__name}>
                [McD-{ticketInfo.id}] #{JSON.stringify(stores).slice(1, -1)}{" "}
                {type
                  ? type.name !== "OTHER_TYPE"
                    ? type.visibleName
                    : otherType
                  : null}
              </div>
              <div className={styles.info}>
                <div className={styles.description}>
                  <div className={styles.description__header}>
                    <div className={styles.description__header__reporter}>
                      <UserAccount
                        className={styles.description__header__reporter}
                        accountName={
                          ticketInfo.owner_first_name.length
                            ? `${ticketInfo.owner_first_name} ${ticketInfo.owner_last_name}`
                            : ticketInfo.user
                            ? `User ${ticketInfo.user}`
                            : null
                        }
                      />
                      <p>raised by</p>
                      <span>Admin Panel</span>
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
                          ? () =>
                              setIsAttachmentsVisible((prevState) => !prevState)
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
            />
          </div>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.BOTTOM_RIGHT}
          />
        </>
      ) : (
        <div className={styles.loader}>
          {isTicketFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "No info about ticket"
          )}
        </div>
      )}
    </div>
  ) : (
    <AddTicketPage />
  );
});

export default TicketPage;
