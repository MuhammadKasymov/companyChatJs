import React from "react";
import styles from "./HomePage.module.scss";
import { getLastMessages } from "../../controllers/chatController";
import ChooseChat from "../../components/ChooseChat/ChooseChat";
import Chat from "../../components/Chat/Chat";
import { WS_SERVER } from "../../constants/server";
import { USER_DATA } from "../../constants/localStorageKeys";
import { connect } from "react-redux";
import { wsReqTypes } from "../../constants/types/wsTypes";

class HomePage extends React.Component {
  state = {
    NeadLoad: true,
    isConnWS: false,
    lastMessagesData: [{ id: -1, lastMessage: "", date: 0 }],
  };

  wsConn = null;

  constructor({ props }) {
    super(props);
  }

  async componentDidMount() {
    await this.uploadData();
    await this.connectWebsocket();
  }

  async connectWebsocket() {
    const authData = JSON.parse(localStorage.getItem(USER_DATA));
    this.wsConn = new WebSocket(`${WS_SERVER}/?userId=${authData.id}`);
    this.wsConn.onopen = () => {
      this.setState({ isConnWS: true });
    };

    this.wsConn.onclose = () => {
      this.setState({ isConnWS: false });
    };

    this.wsConn.onmessage = (msg) => {
      const data = msg.data;
      if (data) {
        const objData = JSON.parse(data);
        this.dispathWSMessage(objData);
      }
    };
  }

  async componentDidUpdate() {}

  dispathWSMessage = (msgData) => {
    switch (msgData.type) {
      case wsReqTypes.NEW_CHAT_MESSAGE:
        break;
      default:
        console.log("Bad ws message type");
        break;
    }
  };

  sendMessage = (messageType, msgData) => {
    if (this.state.isConnWS) {
      const sendData = { type: messageType, payload: msgData };
      const strSendData = JSON.stringify(sendData);
      this.wsConn.send(strSendData);
    }
  };

  uploadData = async () => {
    const authData = JSON.parse(localStorage.getItem(USER_DATA));
    const lastMessages = await getLastMessages(authData.id);
    this.setState({
      NeadLoad: false,
      lastMessagesData: lastMessages,
    });
  };

  render() {
    return (
      <>
        {!this.state.NeadLoad && (
          <div className={styles.container}>
            <ChooseChat chatsData={this.state.lastMessagesData} />
            <Chat sendMessage={this.sendMessage} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, null)(HomePage);
