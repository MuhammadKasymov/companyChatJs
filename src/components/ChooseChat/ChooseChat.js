import React from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import ChatLine from "../ChatLine/ChatLine";
import { useLocation } from "react-router-dom";
import { getChatIdByUrl } from "../../common/composeString";
import HorizontalRule from "../../components/HorizontalRule/HorizontalRule";

const ChooseChat = ({ chatsData }) => {
  const history = useLocation();
  const currentLocation = history.pathname;
  const currentChat = getChatIdByUrl(currentLocation);
  return (
    <Frame style={styles.container}>
      <h1>Список чатов</h1>
      <HorizontalRule />
      {chatsData.map((chatData) => {
        const isChoosed = currentChat === chatData.id;
        return (
          <ChatLine
            key={chatData.id}
            isChoosed={isChoosed}
            name={chatData.title}
            user={chatData.user}
            lastMessage={chatData.lastMessage}
          />
        );
      })}
    </Frame>
  );
};

export default ChooseChat;
