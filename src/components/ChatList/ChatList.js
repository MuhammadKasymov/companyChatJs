import React, { useRef } from "react";
import { scrollToChild } from "../../common/utils";
import ChatLine from "../ChatLine/ChatLine";
import styles from "./ChatList.module.scss";

const ChatList = ({ chatsData }) => {
  const scrollRef = useRef();
  const scrollToEl = (el) => scrollToChild(scrollRef.current, el);

  return (
    <div ref={scrollRef} className={styles.chatsContainer}>
      {chatsData.map((chatData) => (
        <ChatLine key={chatData.id} data={chatData} scrollToMe={scrollToEl} />
      ))}
    </div>
  );
};

export default ChatList;
