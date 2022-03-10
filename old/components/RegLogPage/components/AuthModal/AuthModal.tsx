import * as React from 'react';
import styles from './AuthModal.scss'
import {RegisterObject} from 'src/types/types' 

type Props = {
  goBack: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({goBack, setIsAuth}: Props) => {
  let user_data =  localStorage.getItem('user_data');
  const [currLogin, setCurrLogin] = React.useState(String);
  const [currPassword, setCurrPassword] = React.useState(String);
  const [typeError, setTypeError] = React.useState(null as null
                                                  | 'Данный логин не существует'
                                                  | 'База данных пуста!'
                                                  | 'Не правильный пароль!'
                                                  | 'Заполните все строки!');
                                                
  if (user_data === null) {
    React.useEffect(() => setTypeError("База данных пуста!"), [])
  }
  else {
    user_data = JSON.parse(user_data);
  }

  const confirm = () => {
    const result = filter();
    if (result) {
      const usDate = JSON.stringify(result);
      localStorage.setItem('authData', usDate);
      setIsAuth(true);
    }
  }

  // Проверяет на:
  // Наличие ошибок
  // Соответсвие с базой данных
  const filter = () => {
    setTypeError(null)
    const tLoginDate:RegisterObject = user_data[currLogin];
    if (user_data === null) {
      setTypeError('База данных пуста!')
    }
    else {
      if (!tLoginDate) {
        setTypeError('Данный логин не существует');
      }
      else if (currLogin === '' || currPassword === '') {
        setTypeError('Заполните все строки!')
      }
      else {
        if (tLoginDate['password'] != currPassword) {
          setTypeError('Не правильный пароль!');
        } else {
          return tLoginDate;
        }
      }
    }
  }
  return (
    <div className={styles.container}>
      <h1>Авторизация</h1>
      <div className={styles.hr}></div>
      {typeError && <p className={styles.errorTypeText}>*{typeError}</p> }
      <div className={styles.row}>
        <p>Логин:</p>
        <input
          id='login'
          type="text"
          readOnly={typeError === 'База данных пуста!'}
          onChange={(ev)=>setCurrLogin(ev.target.value)}
        />
      </div>
      <div className={styles.row}>
        <p>Пароль:</p>
        <input
          id='password'
          type="text"
          readOnly={typeError === 'База данных пуста!'}
          onChange={(ev)=>setCurrPassword(ev.target.value)}
          />
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.btn}
          onClick={()=> goBack(false)}
        >Назад</button>
        <button
          onClick={()=>confirm()}
          className={styles.btn}
        >Принять</button>
      </div>
    </div>
  )
}

export default AuthModal