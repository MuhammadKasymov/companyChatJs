import * as React from "react";
import styles from "./ChatLine.module.scss";
import { addTripleDot } from "../../common/composeString";
import { Link } from "react-router-dom";

//Todo: получать последнее сообщение
// и выбранный чат из redux из redux;
const ChatLine = ({ isChoosed, name, lastMessage }) => {
  const msgText = addTripleDot(lastMessage.txt, 10);
  //Todo: изменять текущий чат в redux
  return (
    // <Link>
      <div
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
    // </Link>
  );
};

export default ChatLine;
