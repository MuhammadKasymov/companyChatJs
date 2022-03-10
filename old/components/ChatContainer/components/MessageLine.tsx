import * as React from 'react';
import styles from './MessageLine.scss';
import ChatString from 'src/types/types';

interface Props extends ChatString {
  self_id: string;
}

const MessageLine = ({id, date, txt, user, self_id} : Props) => {
  const isSelf: boolean = (self_id === id);
  return (
    <div className={isSelf ? styles.selfMsg : styles.container}>
      <div className={styles.msgText}>
        <p>{txt}</p>
        <p className={styles.date}>&nbsp;&nbsp;{date}</p>
        </div>
        <div className={styles.ico}>
          <p>{user.charAt(0)}</p>
        </div>

    </div>
  )
}

export default MessageLine;