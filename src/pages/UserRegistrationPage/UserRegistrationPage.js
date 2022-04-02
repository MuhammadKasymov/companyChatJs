import React, { Component } from "react";
import Frame from "../../components/Frame/Frame";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import ComponenHeader from "../../components/ComponentHeader/ComponentHeader";
import styles from "./UserRegistrationPage.module.scss";
import { inputTypes } from "../../contants/types/pageTypes.js/UserRegistrationContstans";

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
  };

  componentDidMount() {
    console.log("it's started ");
  }

  onInput(inputType, value) {
    let changedDate = {};
    changedDate[inputType] = value;
    this.setState(changedDate);
  }

  typedOnInput(inputType) {
    return (value) => this.onInput(inputType, value);
  }

  render() {
    return (
      <Frame style={styles.container}>
        <ComponenHeader header="Регистрация" />
        <div className={styles.inputColumn}>
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.login)}
            headerText={"Логин"}
          />
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.firstName)}
            headerText={"Имя"}
          />
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.lastName)}
            headerText={"Отчество"}
          />
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.password)}
            headerText={"Пароль"}
          />
        </div>
        <div className={styles.inputColumn}>
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.email)}
            headerText={"Email"}
          />
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.secontName)}
            headerText={"Фамилия"}
          />
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.birthday)}
            headerText={"Дата рождения"}
          />
          <InputWithHeader
            onInput={this.typedOnInput(inputTypes.repeatedPassword)}
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
