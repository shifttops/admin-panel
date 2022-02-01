import cn from "classnames";
import styles from "../chat-files-field.module.scss";

const InfoField = ({ messagesCount, items }) => (
  <div className={cn(styles.dropdown__item, styles.dropdown__item__column)}>
    <div className={styles.dropdown__item__field}>
      Messages count: {messagesCount}
    </div>
    <div className={styles.dropdown__item__field}>
      Attachments count: {items.length}
    </div>
  </div>
);

export default InfoField;
