import React, { useEffect, useRef } from "react";
import styles from "./ChatMessages.module.scss";
import MessageLine from "../MessageLine/MessageLine";
import Frame from "../Frame/Frame";

const ChatMessages = ({ chatData }) => {
  const chatRef = useRef();

  useEffect(() => {
    const scrollHeightComponent = chatRef.current.scrollHeight;
    chatRef.current.scrollTop = scrollHeightComponent;
  });

  return (
    <Frame style={styles.container}>
      <div className={styles.messageContainer} ref={chatRef}>
        {chatData.chatHistorie?.map((el, idx) => {
          return <MessageLine key={idx.toString()} message={el} />;
        })}
      </div>
    </Frame>
  );
};

export default ChatMessages;
