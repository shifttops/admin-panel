import cn from "classnames";
import { ChatCheckIcon, FavoriteStrokeIcon, MoreIcon } from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import styles from "./message-item.module.scss";

export default function MessageItem({ sender, Icon = () => null, reply }) {
  return (
    <div className={styles.message}>
      <div className={styles.message__head}>
        <div className={styles.message__info}>
          <span className={styles.message__sender}>{sender}</span>
          <span className={styles.message__time}>14.12 pm</span>
          <span className={styles.message__reply}>Reply</span>
          <ChatCheckIcon />
        </div>
        <div className={styles.message__buttons}>
          <ButtonIcon Icon={Icon} />
          <ButtonIcon Icon={MoreIcon} />
        </div>
      </div>
      <p className={styles.message__text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
        rhoncus dolor purus non enim praesent elementum facilisis leo, vel
        fringilla est ullamcorper eget nulla facilisi etiam dignissim
      </p>
      {reply && (
        <div className={styles.message__replyMessage}>
          <span className={styles.message__sender}>{reply?.title}</span>
          <p className={styles.message__text}>{reply?.text}</p>
        </div>
      )}
    </div>
  );
}
