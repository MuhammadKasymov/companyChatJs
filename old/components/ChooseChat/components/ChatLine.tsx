import * as React from 'react';
import styles from './ChatLine.scss';
import ChatString from 'src/types/types';


interface Props {
  isChoosed: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  chatHistory: Array<ChatString>;
}


const ChatLine = ({isChoosed, name, chatHistory} : Props) => {
  const lastMessage = chatHistory[chatHistory.length - 1];
  let msgText: string;
  if (lastMessage.txt.length > 10) {
    msgText = lastMessage.txt.substring(0, 10) + '...';
  } else {
    msgText = lastMessage.txt;
  }
  const setChooseChat = () => {
    if (name === 'Рабочий чат') {
      isChoosed('workerChat')
    } else isChoosed('fludChat')
  }
  return (
    <div onClick={()=>setChooseChat()} className={`${styles.container} ${true ? styles.bgColor : ""}`}>
      <div className={styles.ico}>
        <p>
          {name.charAt(0)}
        </p>
      </div>
      <div className={styles.infDiv}>
        <p>{`Имя: ${name}`} </p>
        <p>{`Последне: ${msgText}`}</p>
      </div>
    </div>
  )
}

export default ChatLine;