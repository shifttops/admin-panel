import { NavLink } from "react-router-dom";
import styles from "./chat_list_item.module.scss";
import { FavoriteStrokeIcon, PinFillIcon } from "../../../icons";

const ChatListItem = ({ chat, isActive }) => (
  <NavLink
    to={`/chat/${chat.id}`}
    className={styles.message + " " + (isActive ? styles.active : "")}
  >
    <div className={styles.message__label}>
      <p className={styles.name}>
        <span>{chat.id} - </span>
        {chat.storeInfo.region}
      </p>
      <div className={styles.icons}>
        <button className={styles.pinBtn}>
          <PinFillIcon />
        </button>
        <button className={styles.favoriteBtn}>
          <FavoriteStrokeIcon />
        </button>
      </div>
    </div>
    <p className={styles.location}>{chat.storeInfo.location}</p>
    <p className={styles.time}>
      {chat.messagesData[chat.messagesData.length - 1].date.format(
        "D MMMM YYYY, HH:mm"
      )}
    </p>
  </NavLink>
);

export default ChatListItem;
