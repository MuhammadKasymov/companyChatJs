import React, { useEffect } from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import ChatLine from "../ChatLine/ChatLine";
import HorizontalRule from "../../components/HorizontalRule/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";

const ChooseChat = () => {
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
    <Frame style={styles.container}>
      <h1>Список чатов</h1>
      <HorizontalRule style={styles.hr} />
      <div className={styles.chatsContainer}>
        {chatsData.map((chatData) => (
          <ChatLine key={chatData.id} data={chatData} />
        ))}
      </div>
    </Frame>
  );
};

export default ChooseChat;
