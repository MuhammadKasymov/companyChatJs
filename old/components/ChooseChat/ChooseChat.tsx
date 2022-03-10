import * as React from 'react';
import styles from './ChooseChat.scss'
import ChatLine from './components/ChatLine';


// Эта часть по идее должна быть из бекенда
const defChatLine = [{
  id: '1',
  date: '1628654260',
  txt: 'Привет',
  user: 'Алексей'
},
{
  id: '2',
  date: '1628654430',
  txt: 'Добрый вечер',
  user: 'Сергей'
},
{
  id: '3',
  date: '1628654579',
  txt: 'Lorem ipsum dolor sit amet, consectetur'
  + 'adipiscing elit, sed do eiusmod tempor incididunt'
  + 'ut labore et dolore magna aliqua. Ut enim ad minim' 
  + 'veniam, quis nostrud exercitation ullamco laboris'
  + 'nisi ut aliquip ex ea commodo consequat. Duis aute'
  + 'irure dolor in reprehenderit in voluptate velit'
  + 'esse cillum dolore eu fugiat nulla pariatur.'
  + 'Excepteur sint occaecat cupidatat non proident,'
  + 'sunt in culpa qui officia deserunt mollit anim'
  + 'id est laborum.',
  user: 'Алексей'
}]
const defaultChats = {
  workerChat: {
    name: "Рабочий чат",
    chatHistory: [
      ...defChatLine,
      ...defChatLine,
      ...defChatLine
    ]
  },
  fludChat: {
    name: "Чат для флуда",
    chatHistory: [
      ...defChatLine,
      ...defChatLine,
      ...defChatLine
    ]
  }
} 


type Props = {
  setCurrChat: React.Dispatch<React.SetStateAction<string>>;
}


const ChooseChat = ({setCurrChat} : Props) => {
  let chatsObject = JSON.parse(localStorage.getItem('chats'));
  
  //Eсли в базе отствуют чаты, то устанавливаются дефолтные
  if (chatsObject === null)  {
    chatsObject = defaultChats;
    localStorage.setItem('chats', JSON.stringify(defaultChats))
  }
  const s = JSON.parse(localStorage.getItem('chats'))

  return (
    <div className={styles.container}>
      <h1>Список чатов</h1>
      <div className={styles.hr} />
      <ChatLine
        isChoosed={setCurrChat}
        name={chatsObject.workerChat.name}
        chatHistory={chatsObject.workerChat.chatHistory}
        />
      <div className={styles.hr} />
      <ChatLine
        isChoosed={setCurrChat}
        name={chatsObject.fludChat.name}
        chatHistory={chatsObject.fludChat.chatHistory}
        />
    </div>
  )
}

export default ChooseChat;