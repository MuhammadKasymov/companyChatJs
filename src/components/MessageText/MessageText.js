import React from "react";
import styles from "./MessageText.module.scss";

import { getFormatedTime } from "../../common/time";
import { getDateType } from "../../constants/types/timeUtil";

const MessageText = ({ message }) => {
  const messageTime = getFormatedTime(
    getDateType.HM,
    Number(message.messageDate)
  );

  return (
    <div className={styles.msgText}>
      <p>{message.messageText}</p>
      <p className={styles.date}>&nbsp;&nbsp;{messageTime}</p>
    </div>
  );
};

export default MessageText;
