import React from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import ChatLine from "../ChatLine/ChatLine";
import HorizontalRule from "../../components/HorizontalRule/HorizontalRule";

const ChooseChat = ({ chatsData }) => {
  return (
    <Frame style={styles.container}>
      <h1>Список чатов</h1>
      <HorizontalRule />
      {chatsData.map((chatData) => (
        <ChatLine
          key={chatData.id}
          chatId={chatData.id}
          name={chatData.title}
          lastMessage={chatData.lastMessage}
        />
      ))}

    </Frame>
  );
};

export default ChooseChat;
