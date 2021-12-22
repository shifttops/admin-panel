import { useState } from "react";
import styles from "./chat_files_field.module.scss";
import { ArrowDownIcon } from "../../../icons";
import AttachmentsField from "./AttachmentsField";
import InfoField from "./InfoField";
import FavoriteMessagesField from "./FavoriteMessagesField";

const ChatFilesField = ({
  title,
  items,
  messagesCount,
  handleFavoriteAdd,
  editStoreChatFile,
  deleteStoreChatFile,
  store_id,
  messageSender,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen((prevState) => !prevState)}
        className={styles.dropdown}
      >
        <div className={styles.dropdown__head}>
          {title} <ArrowDownIcon isOpen={isOpen} />
        </div>
      </div>
      {isOpen ? (
        <div className={styles.dropdown__body}>
          {title === "attachments" ? (
            <AttachmentsField
              items={items}
              editStoreChatFile={editStoreChatFile}
              deleteStoreChatFile={deleteStoreChatFile}
              store_id={store_id}
              messageSender={messageSender}
            />
          ) : title === "info" ? (
            <InfoField items={items} messagesCount={messagesCount} />
          ) : (
            <FavoriteMessagesField
              items={items}
              handleFavoriteAdd={handleFavoriteAdd}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default ChatFilesField;
