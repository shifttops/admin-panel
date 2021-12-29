import styles from "./chat-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import React, { useEffect, useState } from "react";
import ChatStore from "../../store/ChatStore";
import { NavLink, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import moment from "moment";
import ChatListItem from "../../components/Chat/ChatListItem";
import Chat from "../../components/Chat";
import { FavoriteFillIcon, MoreIcon } from "../../icons";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

const ChatPage = observer((props) => {
  const location = useLocation();

  const [currentChat, setCurrentChat] = useState({});
  const [search, setSearch] = useState("");

  const { chatData } = ChatStore;

  useEffect(() => {
    if (props.match.params.id) {
      const curChat = chatData
        .get()
        .find((chat) => props.match.params.id === chat.id);
      if (curChat) setCurrentChat(curChat);
    }
  }, [location, chatData]);

  useEffect(() => {
    ToastsStore.error("This page under construct", 3000, "toast");
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatMessages}>
        <div className={styles.chatHeader}>
          <div className={styles.head}>
            <h2 className={styles.title}>Chat</h2>
            <div className={styles.buttons}>
              <ButtonIcon Icon={FavoriteFillIcon} />
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </div>
          </div>
          <SearchQuick placeholderText={"Find chat"} setSearch={setSearch} />
        </div>
        <div className={styles.list}>
          {chatData
            .get()
            .filter((chat) => chat.id.includes(search))
            .map((chat) => (
              <ChatListItem
                chat={chat}
                isActive={props.match.params.id === chat.id}
              />
            ))}
          {/*<div className={styles.message}>
            <div className={styles.newMsg}>
              <span style={styles.counter}>+2</span>
              <button className={styles.pinBtn + " " + styles.fillPinBtn}>
                <PinFillIcon />
              </button>*/}
        </div>
      </div>
      {Object.keys(currentChat).length ? (
        <Chat currentChat={currentChat} />
      ) : (
        <div className={styles.emptyDialog}>
          <span>Choose dialog</span>
        </div>
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default ChatPage;
