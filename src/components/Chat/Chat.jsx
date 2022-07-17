import React, { useEffect, useState } from "react";
import styles from "./chat.module.scss";
import ButtonIcon from "../buttons/ButtonIcon";
import {
  CloseIcon,
  DateIcon,
  FavoriteFillIcon,
  FavoriteStrokeIcon,
  MoreIcon,
} from "../../icons";
import MessageItem from "../MessageItem";
import ChatInput from "./ChatInput";
import moment from "moment";
import cn from "classnames";
import DatePicker from "react-datepicker";
import Button from "../buttons/Button";
import "./customDatePicker.scss";
import Loader from "../Loader";
import AttachmentsField from "./AttachmentsField";
import FavoriteMessagesField from "./FavoriteMessagesField";
import InfoField from "./InfoField";
import withDropDown from "../../helpers/HOC/withDropDown";
import DateComp from "../Date";

const Chat = ({
  chatData,
  store_id,
  chatFilesData,
  editMessage,
  deleteMessage,
  editStoreChatFile,
  deleteStoreChatFile,
  isChatFilesFetching,
  isChatMessagesFetching,
}) => {
  const [favoriteMessages, setFavoriteMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [replyingMessageId, setReplyingMessageId] = useState(null);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [findDate, setFindDate] = useState(null);
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFavoriteAdd = (message) => {
    const newMessage = {
      message: message.message,
      is_message_pinned: !message.is_message_pinned,
      store_id,
      id: message.id,
      files: message.files,
    };

    editMessage(newMessage);
  };

  useEffect(() => {
    if (chatData.length) {
      setFavoriteMessages(
        chatData.filter((message) => message.is_message_pinned)
      );
    }
  }, [chatData]);

  const createDates = () => {
    const datesArray = chatData.map((message) =>
      moment(message.created).format("DD MMMM YYYY")
    );

    return datesArray
      .filter((date, index) => datesArray.indexOf(date) === index)
      .sort((dateA, dateB) => {
        if (moment(dateA).isAfter(dateB)) return -1;
        else if (moment(dateA).isBefore(dateB)) return 1;
      })
      .filter((date) =>
        findDate ? date === moment(findDate).format("DD MMMM YYYY") : true
      );
  };

  const chatFilesMapper = [
    {
      title: "Информация",
      Component: InfoField,
      props: {
        isChatMessagesFetching,
        items: chatFilesData,
        messagesCount: chatData.length,
      },
    },
    {
      title: "Избранное",
      Component: FavoriteMessagesField,
      props: {
        isChatMessagesFetching,
        items: favoriteMessages,
        handleFavoriteAdd,
      },
    },
    {
      title: "Вложения",
      Component: AttachmentsField,
      props: {
        items: chatFilesData,
        editStoreChatFile,
        deleteStoreChatFile,
        store_id,
        isChatFilesFetching,
      },
    },
  ];

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chat}>
        <div className={styles.chatWrap}>
          <div
            className={cn(styles.head, {
              [styles.head__scrolled]: scroll > 185,
            })}
          >
            <h2 className={styles.title}>
              {store_id ? `АЗС ID: ${store_id}` : "Чат"}
            </h2>
            <div className={styles.icons}>
              <div className={styles.search}>
                <input
                  className={styles.search__input}
                  type="text"
                  placeholder={"Поиск сообщений..."}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {findDate ? (
                <div className={styles.datePicker__info}>
                  <div className={styles.datePicker__date}>
                    {moment(findDate).format("DD MMMM YYYY")}
                  </div>
                  <div
                    onClick={() => {
                      setIsDatePickerVisible(false);
                      setFindDate(null);
                    }}
                    className={styles.datePicker__close}
                  >
                    <CloseIcon />
                  </div>
                </div>
              ) : null}
              <ButtonIcon
                Icon={DateIcon}
                onClick={() => setIsDatePickerVisible((prev) => !prev)}
              />
              {isDatePickerVisible ? (
                <div
                  className={cn(styles.datePicker, {
                    [styles.datePicker__scrolled]: scroll > 185,
                  })}
                >
                  <DatePicker
                    className={styles.datePicker}
                    inline
                    onChange={(date) => setFindDate(date)}
                  />
                </div>
              ) : null}
              <ButtonIcon Icon={MoreIcon} />
            </div>
          </div>
          <div className={styles.messages}>
            {!isChatMessagesFetching &&
            chatData.length &&
            chatData.filter((message) =>
              message.message.toLowerCase().includes(search.toLowerCase())
            ).length ? (
              <>
                {favoriteMessages.length ? (
                  <div>
                    <div
                      className={cn(
                        styles.messages__date,
                        styles.messages__date__favorite
                      )}
                    >
                      <span>Избранное</span>
                    </div>
                    {favoriteMessages.map((message) => (
                      <MessageItem
                        Icon={
                          message.is_message_pinned
                            ? FavoriteFillIcon
                            : FavoriteStrokeIcon
                        }
                        message={message}
                        editMessage={editMessage}
                        store_id={store_id}
                        handleFavoriteAdd={handleFavoriteAdd}
                        favoriteMessage
                        deleteMessage={deleteMessage}
                        setIsEditMode={setIsEditMode}
                        setIsReplyMode={setIsReplyMode}
                        setEditingMessageId={setEditingMessageId}
                        chatData={chatData}
                      />
                    ))}
                  </div>
                ) : null}
                {createDates().map((date) => (
                  <>
                    {chatData.filter(
                      (message) =>
                        moment(message.created).format("DD MMMM YYYY") ===
                          date &&
                        message.message
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    ).length ? (
                      <div className={styles.messages__date}>
                        <span>
                          <DateComp date={date} dateOnly />
                        </span>
                      </div>
                    ) : null}
                    {chatData
                      .filter(
                        (message) =>
                          moment(message.created).format("DD MMMM YYYY") ===
                            date &&
                          message.message
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .sort((messageA, messageB) => {
                        if (
                          moment(messageA.created).format("HH:mm:ss") >
                          moment(messageB.created).format("HH:mm:ss")
                        )
                          return -1;
                        else if (
                          moment(messageA.created).format("HH:mm:ss") <
                          moment(messageB.created).format("HH:mm:ss")
                        )
                          return 1;
                        else return 0;
                      })
                      .map((message) => (
                        <MessageItem
                          Icon={
                            message.is_message_pinned
                              ? FavoriteFillIcon
                              : FavoriteStrokeIcon
                          }
                          message={message}
                          editMessage={editMessage}
                          store_id={store_id}
                          handleFavoriteAdd={handleFavoriteAdd}
                          setIsEditMode={setIsEditMode}
                          setIsReplyMode={setIsReplyMode}
                          setEditingMessageId={setEditingMessageId}
                          deleteMessage={deleteMessage}
                          setReplyingMessageId={setReplyingMessageId}
                          chatData={chatData}
                        />
                      ))}
                  </>
                ))}
              </>
            ) : (
              <div className={styles.noMessages}>
                {isChatMessagesFetching ? (
                  <Loader types={["medium"]} />
                ) : !chatData.length ? (
                  "Еще нет ни одного сообщения!"
                ) : !chatData.filter((message) =>
                    message.message.toLowerCase().includes(search.toLowerCase())
                  ).length && !favoriteMessages.length ? (
                  "No messages find"
                ) : null}
              </div>
            )}
          </div>
          <ChatInput
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            editingMessage={chatData.find(
              (message) => message.id === editingMessageId
            )}
            store_id={store_id}
            replyingMessage={chatData.find(
              (message) => message.id === replyingMessageId
            )}
            setIsReplyMode={setIsReplyMode}
            isReplyMode={isReplyMode}
          />
        </div>
      </div>
      <div className={styles.files}>
        {chatFilesMapper.map(({ title, Component, props }) =>
          withDropDown({ title, Component, ...{ ...props } })
        )}
      </div>
    </div>
  );
};

export default Chat;
