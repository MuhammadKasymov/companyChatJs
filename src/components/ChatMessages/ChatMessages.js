import React, { useEffect, useRef } from "react";
import styles from "./ChatMessages.module.scss";
import MessageLine from "../MessageLine/MessageLine";
import Frame from "../Frame/Frame";

const ChatMessages = ({ chatData }) => {
  const chatRef = useRef();

  //Todo: проскролить вниз
  useEffect(() => console.log(chatData));
  return (
    <Frame style={styles.container}>
      <div className={styles.messageContainer} ref={chatRef}></div>
      {/* {chatData.map((el, idx) => {
        console.log(el);
        return <MessageLine key={idx.toString()} message={el} />;
      })} */}
    </Frame>
  );
};

export default ChatMessages;
