import Chat from "../../../../components/Chat";
import StoresStore from "../../../../store/StoresStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

const InnerChat = observer(() => {
  const {
    storeInfo,
    messagesData,
    chatFilesData,
    chatInterval,
    getMessages,
    getStoreChatFiles,
    editMessage,
    deleteMessage,
    deleteStoreChatFile,
    editStoreChatFile,
  } = StoresStore;

  useEffect(() => {
    if (!messagesData.get().length && !chatFilesData.get().length) {
      getMessages({ store_id: storeInfo.store_id });
      getStoreChatFiles({ store_id: storeInfo.store_id });
    }

    chatInterval.set(
      setInterval(() => {
        getMessages({ store_id: storeInfo.store_id });
        getStoreChatFiles({ store_id: storeInfo.store_id });
      }, 20000)
    );

    return () => {
      clearInterval(chatInterval.get());
      messagesData.set([]);
      chatFilesData.set([]);
    };
  }, []);

  return (
    <>
      <Chat
        chatData={messagesData.get()}
        store_id={storeInfo.store_id}
        chatFilesData={chatFilesData.get()}
        editMessage={editMessage}
        deleteMessage={deleteMessage}
        editStoreChatFile={editStoreChatFile}
        deleteStoreChatFile={deleteStoreChatFile}
      />
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </>
  );
});

export default InnerChat;
