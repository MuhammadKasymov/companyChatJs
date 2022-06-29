import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CombinedImage from "../../components/CombinedImage/CombinedImage";
import NavBar from "../../components/NavBar/NavBar";
import Frame from "../../components/Frame/Frame";
import styles from "./ProfilePage.module.scss";
import { setAuth } from "../../store/action-creators/auth";
import { getCompressedImg } from "../../common/files";
import { errorStateInputs } from "../../constants/initialStates/userRegistrationStates";
import userDataValidations from "../../common/validations/userDataValidations";
import { isEmptyString } from "../../common/validations/stringValidations";
import { userInputTypes } from "../../constants/types/pageTypes/UserRegistrationContstans";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import {
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "../../constants/validations/userRegistration";
import { inputTypes } from "../../constants/types/inputTypes";
import {
  createImage,
  deleteImage,
  getImageById,
} from "../../controllers/files";
import { getFriendData } from "../../controllers/friendsController";
import { withRouter } from "../../hoc/classHocs";
import { getChatIdByUrl, getOnlyNumbers } from "../../common/composeString";
import { checkPassword, setUserData } from "../../controllers/userController";
import { BAD_OLD_PASSWORD } from "../../constants/types/exceptionTypes/registrationExceptionTypes";

class ProfilePage extends Component {
  state = {
    imgDataFile: null,
    isSelf: false,
    isRemovedImage: false,
    userData: {
      imageId: "",
      birthday: "",
      firstName: "",
      lastName: "",
      oldPassword: "",
      phone: "",
      secondName: "",
      password: "",
      repeatedPassword: "",
    },
    errorState: errorStateInputs,
  };

  validTimers = { ...errorStateInputs };

  constructor({ props }) {
    super(props);
  }

  componentDidMount() {
    this.uploadData();
  }

  componentWillUnmount() {
    Object.keys(this.validTimers).forEach((el) => {
      el && clearTimeout(this.validTimers[el]);
    });
  }

  uploadData = async () => {
    const path = this.props.location?.pathname;
    const userId = getChatIdByUrl(path);
    const selfId = this.props.auth.id;
    const uploadUserData = await getFriendData(userId);
    const { id, login, birthPlace, ...userSelfData } = uploadUserData;
    const isExist = Object.keys(userSelfData).length !== 0;
    const userData = isExist
      ? { ...this.state.userData, ...userSelfData }
      : this.state.userData;
    const isSelf = selfId === userId;
    const imgId = userData?.imageId;
    const imgDataFile = imgId ? await getImageById(imgId) : null;
    this.setState({ userData, imgDataFile, isSelf });
  };

  setImgFile = async (imgFile) => {
    let imgDataFile = {};
    imgDataFile.image = await getCompressedImg(imgFile, 500);
    imgDataFile.smallImage = await getCompressedImg(imgFile, 120);
    this.setState({ imgDataFile });
  };

  removeImgFile = () =>
    this.setState({
      imgDataFile: null,
      userData: { ...this.state.userData },
      isRemovedImage: true,
    });

  checkOldPassword = async (password) => {
    const login = this.props.auth.login;
    const isGoodPassword = await checkPassword(login, password);
    return !isGoodPassword ? BAD_OLD_PASSWORD : null;
  };

  validInput = async (inputType, value) => {
    let errorType = null;
    const password = this.state.userData.password;
    const repeatedPassword = this.state.userData.repeatedPassword;

    const trimmedValue = String(value).trim();
    let errorState = this.state.errorState;
    const isOldPassword =
      inputType === userInputTypes.oldPassword && !isEmptyString(value);
    errorType = !isOldPassword
      ? await userDataValidations(inputType, trimmedValue, password)
      : await this.checkOldPassword(value);
    errorState[inputType] = errorType;
    if (inputType === errorStateInputs.password && repeatedPassword) {
      errorState.repeatedPassword = await userDataValidations(
        errorState.repeatedPassword,
        repeatedPassword,
        password
      );
    }

    this.setState({ errorState });
  };

  saveChanges = async () => {
    const path = this.props.location?.pathname;
    const userId = getChatIdByUrl(path);
    const imgDataFile = this.state.imgDataFile;
    const phone = this.state.userData.phone
      ? getOnlyNumbers(this.state.userData.phone)
      : null;
    const newImage =
      imgDataFile != null ? await createImage(imgDataFile) : null;
    let imageId = this.state.userData.imageId;
    this.state.isRemovedImage && (await deleteImage(imageId));

    imageId = newImage?.imageId || null;

    setUserData({ ...this.state.userData, userId, imageId, phone });
    this.setState({
      userData: { ...this.state.userData, userId, imageId },
      isRemovedImage: false,
    });
  };

  checkAll = async () => {
    const userDataKeys = Object.keys(this.state.userData);
    const errorStateKeys = Object.keys(this.state.errorState);

    let isGoodValid = true;
    for (let userDataKey of userDataKeys) {
      this.state.userData[userDataKey] &&
        (await this.validInput(userDataKey, this.state.userData[userDataKey]));
    }
    for (let errorStateKey of errorStateKeys) {
      if (this.state.errorState[errorStateKey] != null) isGoodValid = false;
    }
    isGoodValid && this.saveChanges();

    return isGoodValid;
  };

  handlerBtn = async () => {
    if (this.state.isSelf) {
      await this.checkAll();
    } else {
      this.props.navigate(-1);
    }
  };

  onInput = async (inputType, value) => {
    let userData = this.state.userData;
    userData[inputType] = value;

    const isCheckRepeatPassword =
      inputType === userInputTypes.password &&
      !isEmptyString(userData.repeatedPassword);

    this.validTimers[inputType] && clearTimeout(this.validTimers[inputType]);
    this.validTimers[inputType] = setTimeout(() => {
      this.validInput(inputType, value);
      isCheckRepeatPassword &&
        this.validInput(
          userInputTypes.repeatedPassword,
          this.state.repeatedPassword
        );
    }, 1000);

    this.setState({ userData });
  };

  typedOnInput = (inputType) => (value) => this.onInput(inputType, value);

  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <Frame style={styles.content} headerText="Профиль">
          <div className={styles.column}>
            <div className={styles.imgContainer}>
              <CombinedImage
                setImgData={this.setImgFile}
                imgData={this.state.imgDataFile?.image}
                removeImg={this.removeImgFile}
              />
            </div>

            <InputWithHeader
              intialValue={this.state.userData.oldPassword}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.oldPassword]}
              onInput={this.typedOnInput(userInputTypes.oldPassword)}
              headerText={"Старый пароль"}
              inputType={inputTypes.PASSWORD}
              maxLength={MAX_PASSWORD_LENGTH}
            />
            <InputWithHeader
              intialValue={this.state.userData.password}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.password]}
              onInput={this.typedOnInput(userInputTypes.password)}
              headerText={"Новый пароль"}
              inputType={inputTypes.PASSWORD}
              maxLength={MAX_PASSWORD_LENGTH}
            />
            <InputWithHeader
              intialValue={this.state.userData.repeatedPassword}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.repeatedPassword]}
              onInput={this.typedOnInput(userInputTypes.repeatedPassword)}
              headerText={"Повторите пароль"}
              inputType={inputTypes.PASSWORD}
              maxLength={MAX_PASSWORD_LENGTH}
            />
          </div>
          <div className={styles.column}>
            <InputWithHeader
              intialValue={this.state.userData.firstName}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.firstName]}
              onInput={this.typedOnInput(userInputTypes.firstName)}
              headerText={"Имя"}
              maxLength={MAX_NAME_LENGTH}
            />
            <InputWithHeader
              intialValue={this.state.userData.secondName}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.secondName]}
              onInput={this.typedOnInput(userInputTypes.secondName)}
              headerText={"Фамилия"}
              maxLength={MAX_NAME_LENGTH}
            />
            <InputWithHeader
              intialValue={this.state.userData.lastName}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.lastName]}
              onInput={this.typedOnInput(userInputTypes.lastName)}
              headerText={"Отчество"}
              maxLength={MAX_NAME_LENGTH}
            />
            <InputWithHeader
              intialValue={this.state.userData.birthday}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.birthday]}
              onInput={this.typedOnInput(userInputTypes.birthday)}
              inputType={inputTypes.DATE}
              headerText={"Дата рождения"}
            />
            <InputWithHeader
              intialValue={this.state.userData.phone}
              style={styles.input}
              errorText={errorStateInputs[userInputTypes.phone]}
              onInput={this.typedOnInput(userInputTypes.phone)}
              inputType={inputTypes.PHONE}
              headerText={"Телефон"}
            />
            <button onClick={this.handlerBtn} className={styles.btnConfirm}>
              {this.state.isSelf ? "Сохранить" : "Назад"}
            </button>
          </div>
        </Frame>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setAuth }, dispatch);

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));
