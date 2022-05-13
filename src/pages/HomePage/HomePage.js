import React from "react";
import styles from "./HomePage.module.scss";
import { getLastMessages } from "../../controllers/chatController";
import ChooseChat from "../../components/ChooseChat/ChooseChat";
import NavBar from "../../components/NavBar/NavBar";
import Chat from "../../components/Chat/Chat";
import { WS_SERVER } from "../../constants/server";
import { USER_DATA } from "../../constants/localStorageKeys";
import { connect } from "react-redux";
import { wsReqTypes } from "../../constants/types/wsTypes";
import { bindActionCreators } from "redux";
import { setLastMessagesData } from "../../store/action-creators/temporaryData";

class HomePage extends React.Component {
  state = {
    NeadLoad: true,
  };

  wsConn = null;

  constructor({ props }) {
    super(props);
  }

  async componentDidMount() {
    await this.uploadData();
    await this.connectWebsocket();
  }

  onRedirect = () => {
    this.wsConn.close();
  };

  async connectWebsocket(sendWithOpen) {
    const authData = JSON.parse(localStorage.getItem(USER_DATA));
    this.wsConn = new WebSocket(`${WS_SERVER}/?userId=${authData.id}`);
    this.wsConn.onmessage = (msg) => {
      const data = msg.data;
      if (data) {
        const objData = JSON.parse(data);
        this.dispathWSMessage(objData);
      }
    };
    this.wsConn.onopen = () => {
      sendWithOpen && this.wsConn.send(sendWithOpen);
    };
  }

  editLastMessages = (newMessageData) => {
    const lastMessagesArr = this.props.tempData?.lastMessagesData || [];
    const { chatId, ...newMessage } = newMessageData;
    const newMessageChatIndex = lastMessagesArr.findIndex(
      (el) => el.id.toString() === chatId.toString()
    );
    if (newMessageChatIndex !== -1) {
      lastMessagesArr[newMessageChatIndex].lastMessage = newMessage;
      this.props.setLastMessagesData(lastMessagesArr);
    } else {
      this.uploadData();
    }
  };

  dispathWSMessage = (msgData) => {
    switch (msgData.type) {
      case wsReqTypes.NEW_CHAT_MESSAGE:
        this.editLastMessages(msgData.payload);
        break;
      default:
        console.log("Bad ws message type");
        break;
    }
  };

  sendMessage = async (messageType, msgData) => {
    const sendData = { type: messageType, payload: msgData };
    const strSendData = JSON.stringify(sendData);

    const openStateWs = this.wsConn.__proto__?.OPEN;
    const readyStateWs = this.wsConn.readyState;
    const isOpenWs = openStateWs === readyStateWs;

    if (isOpenWs) {
      this.wsConn.send(strSendData);
    } else {
      this.connectWebsocket(strSendData);
    }
  };

  uploadData = async () => {
    const authData = JSON.parse(localStorage.getItem(USER_DATA));
    const lastMessages = await getLastMessages(authData.id);
    this.props.setLastMessagesData(lastMessages);
    this.setState({ NeadLoad: false });
  };

  render() {
    return (
      <>
        {!this.state.NeadLoad && (
          <div className={styles.container}>
            <NavBar onRedirect={this.onRedirect} />
            <ChooseChat />
            <Chat sendMessage={this.sendMessage} />
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setLastMessagesData }, dispatch);

const mapStateToProps = (state) => {
  const { auth, tempData } = state;
  return { auth, tempData };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
