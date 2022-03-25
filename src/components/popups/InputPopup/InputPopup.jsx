import styles from "./input-popup.module.scss";
import { CloseIcon } from "icons";
import Button from "../../buttons/Button";
import React, { useState } from "react";
import { ToastsStore } from "react-toasts";
import cn from "classnames";
import { FileDrop } from "react-file-drop";
import FileUploaded from "../../FileUploaded";

const InputPopup = ({
  onClose,
  onClick,
  buttonText,
  titleText,
  text,
  placeholder = "Input your text here..",
  link = null,
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isFileDropVisible, setIsFileDropVisible] = useState(false);

  const handleDragFiles = (e) => {
    setFiles([...files, ...Array.from(e)]);
    setIsFileDropVisible(false);
  };

  const handleRemoveFile = (file) => {
    const newFiles = [...files];

    newFiles.splice(
      files.indexOf(files.find((item) => item.name === file.name)),
      1
    );

    setFiles(newFiles);
  };
  const handleClick = () => {
    if (!!message.trim().length || !!files.length) {
      onClick(message.trim());
      onClose();
    } else ToastsStore.error("You can`t send empty message", 3000, "toast");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>{titleText}</span>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <form>
        <div className={styles.block}>
          <span>{text}</span>
          {link ? (
            <a target="_blank" href={`mailto:${link}`}>
              {link}
            </a>
          ) : null}
          <p className={styles.files__text}>
            {!files.length ? "Drag any attachments to area:" : null}
          </p>
          <div className={styles.files}>
            <div className={styles.files__content}>
              {files.length
                ? files.map((file) => (
                    <FileUploaded
                      fileName={file.name}
                      onRemove={() => handleRemoveFile(file)}
                    />
                  ))
                : null}
            </div>
            <FileDrop
              className={cn("file-drop", { ["visible"]: isFileDropVisible })}
              onFrameDragEnter={() => setIsFileDropVisible(true)}
              onFrameDragLeave={() => setIsFileDropVisible(false)}
              onFrameDrop={() => setIsFileDropVisible(false)}
              onDrop={(e) => handleDragFiles(e)}
            >
              Drop files here!
            </FileDrop>
            <textarea
              placeholder={placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.applyButton}>
          <Button text={buttonText} onClick={handleClick} type="button" />
        </div>
      </form>
    </div>
  );
};

export default InputPopup;
