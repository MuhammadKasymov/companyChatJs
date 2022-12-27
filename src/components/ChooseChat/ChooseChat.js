import React, { useEffect } from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import HorizontalRule from "../../components/HorizontalRule/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import ChatList from "../ChatList/ChatList";
import { useToggle } from "../../common/hooks";

const ChooseChat = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  const params = useParams();
  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.tempData);

  const chatsData = tempData.lastMessagesData;
  const chatId = tempData.chatId;
  const currentChatId = params.chatId;

  useEffect(() => {
    currentChatId !== chatId && dispatch(setCurrentChatId(currentChatId));
  }, [chatId, currentChatId, dispatch]);

  return (
    <>
      <div onClick={toggleIsOpen} className={isOpen ? styles.shadowIt : ""} />
      <Frame style={`${styles.container} ${isOpen && styles.openContainer}`}>
        <button onClick={toggleIsOpen} className={styles.headerButton}>
          <h1 className={`${styles.header} ${isOpen && styles.openHeader}`}>
            Список чатов
          </h1>
        </button>
        <div className={isOpen ? styles.openContent : styles.content}>
          <HorizontalRule style={styles.hr} />
          <ChatList chatsData={chatsData} />
        </div>
      </Frame>
    </>
  );
};

export default ChooseChat;
