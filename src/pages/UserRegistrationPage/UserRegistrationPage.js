import React, { Component } from "react";
import Frame from "../../components/Frame/Frame";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import ComponenHeader from "../../components/ComponentHeader/ComponentHeader";
import styles from "./UserRegistrationPage.module.scss";
import { regInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
import { inputTypes } from "../../constants/types/inputTypes";
import userRegistrationValidations from "../../common/validations/userRegistrationValidations";
import { getFormatedTime } from "../../common/time";
import { errorStateInputs } from "../../constants/initialStates/userRegistrationStates";
import {
  MAX_MAIL_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "../../constants/validations/userRegistration";
import { registrUser } from "../../controllers/registrationController";
import { getDateType } from "../../constants/types/timeUtil";

class UserRegistrationPage extends Component {
  state = {
    firstName: "",
    secondName: "",
    lastName: "",
    birthday: "",
    login: "",
    password: "",
    repeatedPassword: "",
    email: "",
    errorStateInputs: errorStateInputs,
  };

  validTimers = {
    firstName: null,
    secondName: null,
    lastName: null,
    birthday: null,
    login: null,
    password: null,
    repeatedPassword: null,
    email: null,
  };

  validInput = async (inputType, value) => {
    let errorType = null;
    const trimmedValue = value.trim();
    const trimmedPasswordValue = this.state.password.trim();
    let changedData = {
      errorStateInputs: this.state.errorStateInputs,
    };

    errorType = await userRegistrationValidations(
      inputType,
      trimmedValue,
      trimmedPasswordValue
    );

    changedData.errorStateInputs[inputType] = errorType;
    this.setState(changedData);
  };

  onInput = async (inputType, value) => {
    let changedData = {};
    changedData[inputType] = value;

    this.validTimers[inputType] && clearTimeout(this.validTimers[inputType]);
    this.validTimers[inputType] = setTimeout(
      () => this.validInput(inputType, value),
      1000
    );

    this.setState(changedData);
  };

  typedOnInput(inputType) {
    return (value) => this.onInput(inputType, value);
  }

  acceptData = async () => {
    let isExactly = true;
    let { errorStateInputs, ...regData } = this.state;
    const regInputTypesList = Object.keys(regData);
    await regInputTypesList.forEach((el) => this.validInput(el, regData[el]));
    regInputTypesList.forEach((el) => {
      if (errorStateInputs[el] != null) isExactly = false;
    });

    if (isExactly) {
      regData.registrationDate = getFormatedTime(getDateType.OD);
      const isSuccessReg = await registrUser(regData);
      isSuccessReg && console.log("next step");
    }
  };

  render() {
    return (
      <Frame style={styles.container}>
        <ComponenHeader header="Регистрация" />
        <div className={styles.inputColumn}>
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.firstName]}
            onInput={this.typedOnInput(regInputTypes.firstName)}
            headerText={"Имя"}
            maxLength={MAX_NAME_LENGTH}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.lastName]}
            onInput={this.typedOnInput(regInputTypes.lastName)}
            headerText={"Отчество"}
            maxLength={MAX_NAME_LENGTH}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.login]}
            onInput={this.typedOnInput(regInputTypes.login)}
            headerText={"Логин"}
            maxLength={MAX_LOGIN_LENGTH}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.password]}
            onInput={this.typedOnInput(regInputTypes.password)}
            headerText={"Пароль"}
            maxLength={MAX_PASSWORD_LENGTH}
          />
        </div>
        <div className={styles.inputColumn}>
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.secondName]}
            onInput={this.typedOnInput(regInputTypes.secondName)}
            headerText={"Фамилия"}
            maxLength={MAX_NAME_LENGTH}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.birthday]}
            onInput={this.typedOnInput(regInputTypes.birthday)}
            inputType={inputTypes.DATE}
            headerText={"Дата рождения"}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.email]}
            onInput={this.typedOnInput(regInputTypes.email)}
            headerText={"Email"}
            maxLength={MAX_MAIL_LENGTH}
          />
          <InputWithHeader
            errorText={
              this.state.errorStateInputs[regInputTypes.repeatedPassword]
            }
            onInput={this.typedOnInput(regInputTypes.repeatedPassword)}
            headerText={"Повторитие пароль"}
            maxLength={MAX_PASSWORD_LENGTH}
          />
        </div>
        <div className={styles.btnsContainer}>
          <button className={styles.btn}>&larr; Авторизоваться</button>
          <button onClick={this.acceptData} className={styles.btn}>
            Применить &rarr;
          </button>
        </div>
      </Frame>
    );
  }
}

export default UserRegistrationPage;
