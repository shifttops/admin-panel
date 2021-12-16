import React, { useEffect, useState } from "react";
import styles from "./chat_input.module.scss";
import ButtonIcon from "../../buttons/ButtonIcon";
import {
  CloseIcon,
  DocIcon,
  EmojiIcon,
  ImagesIcon,
  PhotoIcon,
  PinFileIcon,
  PptIcon,
  XlsIcon,
} from "../../../icons";
import Button from "../../buttons/Button";
import StoresStore from "../../../store/StoresStore";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../helpers/functions";
import cn from "classnames";
import moment from "moment";

const ChatInput = ({
  store_id,
  isEditMode,
  setIsEditMode,
  editingMessage,
  setIsReplyMode,
  replyingMessage,
  isReplyMode,
}) => {
  const { sendMessage, editMessage } = StoresStore;

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const handleRemoveFile = (file) => {
    const newFiles = [...files];

    newFiles.splice(
      files.indexOf(files.find((item) => item.name === file.name)),
      1
    );

    setFiles(newFiles);
  };

  const handleChooseFiles = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const validateEditing = () => {
    return !!(
      (message.trim() !== editingMessage.message ||
        (Object.keys(editingMessage).length && validateEditFiles())) &&
      validateMessage(message)
    );
  };

  const validateEditFiles = () => {
    if (!files.length && editingMessage.files.length) return true;
    else if (files.length && !editingMessage.files.length) return true;
    else if (files.length !== editingMessage.files.length) return true;
    else {
      const arr = files.map((file) => {
        return editingMessage.files.map((editFile) => {
          if (
            getFileName(editFile.file, "/") !==
            (file.file ? getFileName(file.file, "/") : file.name)
          )
            return true;
        })[0];
      });

      return arr.includes(true);
    }
  };

  const validateMessage = (message) => {
    let counter = 0;

    message.split("").map((char) => {
      if (!/^[a-zA-Z0-9а-яА-Я]+$/.test(char)) counter++;
    });

    return (
      counter !== message.length && message.length && message.length < 1024
    );
  };

  const handleSend = async (e) => {
    if (!isEditMode) {
      if (
        // (e.key === "Enter" || e.type === "click") &&
        validateMessage(message)
      ) {
        if (isReplyMode && Object.keys(replyingMessage).length) {
          await sendMessage({
            store_id,
            message: message.trim(),
            files,
            parent_id: replyingMessage.id,
          });

          setIsReplyMode(false);
        } else sendMessage({ store_id, message: message.trim(), files });
        setFiles([]);
        setMessage("");
      }
    } else if (validateEditing()) {
      editMessage({
        message: message.trim(),
        store_id,
        id: editingMessage.id,
        is_message_pinned: editingMessage.is_message_pinned,
      });

      setFiles([]);
      setIsEditMode(false);
      setMessage("");
    }
  };

  useEffect(() => {
    if (isEditMode && Object.keys(editingMessage).length) {
      setMessage(editingMessage.message);
      setFiles(editingMessage.files);
    } else {
      setMessage("");
      setFiles([]);
    }
  }, [isEditMode, editingMessage]);

  useEffect(() => {
    if (!isReplyMode) setMessage("");
  }, [isReplyMode]);

  return (
    <form className={styles.chatForm}>
      {/*<form className={styles.chatForm} onKeyUp={handleSend}>*/}
      {isReplyMode && Object.keys(replyingMessage).length ? (
        <div className={styles.reply}>
          <div className={styles.reply__info}>
            <div className={styles.reply__title}>
              <div
                className={cn(styles.reply__sender, {
                  [styles.reply__sender__you]:
                    localStorage.getItem("userName") ===
                    `${replyingMessage.first_name} ${replyingMessage.last_name}`,
                })}
              >
                {replyingMessage.first_name.length &&
                replyingMessage.last_name.length
                  ? `${replyingMessage.first_name} ${replyingMessage.last_name}`
                  : `User ${replyingMessage.user}`}
              </div>
              <div className={styles.reply__date}>
                {moment().year() === moment(message.created).year()
                  ? moment(replyingMessage.created).format("DD MMMM, HH:mm")
                  : moment(replyingMessage.created).format(
                      "DD MMMM YYYY, HH:mm"
                    )}
              </div>
            </div>
            <div className={styles.reply__message}>
              {replyingMessage.message}
            </div>
          </div>
          <span onClick={() => setIsReplyMode(false)}>
            <CloseIcon />
          </span>
        </div>
      ) : null}
      {files.length ? (
        <div className={styles.files}>
          {files.map((file) => (
            <div className={styles.files__file}>
              <span className={styles.files__file__icon}>
                <ButtonIcon
                  disabled
                  Icon={getIconForFile(
                    getFileFormat(
                      isEditMode && file.file
                        ? getFileName(file.file, "/")
                        : file.name
                    )
                  )}
                  type={getTypeIconForFile(
                    getFileFormat(
                      isEditMode && file.file
                        ? getFileName(file.file, "/")
                        : file.name
                    )
                  )}
                />
              </span>
              <span className={styles.files__file__name}>
                {isEditMode && file.file
                  ? getFileName(file.file, "/")
                  : file.name}
              </span>
              <div
                className={styles.files__file__icon__close}
                color={"rgba(38,38,38,0.72)"}
                onClick={() => handleRemoveFile(file)}
              >
                <CloseIcon />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <textarea
        onChange={(data) => setMessage(data.target.value)}
        placeholder="Enter your message here..."
        value={message}
      />
      <div className={styles.chatForm__buttons}>
        <div className={styles.chatForm__icons}>
          <form className={styles.filesForm}>
            <input
              onChange={handleChooseFiles}
              id="storeChatFiles"
              className={styles.filesForm__input}
              type="file"
              multiple
              name="storeChatFiles"
            />
            <label
              className={styles.filesForm__input__label}
              htmlFor="storeChatFiles"
            >
              <div className={styles.icon}>
                <PinFileIcon />
              </div>
            </label>
          </form>
          <ButtonIcon disabled Icon={EmojiIcon} />
        </div>
        {isEditMode ? (
          <div className={styles.chatForm__actions}>
            <span>
              <Button
                type="button"
                text="Cancel editing"
                onClick={() => setIsEditMode(false)}
                className={"maintenance"}
              />
            </span>
            <Button
              disabled={!validateEditing()}
              type="button"
              text={"Edit"}
              onClick={handleSend}
              className={cn({
                ["disabled"]: !validateEditing(),
              })}
            />
          </div>
        ) : (
          <Button
            disabled={!validateMessage(message)}
            type="button"
            text={!isReplyMode ? "Send" : "Reply"}
            onClick={handleSend}
            className={cn({
              ["disabled"]: !validateMessage(message),
            })}
          />
        )}
      </div>
    </form>
  );
};

export default ChatInput;
