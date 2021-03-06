import React, { useEffect, useRef, useState } from "react";
import styles from "./chat-input.module.scss";
import ButtonIcon from "../../buttons/ButtonIcon";
import { CloseIcon, EmojiIcon, PinFileIcon } from "../../../icons";
import Button from "../../buttons/Button";
import StoresStore from "../../../store/StoresStore";
import { getFileName } from "../../../helpers/functions";
import cn from "classnames";
import moment from "moment";
import Picker from "emoji-picker-react";
import { FileDrop } from "react-file-drop";
import "./file-drop.scss";
import FileUploaded from "../../FileUploaded";
import useClickOutside from "../../../helpers/hooks/useClickOutside";

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
  const [emoji, setEmoji] = useState(null);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isFileDropVisible, setIsFileDropVisible] = useState(false);

  const emojiRef = useRef(null);

  const handleRemoveFile = (file) => {
    const newFiles = [...files];

    newFiles.splice(
      files.indexOf(files.find((item) => item.name === file.name)),
      1
    );

    setFiles(newFiles);
  };

  const handleChooseFiles = (e) =>
    setFiles([...files, ...Array.from(e.target.files)]);

  const handleDragFiles = (e) => {
    setFiles([...files, ...Array.from(e)]);
    setIsFileDropVisible(false);
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
      if (!/^[a-zA-Z0-9??-????-??]+$/.test(char)) counter++;
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
        files,
      });

      setFiles([]);
      setIsEditMode(false);
      setMessage("");
    }
  };

  useEffect(() => {
    if (emoji && Object.keys(emoji).length) {
      setMessage((prev) => `${prev}${emoji.emoji}`);
    }
  }, [emoji]);

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
    if (!isReplyMode && !isEditMode) setMessage("");
  }, [isReplyMode]);

  useClickOutside({
    ref: emojiRef,
    onClickOutside: () => setIsEmojiPickerVisible(false),
  });

  return (
    <form className={styles.chatForm}>
      <FileDrop
        className={cn("file-drop", { ["visible"]: isFileDropVisible })}
        onFrameDragEnter={() => setIsFileDropVisible(true)}
        onFrameDragLeave={() => setIsFileDropVisible(false)}
        onFrameDrop={() => setIsFileDropVisible(false)}
        onDrop={(e) => handleDragFiles(e)}
      >
        Drop files here!
      </FileDrop>
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
            <FileUploaded
              onRemove={() => handleRemoveFile(file)}
              fileName={
                isEditMode && file.file
                  ? getFileName(file.file, "/")
                  : file.name
              }
            />
          ))}
        </div>
      ) : null}
      <textarea
        onChange={(data) => setMessage(data.target.value)}
        placeholder="???????????????? ??????????????????..."
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
          <div ref={emojiRef} className={styles.emoji__button}>
            <ButtonIcon
              Icon={EmojiIcon}
              onClick={() => setIsEmojiPickerVisible((prev) => !prev)}
            />
            {isEmojiPickerVisible ? (
              <div className={styles.emoji__picker}>
                <Picker
                  onEmojiClick={(event, emoji) => setEmoji(emoji)}
                  disableSkinTonePicker
                  native
                  disableAutoFocus
                  disableSearchBar
                />
              </div>
            ) : null}
          </div>
        </div>
        {isEditMode ? (
          <div className={styles.chatForm__actions}>
            <span>
              <Button
                type="button"
                text="???????????????? ????????????????????????????"
                onClick={() => setIsEditMode(false)}
                className={"maintenance"}
              />
            </span>
            <Button
              disabled={!validateEditing()}
              type="button"
              text={"??????????????????????????"}
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
            text={!isReplyMode ? "??????????????????" : "????????????????"}
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
