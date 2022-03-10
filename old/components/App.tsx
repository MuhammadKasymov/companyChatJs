import * as React from 'react';
import styles from './App.scss'
import ChatContainer from './ChatContainer/ChatContainer';
import ChooseChat from './ChooseChat/ChooseChat';
import RegLogPage from './RegLogPage/RegLogPage';

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [currChat, setCurrChat] = React.useState('fludChat');
  React.useEffect(() => console.log(currChat), [currChat]);
  return (
    <div className={styles.container}>
      {isAuth ? (
        <>
          <ChooseChat setCurrChat={setCurrChat}/>
          <ChatContainer chatName={currChat} />
        </>
      ) :
      <RegLogPage setIsAuth={setIsAuth} />
      }
    </div>
  )
}

export default App;