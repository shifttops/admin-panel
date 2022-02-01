import cn from "classnames";
import styles from "../cards/ImageCard1/image-card.module.scss";
import Popup from "reactjs-popup";
import PopupComponent from "../popups/PopupComponent/PopupComponent";
import { useEffect, useRef } from "react";

const MoreMenu = ({ moreMapper, isVisible, name, setIsMoreShown }) => (
  <div
    className={cn(styles.more__body, {
      [styles.more__body__visible]: isVisible,
    })}
  >
    {moreMapper.map(({ title, func, Icon }) =>
      title !== "Delete" ? (
        <div className={styles.more__item} onClick={func}>
          <span>
            <Icon />
          </span>
          {title}
        </div>
      ) : (
        <Popup
          modal
          trigger={
            <div className={cn(styles.more__item, styles.more__item__delete)}>
              <span>
                <Icon />
              </span>
              {title}
            </div>
          }
        >
          {(close) => (
            <PopupComponent
              onClose={close}
              onClick={() => {
                func();
                close();
              }}
              buttonText={title}
              titleText={title}
              text={"You sure you want to delete"}
              dedicatedText={name}
              additionalText={"?"}
            />
          )}
        </Popup>
      )
    )}
  </div>
);

export default MoreMenu;
