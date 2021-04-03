import {
  DateIcon,
  SearchIcon,
  MoreIcon,
  XlsIcon,
  ArrowDownIcon,
  PptIcon,
  DocIcon,
  FavoriteFillIcon,
  FavoriteStrokeIcon,
  AttachIcon,
  EmojiIcon,
} from "icons";
import cn from "classnames";
import styles from "./inner-chat.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import MessageItem from "components/MessageItem";
import Button from "components/buttons/Button";
import iconButtonTypes from "types/iconButtonTypes";

export default function InnerChat() {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chat}>
        <div className={styles.head}>
          <h2 className={styles.title}>Chat</h2>
          <div className={styles.icons}>
            <ButtonIcon Icon={DateIcon} />
            <ButtonIcon Icon={SearchIcon} />
            <ButtonIcon Icon={MoreIcon} />
          </div>
        </div>
        <div className={styles.charWrap}>
          <div className={styles.messages}>
            <div className={styles.messages__date}>
              <span>yesterday</span>
            </div>
            <MessageItem sender="You" Icon={FavoriteStrokeIcon} />
            <div className={styles.messages__date}>
              <span>today</span>
            </div>
            <MessageItem sender="Store ID: 20209" Icon={FavoriteFillIcon} />
            <MessageItem sender="Store ID: 20209" Icon={FavoriteFillIcon} />
            <MessageItem sender="Store ID: 20209" Icon={FavoriteFillIcon} />
            <MessageItem
              sender="Store ID: 20209"
              Icon={FavoriteFillIcon}
              reply={{
                title: "Ronald Mcdonald",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent",
              }}
            />
          </div>
          <form className={styles.messages__textarea}>
            <textarea placeholder="Enter your message here..."></textarea>
            <div className={styles.messages__buttons}>
              <div className={styles.messages__chat}>
                {/*<ButtonIcon Icon={AttachIcon} />*/}
                <ButtonIcon Icon={EmojiIcon} />
              </div>
              <Button text="Send" />
            </div>
          </form>
        </div>
      </div>
      <div className={styles.files}>
        <div className={styles.dropdown}>
          <div className={styles.dropdown__head}>
            INFO <ArrowDownIcon />
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdown__head}>
            FAVORITE <ArrowDownIcon />
          </div>
        </div>
        <div className={styles.dropdown}>
          <div className={cn(styles.dropdown__head, styles.dropdownOpened)}>
            ATTACHMENTS <ArrowDownIcon />
          </div>
          <div className={styles.dropdown__body}>
            <div className={styles.dropdown__item}>
              <ButtonIcon Icon={XlsIcon} type={iconButtonTypes.green} />
              <p className={styles.dropdown__name}>
                I hate plastic tubes.xls
                <span className={styles.dropdown__weight}>1.2 mb</span>
              </p>
            </div>
            <div className={styles.dropdown__item}>
              <ButtonIcon Icon={PptIcon} type={iconButtonTypes.yellow} />
              <p className={styles.dropdown__name}>
                How to make all the money.ppt
                <span className={styles.dropdown__weight}>24.2 mb</span>
              </p>
            </div>
            <div className={styles.dropdown__item}>
              <ButtonIcon Icon={DocIcon} type={iconButtonTypes.blue} />
              <p className={styles.dropdown__name}>
                Chicken like in KFC.doc
                <span className={styles.dropdown__weight}>24.2 mb</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
