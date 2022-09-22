import React, { useEffect } from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import HorizontalRule from "../../components/HorizontalRule/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import ChatList from "../ChatList/ChatList";

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
      <ChatList chatsData={chatsData} />
    </Frame>
  );
};

export default ChooseChat;
