import React from "react";
import styles from "./MessageLine.module.scss";
import { useSelector } from "react-redux";
import { getDateType } from "../../constants/types/timeUtil";
import { getFormatedTime } from "../../common/time";
import UserIcon from "../UserIcon/UserIcon";

const MessageLine = ({ message, userData }) => {
  const selfData = useSelector((state) => state.auth);
  const selfStrId = selfData.id.toString();
  const isSelf = selfStrId === message.userId;
  const messageTime = getFormatedTime(
    getDateType.HM,
    Number(message.messageDate)
  );
  const titleData = {
    isLeftSite: isSelf,
    text: userData?.login || "",
  };

  return (
    <div className={isSelf ? styles.selfMsg : styles.container}>
      <div className={styles.msgText}>
        <p>{message.messageText}</p>
        <p className={styles.date}>&nbsp;&nbsp;{messageTime}</p>
      </div>
      <UserIcon userData={userData} titleData={titleData} />
    </div>
  );
};

export default MessageLine;
