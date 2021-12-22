import styles from "../chat_files_field.module.scss";
import ButtonIcon from "../../../buttons/ButtonIcon";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../../helpers/functions";
import {
  CheckIcon,
  CloseIcon,
  DeclineIcon,
  DeleteIcon,
  EditIcon,
} from "../../../../icons";
import cn from "classnames";
import PopupComponent from "../../../popups/PopupComponent/PopupComponent";
import Popup from "reactjs-popup";
import MessageItemFile from "../../../MessageItem/MessageItemFile";
import { useEffect, useState } from "react";

const AttachmentsField = ({
  items,
  editStoreChatFile,
  deleteStoreChatFile,
  store_id,
}) => {
  return items.length ? (
    items.map((file) => (
      <AttachmentsFieldFile
        file={file}
        deleteStoreChatFile={deleteStoreChatFile}
        editStoreChatFile={editStoreChatFile}
        store_id={store_id}
      />
    ))
  ) : (
    <div className={styles.dropdown__item}>
      <div className={styles.dropdown__item__field}>No files in this chat</div>
    </div>
  );
};

const AttachmentsFieldFile = ({
  file,
  deleteStoreChatFile,
  store_id,
  editStoreChatFile,
}) => {
  const [isEditFileMode, setIsEditFileMode] = useState(false);
  const [newFileName, setNewFileName] = useState(
    getFileName(file.file, "/").split(".").slice(0, -1).join(".")
  );

  const validateName = () => {
    return (
      newFileName !==
        getFileName(file.file, "/").split(".").slice(0, -1).join(".") &&
      newFileName.length
    );
  };

  const handleEdit = ({ file, close }) => {
    if (validateName()) {
      editStoreChatFile({
        store_id,
        file,
        newName: `${newFileName}.${getFileFormat(getFileName(file.file, "/"))}`,
      });
    }
    close();
    setIsEditFileMode(false);
  };

  return (
    <div className={cn(styles.dropdown__item, styles.file)}>
      <div className={styles.file__body}>
        <div className={styles.attachments__file}>
          <MessageItemFile
            file={file}
            fileEditMode={isEditFileMode}
            setNewFileName={setNewFileName}
          />
        </div>
        <div className={styles.attachments__actions}>
          {!isEditFileMode ? (
            <>
              <div
                onClick={() => setIsEditFileMode(true)}
                className={styles.attachments__edit}
              >
                <EditIcon />
              </div>
              <Popup
                modal
                trigger={
                  <div className={styles.attachments__delete}>
                    <DeleteIcon />
                  </div>
                }
              >
                {(close) => (
                  <PopupComponent
                    onClose={close}
                    titleText={"Delete"}
                    buttonText={"Delete"}
                    text={"You sure you want to delete file: "}
                    dedicatedText={`${getFileName(file.file, "/")}`}
                    onClick={() =>
                      deleteStoreChatFile({ id: file.pk, store_id })
                    }
                  />
                )}
              </Popup>
            </>
          ) : (
            <>
              {validateName() ? (
                <Popup
                  modal
                  trigger={
                    <div
                      className={cn(styles.attachments__approve, {
                        [styles.attachments__approve__validated]:
                          validateName(),
                      })}
                    >
                      <CheckIcon />
                    </div>
                  }
                >
                  {(close) => (
                    <PopupComponent
                      onClose={close}
                      titleText={"Edit"}
                      buttonText={"Edit"}
                      text={"You sure you want to edit file: "}
                      dedicatedText={`${getFileName(file.file, "/")}`}
                      additionalText={`to`}
                      additionalDedicatedText={`${newFileName}.${getFileFormat(
                        getFileName(file.file, "/")
                      )}`}
                      onClick={() => handleEdit({ file, close })}
                    />
                  )}
                </Popup>
              ) : (
                <div
                  className={cn(styles.attachments__approve, {
                    [styles.attachments__approve__validated]: validateName(),
                  })}
                >
                  <CheckIcon />
                </div>
              )}
              <div onClick={() => setIsEditFileMode(false)}>
                <DeclineIcon />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentsField;
