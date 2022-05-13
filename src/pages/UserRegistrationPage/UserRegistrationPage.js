import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./UserRegistrationPage.module.scss";
import RegistrationSelfInputs from "../../components/RegistrationInputs/RegistrationSelfInputs";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import Frame from "../../components/Frame/Frame";
import { setAuth } from "../../store/action-creators/auth";
import { setCurrentChatId } from "../../store/action-creators/temporaryData";
import userRegistrationValidations from "../../common/validations/userRegistrationValidations";
import { getFormatedTime } from "../../common/time";
import { registrUser } from "../../controllers/registrationController";
import { getDateType } from "../../constants/types/timeUtil";
import { errorStateInputs } from "../../constants/initialStates/userRegistrationStates";
import { chatRouteNoId, authRoute } from "../../constants/routePath";
import { inputTypes } from "../../constants/types/inputTypes";

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

  typedOnInput = (inputType) => (value) => this.onInput(inputType, value);

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
          <RegistrationSelfInputs
            typedOnInput={this.typedOnInput.bind(this)}
            errorStateInputs={this.state.errorStateInputs}
            goNext={this.acceptData}
          />
        </Frame>
      </RedirectWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setAuth, setCurrentChatId }, dispatch);

export default connect(null, mapDispatchToProps)(UserRegistrationPage);
