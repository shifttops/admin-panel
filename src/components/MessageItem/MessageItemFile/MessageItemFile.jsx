import styles from "../message-item.module.scss";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../helpers/functions";
import ButtonIcon from "../../buttons/ButtonIcon";
import { saveAs } from "file-saver";

const MessageItemFile = ({ file, fileEditMode, setNewFileName }) => {
  const handleFileSave = (file) => {
    saveAs(
      `${process.env.REACT_APP_URL}${file.file_url}`,
      getFileName(file.file, "/")
    );
  };

  return (
    <div className={styles.file}>
      <span className={styles.file__icon}>
        <ButtonIcon
          onClick={() => handleFileSave(file)}
          Icon={getIconForFile(getFileFormat(getFileName(file.file, "/")))}
          type={getTypeIconForFile(getFileFormat(getFileName(file.file, "/")))}
        />
      </span>
      <span className={styles.file__name}>
        {!fileEditMode ? (
          getFileName(file.file, "/")
        ) : (
          <div className={styles.file__edit}>
            <input
              className={styles.file__edit__input}
              onChange={(e) => setNewFileName(e.target.value.trim())}
              defaultValue={getFileName(file.file, "/")
                .split(".")
                .slice(0, -1)
                .join(".")}
              type="text"
            />
            <span>.{getFileFormat(getFileName(file.file, "/"))}</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default MessageItemFile;
