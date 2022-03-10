import * as React from 'react';
import styles from './RegLogPage.scss'
import ModalIsRegister from './components/ModalIsRegister/ModalIsRegister';
import RegisterModal from './components/RegisterModal/RegisterModal'
import AuthModal from './components/AuthModal/AuthModal';


interface Props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}


const RegLogPage = ({setIsAuth} : Props) => {
  const [isReg, setIsReg] = React.useState(true);
  const [isNeedReg, setIsNeedReg] = React.useState(Boolean);
  if (localStorage.getItem('authData') != null) {
    React.useEffect(() => {
      setIsAuth(true)
    }, []) 
  }

  return (
    <div className={styles.container}>
        {isNeedReg ?
          <RegisterModal
          isNeedRegister={setIsNeedReg}
          isReg={setIsReg}
          />
          :
          (isReg ?
          <AuthModal
            setIsAuth={setIsAuth}
            goBack={setIsReg}
          />
          :
          <ModalIsRegister
            isNeedRegister={setIsNeedReg}
            isRegistered={setIsReg}
          />
        )
      }
      

    </div>
  )
}

export default RegLogPage;