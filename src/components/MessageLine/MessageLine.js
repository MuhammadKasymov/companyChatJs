import React from "react";
import styles from "./MessageLine.module.scss";
import { useSelector } from "react-redux";
import { getDateType } from "../../constants/types/timeUtil";
import { getFormatedTime } from "../../common/time";

const MessageLine = ({ message, userData }) => {
  const selfData = useSelector((state) => state.auth);
  const selfStrId = selfData.id.toString()
  const isSelf = selfStrId === message.userId;
  const messageTime = getFormatedTime(getDateType.HM, Number(message.messageDate));
  return (
    <div className={isSelf ? styles.selfMsg : styles.container}>
      <div className={styles.msgText}>
        <p>{message.messageText}</p>
        <p className={styles.date}>&nbsp;&nbsp;{messageTime}</p>
      </div>
      <div className={styles.ico}>
        <p>{userData.firstName.charAt(0)}</p>
      </div>
    </div>
  );
};

export default MessageLine;
