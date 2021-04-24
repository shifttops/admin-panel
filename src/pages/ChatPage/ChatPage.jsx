import styles from "./chat-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import {
  ArrowDownIcon,
  DateIcon,
  DocIcon,
  EmojiIcon,
  FavoriteFillIcon,
  FavoriteIcon,
  FavoriteStrokeIcon,
  MoreIcon,
  PinFillIcon,
  PinStrokeIcon,
  PptIcon,
  SearchIcon,
  XlsIcon,
} from "icons";
import ButtonIcon from "components/buttons/ButtonIcon";
import MessageItem from "components/MessageItem";
import Button from "components/buttons/Button";
import cn from "classnames";
import iconButtonTypes from "types/iconButtonTypes";

export default function ChatPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chatMesssages}>
        <div className={styles.chatHeader}>
          <div className={styles.head}>
            <h2 className={styles.title}>Chat</h2>
            <div className={styles.buttons}>
              <ButtonIcon Icon={FavoriteFillIcon} />
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </div>
          </div>
          <SearchQuick />
        </div>
        <div className={styles.list}>
          <div className={styles.message}>
            <div className={styles.newMsg}>
              <span style={styles.counter}>+2</span>
            </div>
            <div className={styles.icons}>
              <p className={styles.name}>
                <span>20209 - </span>München
              </p>
              <button className={styles.pinBtn + " " + styles.fillPinBtn}>
                <PinFillIcon />
              </button>
            </div>
            <p className={styles.location}>Maria-Probst-Straße 1</p>
            <p className={styles.time}>4 days ago</p>
          </div>
          <div className={styles.message}>
            <div className={styles.icons}>
              <p className={styles.name}>
                <span>20209 - </span>München
                <button className={styles.pinBtn}>
                  <PinStrokeIcon />
                </button>
                <button className={styles.favoriteBtn}>
                  <FavoriteStrokeIcon />
                </button>
              </p>
            </div>
            <p className={styles.location}>Maria-Probst-Straße 1</p>
            <p className={styles.time}>4 days ago</p>
          </div>
          <div className={styles.message}>
            <div className={styles.icons}>
              <p className={styles.name}>
                <span>20209 - </span>München
                <button className={styles.pinBtn}>
                  <PinStrokeIcon />
                </button>
                <button className={styles.favoriteBtn}>
                  <FavoriteStrokeIcon />
                </button>
              </p>
            </div>
            <p className={styles.location}>Maria-Probst-Straße 1</p>
            <p className={styles.time}>4 days ago</p>
          </div>
          <div className={styles.message}>
            <div className={styles.icons}>
              <p className={styles.name}>
                <span>20209 - </span>München
                <button className={styles.pinBtn}>
                  <PinStrokeIcon />
                </button>
                <button className={styles.favoriteBtn}>
                  <FavoriteStrokeIcon />
                </button>
              </p>
            </div>
            <p className={styles.location}>Maria-Probst-Straße 1</p>
            <p className={styles.time}>4 days ago</p>
          </div>
          <div className={styles.message + " " + styles.active}>
            <div className={styles.icons}>
              <p className={styles.name}>
                <span>20209 - </span>München
                <button className={styles.pinBtn}>
                  <PinStrokeIcon />
                </button>
                <button className={styles.favoriteBtn}>
                  <FavoriteStrokeIcon />
                </button>
              </p>
            </div>
            <p className={styles.location}>Maria-Probst-Straße 1</p>
            <p className={styles.time}>4 days ago</p>
          </div>
          <div className={styles.message}>
            <div className={styles.icons}>
              <p className={styles.name}>
                <span>20209 - </span>München
                <button className={styles.favoriteBtn + " " + styles.fillIcon}>
                  <FavoriteFillIcon />
                </button>
              </p>
            </div>
            <p className={styles.location}>Maria-Probst-Straße 1</p>
            <p className={styles.time}>4 days ago</p>
          </div>
        </div>
      </div>
      <div className={styles.chatWrapper}>
        <div className={styles.chat}>
          <div className={styles.head}>
            <h2 className={styles.title}>Store ID: 20209</h2>
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
                  <ButtonIcon Icon={PinStrokeIcon} />
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
            <div className={cn(styles.dropdown__head, styles.opened)}>
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
    </div>
  );
}
