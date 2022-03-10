import * as React from 'react';
import styles from './ModalIsRegister.scss'

type Props = {
  isRegistered?: React.Dispatch<React.SetStateAction<boolean>>;
  isNeedRegister?: React.Dispatch<React.SetStateAction<boolean>>;
}


const ModalIsRegister = ({isRegistered, isNeedRegister} : Props) => {
  return (
    <div className={styles.container}>
       <p>Вы уже зарегистрированы?</p>
       <div className={styles.btnContainer}>
         <button onClick={()=>isRegistered(true)}>Да</button>
         <button onClick={()=>isNeedRegister(true)}>Нет</button>
       </div>
    </div>
  )
}


export default ModalIsRegister;