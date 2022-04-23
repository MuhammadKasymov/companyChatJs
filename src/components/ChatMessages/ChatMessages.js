import React, { useEffect, useRef } from "react";
import styles from "./ChatMessages.module.scss";
import MessageLine from "../MessageLine/MessageLine";
import Frame from "../Frame/Frame";

const ChatMessages = ({ chatData, isLoading }) => {
  const chatRef = useRef();
  const chatHistory = chatData ? chatData.chatHistory : [];
  const usersData = chatData?.usersData;
  useEffect(() => {
    const scrollHeightComponent = chatRef.current.scrollHeight;
    chatRef.current.scrollTop = scrollHeightComponent;
  });

  return (
    <Frame style={styles.container}>
      <div className={styles.messageContainer} ref={chatRef}>
        {!isLoading ? (
          chatHistory.map((el, idx) => {
            const userDataIndex = usersData.findIndex(
              (userData) => String(userData.id) === el.userId
            );
            const userData = usersData[userDataIndex];
            return (
              <MessageLine
                key={el.id.toString()}
                userData={userData}
                message={el}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </Frame>
  );
};

export default ChatMessages;
