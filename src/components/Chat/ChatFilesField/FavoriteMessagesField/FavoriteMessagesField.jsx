import cn from "classnames";
import styles from "../chat_files_field.module.scss";
import moment from "moment";
import ButtonIcon from "../../../buttons/ButtonIcon";
import { FavoriteFillIcon, FavoriteStrokeIcon } from "../../../../icons";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../../../helpers/functions";
import MessageItemFile from "../../../MessageItem/MessageItemFile";

const FavoriteMessagesField = ({ items, handleFavoriteAdd }) => (
  <div className={cn(styles.dropdown__item, styles.dropdown__item__column)}>
    {items.length ? (
      items.map((item) => (
        <div className={cn(styles.dropdown__item__field, styles.message)}>
          <div className={styles.message__info}>
            <div className={styles.message__info__title}>
              <div
                className={cn(styles.message__sender, {
                  [styles.message__sender__you]:
                    localStorage.getItem("userName") ===
                    `${item.first_name} ${item.last_name}`,
                })}
              >
                {item.first_name.length && item.last_name.length
                  ? `${item.first_name} ${item.last_name}`
                  : `User ${item.user}`}
              </div>
              <div className={styles.message__date}>
                {moment(item.created).format("DD MMMM YYYY, HH:mm")}
              </div>
            </div>
            <div className={styles.message__icon}>
              <ButtonIcon
                Icon={
                  item.is_message_pinned ? FavoriteFillIcon : FavoriteStrokeIcon
                }
                onClick={() => handleFavoriteAdd(item)}
              />
            </div>
          </div>
          <div className={styles.message__text}>{item.message}</div>
          <div className={styles.message__files}>
            {item.files.length
              ? Array.from(item.files).map((file) => (
                  <div className={styles.message__files__file}>
                    <MessageItemFile file={file} />
                  </div>
                ))
              : null}
          </div>
        </div>
      ))
    ) : (
      <div className={styles.dropdown__item__field}>No favorite messages</div>
    )}
  </div>
);

export default FavoriteMessagesField;
