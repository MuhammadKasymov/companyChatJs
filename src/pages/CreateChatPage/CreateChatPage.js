import React, { Component } from "react";
import Frame from "../../components/Frame/Frame";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./CreateChatPage.module.scss";
import { getCompressedImg } from "../../common/files";
import InputWithHeader from "../../components/InputWithHeader/InputWithHeader";
import UserIconList from "../../components/UserIconList/UserIconList";
import { getFriendsData } from "../../controllers/friendsController";
import { connect } from "react-redux";
import {
  MAX_CHAT_NAME_LENGTH,
  MIN_USERS_CHAT_LENGTH,
} from "../../constants/validations/chatSettings";
import { validName } from "../../common/validations/validateInputs";
import {
  MIN_TWO_USERS_ERR,
  EMPTY_USERS_ERR,
} from "../../constants/types/exceptionTypes/chatExceptionsTypes";
import { createNewChat } from "../../controllers/chatController";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import { chatRouteNoId } from "../../constants/routePath";
import CombinedImage from "../../components/CombinedImage/CombinedImage";

class CreateChatPage extends Component {
  state = {
    title: "",
    userFriendsData: [],
    adminsId: [],
    usersChat: [],
    imgDataFile: null,
    nameErrText: null,
    usersErrText: null,
    navData: {
      isRedirect: false,
      path: "",
    },
  };
  nameValidTimer = null;

  constructor({ props }) {
    super(props);
  }

  componentDidMount() {
    this.uploadData();
  }

  async uploadData() {
    const userId = this.props.auth?.id;
    const userFriendsData = await getFriendsData(userId);
    this.setState({ userFriendsData });
  }

  setImgFile = async (imgFile) => {
    let imgDataFile = {};
    imgDataFile.image = await getCompressedImg(imgFile, 500);
    imgDataFile.smallImage = await getCompressedImg(imgFile, 120);
    this.setState({ imgDataFile });
  };

  removeImgFile = () => this.setState({ imgDataFile: null });

  setUsersChatData = (userData) => {
    let usersChat = this.state.usersChat;
    let userChatIndex = usersChat.findIndex((el) => el.id === userData.id);
    userChatIndex === -1 && usersChat.push(userData);
    userChatIndex !== -1 && usersChat.splice(userChatIndex, 1);
    this.setState({ usersChat, usersErrText: null });
  };

  validChatName = async (value) => {
    let errText = validName(value);
    await this.setState({ nameErrText: errText });
  };

  onChatName = (value) => {
    this.nameValidTimer && clearTimeout(this.nameValidTimer);
    this.nameValidTimer = setTimeout(() => {
      this.validChatName(value);
      this.setState({ title: value });
    }, 300);
  };

  validUsers = async (users) => {
    const usersChatLength = users?.length;
    if (usersChatLength === 0) {
      await this.setState({ usersErrText: EMPTY_USERS_ERR });
    } else if (usersChatLength < MIN_USERS_CHAT_LENGTH) {
      await this.setState({ usersErrText: MIN_TWO_USERS_ERR });
    }
  };

  onConfirm = async () => {
    const selfId = this.props.auth?.id;
    let usersIdList = this.state.usersChat.map((el) => el.id);
    usersIdList.push(selfId);
    await this.validChatName(this.state.title);
    await this.validUsers(usersIdList);
    const isError = this.state.usersErrText || this.state.nameErrText;
    if (!isError) {
      const reqData = {
        isGeneral: true,
        title: this.state.title,
        imgData: this.state.imgDataFile,
        usersId: usersIdList,
        adminsId: [selfId],
      };
      const newChatId = await createNewChat(reqData);
      const path = chatRouteNoId + newChatId;
      newChatId !== -1 &&
        this.setState({ navData: { path, isRedirect: true } });
    }
  };

  render() {
    const redirPath = this.state.navData.path;
    const isRedirect = this.state.navData.isRedirect;
    return (
      <div className={styles.container}>
        <NavBar />
        <RedirectWrapper path={redirPath} isRedirect={isRedirect} />
        <Frame style={styles.content} headerText={"Новый чат"}>
          <div className={styles.imgContainer}>
            <CombinedImage
              removeImg={this.removeImgFile}
              imgData={this.state.imgDataFile?.image}
              setImgData={this.setImgFile}
            />
          </div>
          <div className={styles.fillInputs}>
            <InputWithHeader
              style={styles.nameInput}
              headerText={"Название чата"}
              onInput={this.onChatName}
              errorText={this.state.nameErrText}
              maxLength={MAX_CHAT_NAME_LENGTH}
            />
            <UserIconList
              style={styles.userIconList}
              headerTxt={"Участники чата"}
              usersList={this.state.usersChat}
              emptyText={"Выберите из списка друзей"}
              errorText={this.state.usersErrText}
            />
          </div>
          <UserIconList
            style={styles.userFriendIcons}
            headerTxt={"Друзья"}
            usersList={this.state.userFriendsData}
            emptyText={"Ваш список друзей пуст"}
            setData={this.setUsersChatData}
          />
          <button onClick={this.onConfirm} className={styles.createBtn}>
            Создать
          </button>
        </Frame>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, null)(CreateChatPage);
