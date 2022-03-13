import * as React from "react";
import styles from "./ChatLine.module.scss";
import { addTripleDot } from "../../common/composeString";

//Todo: получать последнее сообщение
// и выбранный чат из redux из redux;
const ChatLine = ({ isChoosed, name, lastMessage }) => {
  
  const msgText = addTripleDot(lastMessage.txt);
  //Todo: изменять текущий чат в redux
  const setChooseChat = () => {
    if (name === "Рабочий чат") {
      isChoosed("workerChat");
    } else isChoosed("fludChat");
  };
  return (
    <div
      onClick={() => setChooseChat()}
      // Todo: добавить анимацию выбора чата
      className={`${styles.container} ${isChoosed ? styles.bgColor : ""}`}
    >
      <div className={styles.ico}>
        <p>{name.charAt(0)}</p>
      </div>
      <div className={styles.infDiv}>
        <p>{`Имя: ${name}`} </p>
        <p>{`Последне: ${msgText}`}</p>
      </div>
    </div>
  );
};

export default ChatLine;
