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
import { userInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
import RegistrationButtons from "./components/RegistrationButtons";

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
          errorText={errorStateInputs[userInputTypes.firstName]}
          onInput={typedOnInput(userInputTypes.firstName)}
          headerText={"Имя"}
          maxLength={MAX_NAME_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.lastName]}
          onInput={typedOnInput(userInputTypes.lastName)}
          headerText={"Отчество"}
          maxLength={MAX_NAME_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.login]}
          onInput={typedOnInput(userInputTypes.login)}
          headerText={"Логин"}
          maxLength={MAX_LOGIN_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.password]}
          onInput={typedOnInput(userInputTypes.password)}
          headerText={"Пароль"}
          inputType={inputTypes.PASSWORD}
          maxLength={MAX_PASSWORD_LENGTH}
        />
      </div>
      <div className={styles.inputColumn}>
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.secondName]}
          onInput={typedOnInput(userInputTypes.secondName)}
          headerText={"Фамилия"}
          maxLength={MAX_NAME_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.birthday]}
          onInput={typedOnInput(userInputTypes.birthday)}
          inputType={inputTypes.DATE}
          headerText={"Дата рождения"}
        />
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.email]}
          onInput={typedOnInput(userInputTypes.email)}
          headerText={"Email"}
          maxLength={MAX_MAIL_LENGTH}
        />
        <InputWithHeader
          errorText={errorStateInputs[userInputTypes.repeatedPassword]}
          inputType={inputTypes.PASSWORD}
          onInput={typedOnInput(userInputTypes.repeatedPassword)}
          headerText={"Повторитие пароль"}
          maxLength={MAX_PASSWORD_LENGTH}
        />
      </div>
     <RegistrationButtons goToAuth={goToAuth} goNext={goNext} />
    </RedirectWrapper>
  );
}

export default RegistrationSelfInputs;
