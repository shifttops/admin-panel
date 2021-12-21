import styles from "../message-item.module.scss";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../helpers/functions";
import ButtonIcon from "../../buttons/ButtonIcon";

const MessageItemFile = ({ file, handleFileSave }) => (
  <div className={styles.file}>
    <span className={styles.file__icon}>
      <ButtonIcon
        onClick={() => handleFileSave(file)}
        Icon={getIconForFile(getFileFormat(getFileName(file.file, "/")))}
        type={getTypeIconForFile(getFileFormat(getFileName(file.file, "/")))}
      />
    </span>
    <span className={styles.file__name}>{getFileName(file.file, "/")}</span>
  </div>
);

export default MessageItemFile;
