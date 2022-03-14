import React, { useEffect, useRef } from "react";
import styles from "./ChatMessages.module.scss";
import MessageLine from "../MessageLine/MessageLine";

const ChatMessages = ({ chatData }) => {
  const chatRef = useRef();

  //Todo: проскролить вниз
  useEffect(() => console.log(chatRef));

  return (
    <div ref={chatRef} className={styles.messageContainer}>
      {chatData.map((el, idx) => {
        return <MessageLine key={idx.toString()} message={el} />;
      })}
    </div>
  );
};

export default ChatMessages;
