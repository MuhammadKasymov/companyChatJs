import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./UserRegistrationPage.module.scss";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import Frame from "../../components/Frame/Frame";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import { setAuth } from "../../store/action-creators/auth";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import userRegistrationValidations from "../../common/validations/userRegistrationValidations";
import { getFormatedTime } from "../../common/time";
import { registrUser } from "../../controllers/registrationController";
import {
  MAX_MAIL_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "../../constants/validations/userRegistration";
import { getDateType } from "../../constants/types/timeUtil";
import { regInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
import { inputTypes } from "../../constants/types/inputTypes";
import { errorStateInputs } from "../../constants/initialStates/userRegistrationStates";
import { chatRouteNoId, authRoute } from "../../constants/routePath";

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
    isRedirect: false,
    redirectPath: chatRouteNoId,
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

  constructor({ props }) {
    super(props);
  }

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
    let { errorStateInputs, repeatedPassword, isRedirect, ...regData } =
      this.state;
    const { password, ...selfInfo } = regData;
    const regInputTypesList = Object.keys(regData);

    for (let i = 0; i < regInputTypesList.length; i++) {
      const el = regInputTypesList[i];
      await this.validInput(el, regData[el]);
    }
    regInputTypesList.forEach((el) => {
      if (errorStateInputs[el] != null) isExactly = false;
    });
    if (isExactly) {
      regData.registrationDate = getFormatedTime(getDateType.OD);
      const regResult = await registrUser(regData);
      if (regResult.isSuccess) {
        selfInfo.id = regResult.userId;
        this.props.setCurrentChatId(regResult.adminChatId);
        this.props.setAuth(selfInfo);
        this.setState({
          isRedirect: true,
          redirectPath: chatRouteNoId + regResult.adminChatId,
        });
      }
    }
  };

  goToAuth = () => {
    this.setState({
      isRedirect: true,
      redirectPath: authRoute,
    });
  };

  render() {
    return (
      <RedirectWrapper
        isRedirect={this.state.isRedirect}
        path={this.state.redirectPath}
      >
        <Frame style={styles.container} headerText="Регистрация">
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
              inputType={inputTypes.PASSWORD}
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
              inputType={inputTypes.PASSWORD}
              onInput={this.typedOnInput(regInputTypes.repeatedPassword)}
              headerText={"Повторитие пароль"}
              maxLength={MAX_PASSWORD_LENGTH}
            />
          </div>
          <div className={styles.btnsContainer}>
            <button onClick={this.goToAuth} className={styles.btn}>
              &larr; Авторизоваться
            </button>
            <button onClick={this.acceptData} className={styles.btn}>
              Применить &rarr;
            </button>
          </div>
        </Frame>
      </RedirectWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setAuth, setCurrentChatId }, dispatch);

export default connect(null, mapDispatchToProps)(UserRegistrationPage);
