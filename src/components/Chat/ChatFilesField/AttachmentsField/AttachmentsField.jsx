import styles from "../chat_files_field.module.scss";
import ButtonIcon from "../../../buttons/ButtonIcon";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../../helpers/functions";
import { DeleteIcon, EditIcon } from "../../../../icons";
import cn from "classnames";
import PopupComponent from "../../../popups/PopupComponent/PopupComponent";
import Popup from "reactjs-popup";

const AttachmentsField = ({
  items,
  editStoreChatFile,
  deleteStoreChatFile,
  store_id,
}) =>
  items.length ? (
    items.map((file) => (
      <div className={cn(styles.dropdown__item, styles.file)}>
        <div className={styles.file__body}>
          <div className={styles.attachments__file}>
            <ButtonIcon
              Icon={getIconForFile(getFileFormat(getFileName(file.file, "/")))}
              type={getTypeIconForFile(
                getFileFormat(getFileName(file.file, "/"))
              )}
            />
            <p className={styles.dropdown__name}>
              {getFileName(file.file, "/")}
              <span className={styles.dropdown__weight}>1.2 mb</span>
            </p>
          </div>
          <div className={styles.attachments__actions}>
            <div className={styles.attachments__edit}>
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
                  onClick={() => deleteStoreChatFile({ id: file.pk, store_id })}
                />
              )}
            </Popup>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className={styles.dropdown__item}>
      <div className={styles.dropdown__item__field}>No files in this chat</div>
    </div>
  );

export default AttachmentsField;
