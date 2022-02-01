import styles from "./ticket-comments.module.scss";
import Comment from "../../Comment";
import UserAccount from "../../UserAccount";
import { CloseIcon, PinFileIcon, ReportIcon } from "../../../icons";
import ButtonIcon from "../../buttons/ButtonIcon";
import Button from "../../buttons/Button";
import React, { useRef, useState } from "react";
import {
  getFileFormat,
  getIconForFile,
  getTypeIconForFile,
} from "../../../helpers/functions";
import TicketsStore from "../../../store/TicketsStore";
import Loader from "../../Loader";
import { ToastsStore } from "react-toasts";

const TicketComments = ({ comments, isSending, isFetching }) => {
  const inputRef = useRef(null);
  const {
    addTicketComment,
    deleteTicketComment,
    editTicketComment,
    deleteTicketFile,
  } = TicketsStore;

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

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

  const handleSend = async () => {
    if (!!message.trim().length) {
      await addTicketComment({ message, files });

      setMessage("");
      inputRef.current.value = "";
      setFiles([]);
    } else
      ToastsStore.error(
        "You should write something or add files",
        3000,
        "toast"
      );
  };

  return (
    <div className={styles.comments}>
      <span className={styles.subtitle}>Comments</span>
      <div className={styles.comments__body}>
        {files.length ? (
          <div className={styles.files}>
            {files.map((file) => (
              <div className={styles.files__file}>
                <span className={styles.files__file__icon}>
                  <ButtonIcon
                    disabled
                    Icon={getIconForFile(getFileFormat(file.name))}
                    type={getTypeIconForFile(getFileFormat(file.name))}
                  />
                </span>
                <span className={styles.files__file__name}>{file.name}</span>
                <div
                  className={styles.files__file__icon__close}
                  color={"rgba(38, 38, 38, 0.72)"}
                  onClick={() => handleRemoveFile(file)}
                >
                  <CloseIcon />
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className={styles.comments__input}>
          <UserAccount accountName={localStorage.getItem("userName")} />
          <input
            ref={inputRef}
            onChange={(e) => setMessage(e.target.value)}
            defaultValue={message}
            className={styles.input}
            type="text"
          />
          <label className={styles.files__label}>
            <input
              onChange={(e) => handleChooseFiles(e)}
              className={styles.files__input}
              type="file"
              multiple
            />
            <div className={styles.files__icon}>
              <PinFileIcon />
            </div>
          </label>
          <Button fetching={isSending} text={"Send"} onClick={handleSend} />
        </div>
        {comments.length && !isFetching ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              onDelete={deleteTicketComment}
              onEdit={editTicketComment}
              onFileDelete={deleteTicketFile}
            />
          ))
        ) : isFetching ? (
          <div className={styles.loader}>
            <Loader types={["small"]} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TicketComments;