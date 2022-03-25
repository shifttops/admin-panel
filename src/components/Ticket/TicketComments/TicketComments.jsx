import styles from "./ticket-comments.module.scss";
import Comment from "../../Comment";
import UserAccount from "../../UserAccount";
import { CloseIcon, PinFileIcon, ReportIcon } from "../../../icons";
import Button from "../../buttons/Button";
import React, { useRef, useState } from "react";
import TicketsStore from "../../../store/TicketsStore";
import Loader from "../../Loader";
import { ToastsStore } from "react-toasts";
import FileUploaded from "../../FileUploaded";
import moment from "moment";

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
    if (!!message.trim().length || files.length) {
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
              <FileUploaded
                onRemove={() => handleRemoveFile(file)}
                fileName={file.name}
              />
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
          comments
            .sort(({ created: createdA }, { created: createdB }) => {
              const dateA = moment(createdA);
              const dateB = moment(createdB);

              if (dateA.isAfter(dateB)) return -1;
              else if (dateA.isBefore(dateB)) return 1;
              else return 0;
            })
            .map((comment) => (
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
