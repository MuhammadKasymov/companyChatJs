import * as React from 'react';
import { RegisterObject } from 'src/types/types';
import styles from './RegisterModal.scss'

let userDateReg: RegisterObject = {
  id: '',
  login: '',
  name: '',
  sName: '',
  password:''
};


type Props = {
  isNeedRegister: React.Dispatch<React.SetStateAction<boolean>>;
  isReg: React.Dispatch<React.SetStateAction<boolean>>;
}


const RegisterModal = ({isNeedRegister, isReg} : Props) => {
  let user_data: any =  localStorage.getItem('user_data')
  
  const [firstPassword, setFirstPassword] = React.useState(String);
  const [isErrorInLogin, setIsErrorInLogin] = React.useState(Boolean);
  const [isErrorInSName, setIsErorrInSName] = React.useState(Boolean);
  const [isErrorInName, setIsErrorInName] = React.useState(Boolean);
  const [isErrorInPassword, setIsErrorInPassword] = React.useState(Boolean);
  const [isErrorInSPassword, setIsErrorInSPassword] = React.useState(Boolean);
  const [typeErrorInput, setTypeErrorInput] = React.useState("" as null
                                                      | "Имя должно быть длинее 1 символа!"
                                                      | "Фамилия должна быть длинее 1 символа!"
                                                      | "Логин должен быть длинее 3 символов!"
                                                      | "Пароль должен быть длинее 6 символов!"
                                                      | "Пароли не совпадают!"
                                                      | "Разрешены только буквы и цифры!"
                                                      | "Введите имя!"
                                                      | "Введите логин!"
                                                      | "Данный логин уже существует"
                                                      | "Введите фамилию!"
                                                      | "Введите пароль!"
                                                      | "Потвердиие пароль!")
  if (user_data != null) {
    user_data = JSON.parse(user_data);
  }

  // При каждом воде символа, запускается таймер на 0.3 секунды
  // для последнего символа, а старый таймер стирается.
  // При окончании таймера, запускается проверка ввода
  let checkTime: NodeJS.Timeout;
  const isStoptedTyping = (inp: EventTarget & HTMLInputElement) => {
    const getTime = new Date().getTime(); 
    if ( checkTime) {clearTimeout(checkTime);}
    checkTime = setTimeout(() =>  {
        const currDate = new Date().getTime();
        if (currDate - getTime > 300) {
          filterInput(inp.id, inp.value)   
        }
    }, 301)
}
  
  const confirmRegister = () => {
    filterInput('login', userDateReg.login);
    filterInput('name', userDateReg.name);
    filterInput('sName', userDateReg.sName);
    filterInput('password', userDateReg.password);
    // @ts-ignore
    filterInput('sPassword', document.getElementById('sPassword').value);
    if (typeErrorInput === null) {
      if (user_data) {
        userDateReg.id = Object.keys(user_data).length.toString();
        user_data[userDateReg.login] = userDateReg;
        user_data = JSON.stringify(user_data);
        localStorage.setItem('user_data', user_data);
      }
      else {
        userDateReg.id = '0';
        let newUserData: Object = {};
        newUserData[userDateReg.login] = userDateReg;
        const stringUserData: string = JSON.stringify(newUserData);
        localStorage.setItem('user_data', stringUserData);
      }
      isNeedRegister(false);
      isReg(true);
    }
  }

  const filterInput = (tp: string, inp: string) => {
    switch (tp) {
      case 'login':
        if (inp.length <= 3) {
          setTypeErrorInput("Логин должен быть длинее 3 символов!");
          setIsErrorInLogin(true);
        }
        else if (!tp.match(/^[а-яА-ЯёЁa-zA-Z0-9]+$/i)) {
          setTypeErrorInput("Разрешены только буквы и цифры!");
          setIsErrorInLogin(true);
        }
        else if (inp === '') {
          setTypeErrorInput("Введите логин!");
          setIsErrorInLogin(true);
        }
        else if (user_data && user_data[inp]) {
            setTypeErrorInput("Данный логин уже существует");
          setIsErrorInLogin(true);
          
        }
        else {
          setTypeErrorInput(null);
          setIsErrorInLogin(false);
          userDateReg.login = inp;
        }
        break;
      case 'name':
        if (inp.length < 2) {
          setTypeErrorInput("Логин должен быть длинее 3 символов!");
          setIsErrorInLogin(true);
        }
        else if (!tp.match(/^[а-яА-ЯёЁa-zA-Z0-9]+$/i)) {
          setTypeErrorInput("Разрешены только буквы и цифры!");
          setIsErrorInLogin(true);
        }
        else if (inp === '') {
          setTypeErrorInput("Введите логин!");
          setIsErrorInLogin(true);
        }
        else {
          setTypeErrorInput(null);
          setIsErrorInName(false);
          userDateReg.name = inp;
        }
        break;
      case 'sName':
        if (inp.length < 3) {
          setTypeErrorInput("Фамилия должна быть длинее 1 символа!");
          setIsErorrInSName(true);
        }
        else if (!tp.match(/^[а-яА-ЯёЁa-zA-Z0-9]+$/i)) {
          setTypeErrorInput("Разрешены только буквы и цифры!");
          setIsErorrInSName(true);
        }
        else if (inp === '') {
          setTypeErrorInput('Введите фамилию!');
          setIsErorrInSName(true);
        }
        else {
          setTypeErrorInput(null);
          setIsErorrInSName(false);
          userDateReg.sName = inp;
        }
        break;
      case 'password':
        if (inp.length <= 6) {
          setTypeErrorInput("Пароль должен быть длинее 6 символов!");
          setIsErrorInPassword(true);
        }
        else if (inp === '') {
          setTypeErrorInput('Введите пароль!');
          setIsErrorInPassword(true);
        }
        else {
          setTypeErrorInput(null);;
          setIsErrorInPassword(false);
          setFirstPassword(inp)
        }
        break;
      case 'sPassword':
        if (inp != firstPassword) {
          setTypeErrorInput("Пароли не совпадают!");
          setIsErrorInSPassword(true);
        }
        else if (inp === '') {
          setTypeErrorInput('Потвердиие пароль!');
          setIsErrorInSPassword(true);
        }
        else {
          setTypeErrorInput(null);
          setIsErrorInSPassword(false);
          userDateReg.password = inp;
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <h1>Регистрация</h1>
      <div className={styles.hr}></div>
      {typeErrorInput && <p className={styles.errorTypeText}>*{typeErrorInput}</p> }
      <div className={styles.row}>
        <p>Логин:&nbsp;&nbsp;</p>
        <input
          id={'login'}
          className={isErrorInLogin ? styles.errorInp : ""}
          maxLength={17}
          type="text"
          onChange={(ev) => isStoptedTyping(ev.target)}/>
      </div>
      <div className={styles.row}>
        <p>Имя:&nbsp;&nbsp;</p>
        <input
          id={'name'}
          className={isErrorInName ? styles.errorInp : ""}
          maxLength={15}
          type="text"
          onChange={(ev) => isStoptedTyping(ev.target)}
          />
      </div>
      <div className={styles.row}>
        <p>Фамилия:</p>
        <input 
          id={'sName'}
          className={isErrorInSName ? styles.errorInp : ""}
          maxLength={15}
          type="text"
          onChange={(ev) => isStoptedTyping(ev.target)}
        />
      </div>
      <div className={styles.row}>
        <p>Пароль:</p>
        <input
        id={'password'}
        className={isErrorInPassword ? styles.errorInp : ""}
        maxLength={14}
        type="text"
        onChange={(ev) => isStoptedTyping(ev.target)}/>
      </div>
      <div className={styles.row}>
        <p>Потвердите пароль:</p>
        <input
          id={'sPassword'}
          className={isErrorInSPassword ? styles.errorInp : ""}
          maxLength={14}
          type="text"
          onChange={(ev) => isStoptedTyping(ev.target)}
          />
      </div>
      <div className={styles.btnContainer}>
        <button 
          className={styles.btn}
          onClick={() => isNeedRegister(false)}
        >Назад</button>
        <button
        className={styles.btn}
        onClick={()=>confirmRegister()}
        >Принять</button>
      </div>
      
    </div>
  )
}

export default RegisterModal;
