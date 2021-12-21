import cn from "classnames";
import { ChatCheckIcon, MoreIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import styles from "./message-item.module.scss";
import moment from "moment";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../icons";
import Popup from "reactjs-popup";
import PopupComponent from "../popups/PopupComponent/PopupComponent";
import MessageItemFile from "./MessageItemFile";
import { getFileName } from "../../helpers/functions";
import { saveAs } from "file-saver";

const MessageItem = ({
  Icon = () => null,
  message,
  store_id,
  handleFavoriteAdd,
  favoriteMessage,
  setIsEditMode,
  setIsReplyMode,
  setEditingMessageId,
  deleteMessage,
  setReplyingMessageId,
  chatData,
}) => {
  const [isActionsVisible, setIsActionsVisible] = useState(false);
  const [repliedMessage, setRepliedMessage] = useState({});

  useEffect(() => {
    if (Object.keys(message).length && message.parent) {
      setRepliedMessage(
        chatData.find((chatMessage) => chatMessage.id === message.parent)
      );
    }

    return () => setRepliedMessage({});
  }, [message.parent]);

  const handleEdit = () => {
    setIsEditMode(true);
    setIsReplyMode(false);
    setEditingMessageId(message.id);
    setIsActionsVisible(false);
  };

  const handleDelete = (close) => {
    deleteMessage({ store_id, id: message.id });
    close();
    setIsActionsVisible(false);
  };

  const handleFileSave = (file) => {
    saveAs(
      `${process.env.REACT_APP_URL}${file.file_url}`,
      getFileName(file.file, "/")
    );
  };

  return (
    <div className={styles.message}>
      <div className={styles.message__head}>
        <div className={styles.message__info}>
          <span
            className={cn(styles.message__sender, {
              [styles.message__sender__you]:
                localStorage.getItem("userName") ===
                `${message.first_name} ${message.last_name}`,
            })}
          >
            {message.first_name.length && message.last_name.length
              ? `${message.first_name} ${message.last_name}`
              : `User ${message.user}`}
          </span>
          <span
            className={cn(styles.message__time, {
              [styles.message__time__favorite]: favoriteMessage,
            })}
          >
            {!favoriteMessage
              ? moment(message.created).format("HH:mm")
              : moment().year() === moment(message.created).year()
              ? moment(message.created).format("DD MMMM, HH:mm")
              : moment(message.created).format("DD MMMM YYYY, HH:mm")}
          </span>
          {!favoriteMessage ? (
            <span
              onClick={() => {
                setIsReplyMode(true);
                setReplyingMessageId(message.id);
                setIsEditMode(false);
                setIsActionsVisible(false);
              }}
              className={styles.message__reply}
            >
              Reply
            </span>
          ) : null}
          {!favoriteMessage ? <ChatCheckIcon /> : null}
        </div>
        <div className={styles.message__buttons}>
          {localStorage.getItem("userName") ===
          `${message.first_name} ${message.last_name}` ? (
            <ButtonIcon
              Icon={MoreIcon}
              onClick={() => setIsActionsVisible((prev) => !prev)}
              className={styles.message__more}
            />
          ) : null}
          <ButtonIcon Icon={Icon} onClick={() => handleFavoriteAdd(message)} />
          <div
            className={cn(styles.message__actions, {
              [styles.message__actions__visible]: isActionsVisible,
            })}
          >
            <div className={styles.message__actions__item} onClick={handleEdit}>
              <span>
                <EditIcon />
              </span>
              <span>Edit message</span>
            </div>
            <Popup
              key={`message-${message.id}`}
              modal
              trigger={
                <div
                  className={cn(styles.message__actions__item, styles.delete)}
                  onClick={() => {}}
                >
                  <span>
                    <DeleteIcon />
                  </span>
                  <span>Delete message</span>
                </div>
              }
            >
              {(close) => (
                <PopupComponent
                  onClose={close}
                  onClick={() => handleDelete(close)}
                  text={"Are you sure you want to delete message:"}
                  buttonText={"Delete"}
                  titleText={"Delete"}
                  dedicatedText={message.message}
                  additionalText={"Date: "}
                  additionalDedicatedText={`${moment(message.created).format(
                    "DD MMMM YYYY, HH:mm"
                  )}`}
                />
              )}
            </Popup>
          </div>
        </div>
      </div>
      <p className={styles.message__text}>{message.message}</p>
      {message.files.length ? (
        <div className={styles.message__files}>
          {Array.from(message.files).map((file) => (
            <MessageItemFile file={file} handleFileSave={handleFileSave} />
          ))}
        </div>
      ) : null}
      {Object.keys(repliedMessage).length ? (
        <div className={styles.message__replyMessage}>
          <span
            className={cn(styles.message__sender, {
              [styles.message__sender__you]:
                localStorage.getItem("userName") ===
                `${repliedMessage.first_name} ${repliedMessage.last_name}`,
            })}
          >
            {repliedMessage.first_name.length && repliedMessage.last_name.length
              ? `${repliedMessage.first_name} ${repliedMessage.last_name}`
              : `User ${repliedMessage.user}`}
          </span>
          <p className={styles.message__text}>{repliedMessage.message}</p>
          {repliedMessage.files.length ? (
            <div className={styles.message__files}>
              {Array.from(repliedMessage.files).map((file) => (
                <MessageItemFile file={file} handleFileSave={handleFileSave} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MessageItem;
