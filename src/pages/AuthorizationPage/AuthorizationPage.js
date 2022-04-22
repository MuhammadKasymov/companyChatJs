import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./AuthorizationPage.module.scss";
import Frame from "../../components/Frame/Frame";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import { inputTypes } from "../../constants/types/inputTypes";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import { authInputTypes } from "../../constants/types/pageTypes/AuthorizationConstans";
import {
  NOT_EXIST_USER,
  INCORRECT_PASSWORD,
  EMPTY_INPUT,
} from "../../constants/types/exceptionTypes/authExceptionTypes";
import authUser from "../../controllers/authController";
import { isEmptyString } from "../../common/validations/stringValidations";
import { setAuth } from "../../store/action-creators/auth";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import { chatRouteNoId, registrationRoute } from "../../constants/routePath";

class AuthorizationPage extends Component {
  state = {
    login: "",
    password: "",
    errorState: {
      login: null,
      password: null,
    },
    isRedirect: false,
    redirectPath: chatRouteNoId,
  };

  constructor({ props }) {
    super(props);
  }

  onInput = async (inputType, value) => {
    const errState = this.state.errorState;
    let changedData = { errorState: errState };
    changedData[inputType] = value;
    errState[inputType] = null;
    this.setState(changedData);
  };

  typedOnInput(inputType) {
    return (value) => this.onInput(inputType, value);
  }

  async isValidInputs() {
    let isValid = true;
    const errorState = {
      login: null,
      password: null,
    };
    if (isEmptyString(this.state.login)) {
      errorState.login = EMPTY_INPUT;
      isValid = false;
    }
    if (isEmptyString(this.state.password)) {
      errorState.password = EMPTY_INPUT;
      isValid = false;
    }
    await this.setState({ errorState: errorState });

    return isValid;
  }

  redirectTo(path) {
    this.setState({ isRedirect: true, redirectPath: path });
  }

  confirmData = async () => {
    const { errorState, ...authData } = this.state;
    const isValid = await this.isValidInputs();
    if (!isValid) return;
    const { goodAuth, notExistUser, userData, adminChatId } = await authUser(
      authData
    );
    if (notExistUser) {
      this.setState({
        errorState: { password: null, login: NOT_EXIST_USER },
      });
    } else if (!goodAuth) {
      this.setState({
        errorState: { password: INCORRECT_PASSWORD, login: null },
      });
    } else {
      this.props.setAuth(userData);
      this.props.setCurrentChatId({chatId: adminChatId});
      this.redirectTo(chatRouteNoId + adminChatId);
    }
  };

  onKeyPress = (event) => {
    event.keyCode === 13 && this.confirmData();
  };

  goToRegistration = () => {
    this.setState({
      isRedirect: true,
      redirectPath: registrationRoute,
    });
  };

  render() {
    return (
      <RedirectWrapper
        isRedirect={this.state.isRedirect}
        path={this.state.redirectPath}
      >
        <Frame headerText={"Авторизация"} style={styles.container}>
          <InputWithHeader
            style={styles.inputWithHeader}
            headerText={"Логин/Email"}
            errorText={this.state.errorState.login}
            onInput={this.typedOnInput(authInputTypes.login)}
          />
          <InputWithHeader
            style={styles.inputWithHeader}
            headerText={"Пароль"}
            inputType={inputTypes.PASSWORD}
            errorText={this.state.errorState.password}
            onKeyUp={this.onKeyPress}
            onInput={this.typedOnInput(authInputTypes.password)}
          />
          <div className={styles.btnContainer}>
            <button onClick={this.goToRegistration} className={styles.regBtn}>
              Регистрация
            </button>
            <button className={styles.authBtn} onClick={this.confirmData}>
              Применить
            </button>
          </div>
        </Frame>
      </RedirectWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setAuth, setCurrentChatId }, dispatch);

export default connect(null, mapDispatchToProps)(AuthorizationPage);
