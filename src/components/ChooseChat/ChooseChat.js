import React, { useEffect, useRef } from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import ChatLine from "../ChatLine/ChatLine";
import HorizontalRule from "../../components/HorizontalRule/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import { scrollToChild } from "../../common/utils";

const ChooseChat = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.tempData);
  const chatsData = tempData.lastMessagesData;
  const chatId = tempData.chatId;
  const currentChatId = params.chatId;
  const scrollRef = useRef();

  const scrollToEl = (el) => scrollToChild(scrollRef.current, el);

  useEffect(() => {
    currentChatId !== chatId && dispatch(setCurrentChatId(currentChatId));
  }, [chatId, currentChatId, dispatch]);

  return (
    <Frame style={styles.container}>
      <h1>Список чатов</h1>
      <HorizontalRule style={styles.hr} />
      <div ref={scrollRef} className={styles.chatsContainer}>
        {chatsData.map((chatData) => (
          <ChatLine key={chatData.id} data={chatData} scrollToMe={scrollToEl} />
        ))}
      </div>
    </Frame>
  );
};

export default ChooseChat;
