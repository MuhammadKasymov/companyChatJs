import React from "react";
import styles from "./ChooseChat.module.scss";
import Frame from "../Frame/Frame";
import ChatLine from "../ChatLine/ChatLine";
import { useLocation } from "react-router-dom";
import { getChatIdByUrl } from "../../common/composeString";

const ChooseChat = ({ chatsData }) => {
  const history = useLocation();
  const currentLocation = history.pathname;
  const currentChat = getChatIdByUrl(currentLocation);
  console.log(chatsData);
  return (
    <Frame style={styles.container}>
      {chatsData.map((chatData) => {
        const isChoosed = currentChat === chatData.id;
        return (
          <ChatLine
            key={chatData.id}
            isChoosed={isChoosed}
            name={chatData.name}
            user={chatData.user}
            lastMessage={chatData.lastMessage}
          />
        );
      })}
    </Frame>
  );
};

export default ChooseChat;
