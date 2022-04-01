import React, { Component } from "react";
import Frame from "../../components/Frame/Frame";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import ComponenHeader from "../../components/ComponentHeader/ComponentHeader";
import styles from "./UserRegistrationPage.module.scss";

class UserRegistrationPage extends Component {
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
          <InputWithHeader header={"Логин"} />
          <InputWithHeader header={"Имя"} />
          <InputWithHeader header={"Отчество"} />
          <InputWithHeader header={"Пароль"} />
        </div>
        <div className={styles.inputColumn}>
          <InputWithHeader header={"Email"} />
          <InputWithHeader header={"Фамилия"} />
          <InputWithHeader header={"Дата рождения"} />
          <InputWithHeader header={"Повторитие пароль"} />
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
