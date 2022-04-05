import React, { Component } from "react";
import Frame from "../../components/Frame/Frame";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import ComponenHeader from "../../components/ComponentHeader/ComponentHeader";
import styles from "./UserRegistrationPage.module.scss";
import { regInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
import userRegistrationValidations from "../../common/validations/userRegistrationValidations";
import { errorStateInputs } from "../../constants/initialStates/userRegistrationStates";

class UserRegistrationPage extends Component {
  state = {
    firstName: "",
    secontName: "",
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
    secontName: null,
    lastName: null,
    birthday: null,
    login: null,
    password: null,
    repeatedPassword: null,
    email: null,
  };

  validInput = async (inputType, value) => {
    let errorType = null;
    let changedData = {
      errorStateInputs: this.state.errorStateInputs,
    };
    this.validTimers[inputType] && clearTimeout(this.validTimers[inputType]);
    this.validTimers[inputType] = setTimeout(async () => {
      const trimmedPasswordValue = this.state.password.trim();
      errorType = await userRegistrationValidations(
        inputType,
        value,
        trimmedPasswordValue
      );
      changedData.errorStateInputs[inputType] = errorType;
      this.setState(changedData);
    }, 500);

    return errorType;
  };

  onInput = async (inputType, value) => {
    let changedData = {};
    const trimmedValue = value.trim();
    changedData[inputType] = value;

    await this.validInput(inputType, trimmedValue);
    this.setState(changedData);
  };

  typedOnInput(inputType) {
    return (value) => this.onInput(inputType, value);
  }

  render() {
    return (
      <Frame style={styles.container}>
        <ComponenHeader header="Регистрация" />
        <div className={styles.inputColumn}>
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.firstName]}
            onInput={this.typedOnInput(regInputTypes.firstName)}
            headerText={"Имя"}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.lastName]}
            onInput={this.typedOnInput(regInputTypes.lastName)}
            headerText={"Отчество"}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.login]}
            onInput={this.typedOnInput(regInputTypes.login)}
            headerText={"Логин"}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.password]}
            onInput={this.typedOnInput(regInputTypes.password)}
            headerText={"Пароль"}
          />
        </div>
        <div className={styles.inputColumn}>
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.secontName]}
            onInput={this.typedOnInput(regInputTypes.secontName)}
            headerText={"Фамилия"}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.birthday]}
            onInput={this.typedOnInput(regInputTypes.birthday)}
            headerText={"Дата рождения"}
          />
          <InputWithHeader
            errorText={this.state.errorStateInputs[regInputTypes.email]}
            onInput={this.typedOnInput(regInputTypes.email)}
            headerText={"Email"}
          />
          <InputWithHeader
            errorText={
              this.state.errorStateInputs[regInputTypes.repeatedPassword]
            }
            onInput={this.typedOnInput(regInputTypes.repeatedPassword)}
            headerText={"Повторитие пароль"}
          />
        </div>
        <div className={styles.btnsContainer}>
          <button className={styles.btn}>&larr; Авторизоваться</button>
          <button className={styles.btn}>Применить &rarr;</button>
        </div>
      </Frame>
    );
  }
}

export default UserRegistrationPage;
