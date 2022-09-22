import React from "react";
import styles from "./MessageLine.module.scss";
import { useSelector } from "react-redux";
import UserIcon from "../UserIcon/UserIcon";
import MessageText from "../MessageText/MessageText";

const MessageLine = ({ message, userData }) => {
  const selfData = useSelector((state) => state.auth);
  const selfStrId = selfData.id.toString();
  const isSelf = selfStrId === message.userId;

  const titleData = {
    isLeftSite: isSelf,
    text: userData?.login || "",
  };

  return (
    <div className={isSelf ? styles.selfMsg : styles.container}>
      <MessageText message={message} />
      <UserIcon userData={userData} titleData={titleData} />
    </div>
  );
};

export default MessageLine;
