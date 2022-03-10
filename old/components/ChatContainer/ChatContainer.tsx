import * as React from 'react';
import styles from './ChatContainer.scss';
import ChatString from 'src/types/types';
import MessageLine from './components/MessageLine';
import gTime from '../../utils/handlerUtils'
type Props = {
  chatName: string; 
}

const ChatContainer = ({chatName} : Props) => {
  const selfData = JSON.parse(localStorage.getItem('authData'));
  const selfId = selfData.id
  const selfName = selfData.name;
  let chatsData = JSON.parse(localStorage.getItem('chats'));
  let cHistory: Array<ChatString> = chatsData[chatName].chatHistory;
  const [currChat, setCurrChat] = React.useState(cHistory);
  // const [isChoosedMessage, setIsChoosedMessage] = React.useState(true);
  // const [isOnlyOneChoosedMsg, setIsOnlyOneChoosedMsg] = React.useState(true);
  

  //For upd current chat
  React.useEffect(() => setCurrChat(cHistory), [chatName])
  console.log("ChatContainer - ", currChat)

  //Отправить сообщение в чат
  const sendMsg = () => {
    // @ts-ignore
    let text: HTMLTextAreaElement = document.getElementById('txt');
    // @ts-ignore
    if (text.value.trim() != '') {
      const msg: ChatString = {
        id: selfId,
        date: gTime('DM', 0).toString(),
        //@ts-ignore
        txt: text.value.trim(),
        user: selfName,
      }
      cHistory.push(msg)
      chatsData[chatName].chatHistory = cHistory;
      const strChatsData = JSON.stringify(chatsData)
      localStorage.setItem('chats', strChatsData);
      setCurrChat(cHistory)
    }
    setTimeout(()=>{scrollToBtmChat()}, 50)
    console.log("chat history - ", cHistory)
    // @ts-ignore
    text.value = '';
  };
  
  //Проверка на соответсвие нажатой кнопки с 'Enter'
  const isEnterPressed = (ev) => {
    if (ev.key === 'Enter'){
      ev.preventDefault()
      sendMsg()
    }
  }
  //Проскролить в конец чата
  const scrollToBtmChat = () => {
    //@ts-ignore
    let msgContainer: HTMLElement = document.getElementById('messageContainer') ;
    msgContainer.scrollTop = msgContainer.scrollHeight; 
  }

  // const editMessage = (el: number, tp: string) => {
  //   switch (tp) {
  //     case 'delete':
  //       chatHistory.slice(el - 1, 1);
  //       setCurrChat(chatHistory) 
  //       break;
  //     case 'rewrite': 
  //       // @ts-ignore
  //       const text: HTMLTextAreaElement = document.getElementById('txt');
  //       // @ts-ignore
  //       text.value = chatHistory[el].txt;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  setTimeout(()=>{scrollToBtmChat()}, 50)

  return (
    <div className={styles.container} id={chatName}>
        {/* {isChoosedMessage &&
          <div className={styles.choosedMessageContainer}>
            <div className={styles.btnEditContainer}>
              <button>Редактировать</button>
              {isOnlyOneChoosedMsg && <button>Удалить</button>}
            </div>
          </div>
        } */}
      <div id={'messageContainer'} className={styles.messageContainer}>
        {currChat.map((el, idx)=> {
            const timeInHourse = gTime('HM', Number(el.date)).toString();
            console.log("isUpdated")
            return (
              <MessageLine
                  id={el.id}
                  self_id={selfId}
                  key={idx.toString()}
                  txt={el.txt}
                  date={timeInHourse}
                  user={el.user}
                />
            )
        })}
      </div>
      <div className={styles.inpContiner}>
        <textarea
        id={'txt'}
        onKeyPress={(ev) => isEnterPressed(ev)}
        className={styles.txt} rows={3}></textarea>
        <button
         id={'btn'}
         className={styles.btn}
         onClick={()=>sendMsg()}
         >S</button>
      </div>
    </div>
  );
}

export default ChatContainer;
