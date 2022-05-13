import React, { useState } from "react";
import InputWithHeader from "../InputWithHeader/InputWithHeader";
import styles from "./RegistrationSelfInputs.module.scss";
import {
  MAX_MAIL_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "../../constants/validations/userRegistration";
import { inputTypes } from "../../constants/types/inputTypes";
import RedirectWrapper from "../RedirectWrapper/RedirectWrapper";
import { authRoute } from "../../constants/routePath";
import { regInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";

function RegistrationSelfInputs({ typedOnInput, errorStateInputs, goNext }) {
  const [redirectData, setRedirectData] = useState({
    isRedirect: false,
    redirectPath: authRoute,
  });

  const goToAuth = () => {
    setRedirectData({
      isRedirect: true,
      redirectPath: authRoute,
    });
  };

  return (
    <RedirectWrapper
      isRedirect={redirectData.isRedirect}
      path={redirectData.redirectPath}
    >
      <div className={styles.inputColumn}>
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.firstName]}
          onInput={typedOnInput(regInputTypes.firstName)}
          headerText={"Имя"}
          maxLength={MAX_NAME_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.lastName]}
          onInput={typedOnInput(regInputTypes.lastName)}
          headerText={"Отчество"}
          maxLength={MAX_NAME_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.login]}
          onInput={typedOnInput(regInputTypes.login)}
          headerText={"Логин"}
          maxLength={MAX_LOGIN_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.password]}
          onInput={typedOnInput(regInputTypes.password)}
          headerText={"Пароль"}
          inputType={inputTypes.PASSWORD}
          maxLength={MAX_PASSWORD_LENGTH}
        />
      </div>
      <div className={styles.inputColumn}>
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.secondName]}
          onInput={typedOnInput(regInputTypes.secondName)}
          headerText={"Фамилия"}
          maxLength={MAX_NAME_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.birthday]}
          onInput={typedOnInput(regInputTypes.birthday)}
          inputType={inputTypes.DATE}
          headerText={"Дата рождения"}
        />
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.email]}
          onInput={typedOnInput(regInputTypes.email)}
          headerText={"Email"}
          maxLength={MAX_MAIL_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[regInputTypes.repeatedPassword]}
          inputType={inputTypes.PASSWORD}
          onInput={typedOnInput(regInputTypes.repeatedPassword)}
          headerText={"Повторитие пароль"}
          maxLength={MAX_PASSWORD_LENGTH}
        />
      </div>
      <div className={styles.btnsContainer}>
        <button onClick={goToAuth} className={styles.btn}>
          &larr; Авторизоваться
        </button>
        <button onClick={goNext} className={styles.btn}>
          Применить &rarr;
        </button>
      </div>
    </RedirectWrapper>
  );
}

export default RegistrationSelfInputs;
