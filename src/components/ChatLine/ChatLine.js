import * as React from "react";
import styles from "./ChatLine.module.scss";
import { addTripleDot } from "../../common/composeString";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import { useNavigate } from "react-router-dom";
import { chatRouteNoId } from "../../constants/routePath";

const ChatLine = ({ chatId, name, lastMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempData = useSelector((state) => state.tempData);
  const isChoosed = chatId === Number(tempData.chatId);
  let msgText = "";
  if (lastMessage) {
    msgText = addTripleDot(lastMessage.messageText, 10);
  }

  const onPress = () => {
    dispatch(setCurrentChatId({ chatId }));
    navigate(chatRouteNoId + chatId);
  };

  return (
    <div
      onClick={onPress}
      className={`${styles.container} ${isChoosed ? styles.bgColor : ""}`}
    >
      <div className={styles.ico}>
        <p>{name.charAt(0)}</p>
      </div>
      <div className={styles.infDiv}>
        <p>{`Имя: ${name}`} </p>
        {msgText && <p>{`Последнeе: ${msgText}`}</p>}
        {!msgText && <p>Пустая история чата...</p>}
      </div>
    </div>
  );
};

export default ChatLine;
