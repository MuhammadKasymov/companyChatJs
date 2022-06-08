import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ChatMessages.module.scss";
import MessageLine from "../MessageLine/MessageLine";
import Frame from "../Frame/Frame";
import { getImageById } from "../../controllers/files";
import { useIsMounted } from "../../common/hooks";
import DateDelay from "../DateDelay/DateDelay";
import { getDelayDateType } from "../../common/time";

const ChatMessages = ({ chatData, isLoading }) => {
  const chatRef = useRef();
  const chatHistory = chatData ? chatData.chatHistory : [];
  const [objUserData, setObjUsersData] = useState(null);
  let delayType = null;
  const isMounted = useIsMounted();

  const uploadUsersImg = useCallback(async () => {
    const tempUsersObj = {};
    const usersData = chatData?.usersData || [];
    for (let el of usersData) {
      const elId = el.id;
      let objUser = el;
      if (el.imageId != null) {
        const imageData = await getImageById(el.imageId);
        objUser.imageData = imageData;
      }
      tempUsersObj[elId] = objUser;
    }
    usersData[0] && isMounted && setObjUsersData(tempUsersObj);
  }, [chatData?.usersData, isMounted]);

  useEffect(() => {
    const scrollHeightComponent = chatRef.current.scrollHeight;
    chatRef.current.scrollTop = scrollHeightComponent;
  });
  useEffect(uploadUsersImg, [uploadUsersImg]);

  const isGoodLoadUsers = () => {
    for (let el of chatHistory) {
      if (!objUserData[el.userId]) {
        uploadUsersImg();
        return false;
      }
    }
    return true;
  };

  const isShowDelay = (message) => {
    const messageDate = Number(message.messageDate);
    const curDelayType = getDelayDateType(messageDate);
    const isShow = delayType !== curDelayType;
    if (isShow) delayType = curDelayType;
    return isShow;
  };

  const isShowMessages = () => {
    return objUserData != null && !isLoading && isGoodLoadUsers();
  };
  return (
    <Frame style={styles.container}>
      <div className={styles.messageContainer} ref={chatRef}>
        {isShowMessages() &&
          chatHistory.map((el) => (
            <div key={el.id.toString()}>
              {isShowDelay(el) && <DateDelay milliseconds={el.messageDate} />}
              <MessageLine userData={objUserData[el.userId]} message={el} />
            </div>
          ))}
      </div>
    </Frame>
  );
};

export default ChatMessages;
