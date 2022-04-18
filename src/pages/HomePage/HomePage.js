import React from "react";
import styles from "./HomePage.module.scss";
import { getChats, getLastMessages } from "../../controllers/chatController";
import ChooseChat from "../../components/ChooseChat/ChooseChat";
import Chat from "../../components/Chat/Chat";
import { WS_SERVER } from "../../constants/server";

class HomePage extends React.Component {
  state = {
    NeadLoad: true,
    isConnWS: false,
    lastMessagesData: [{ id: -1, lastMessage: "", date: 0 }],
    chatsData: [{}],
  };

  async componentDidMount() {
    await this.uploadData();
    await this.connectWebsocket();
  }

  async connectWebsocket(userId) {
    const conn = new WebSocket(`${WS_SERVER}/userData?userId=${userId}`);
    conn.onopen = () => {
      this.setState({ isConnWS: true });
    };

    conn.onclose = () => {
      this.setState({ isConnWS: false });
    };

    conn.onmessage = (msg) => {};
  }

  dispathMessageMSG = (msg) => {
    switch (msg.type) {
      case "newMessage":
        break;
      default:
        console.log("Bad ws message type");
        break;
    }
  };

  uploadData = async () => {
    const lastMessages = await getLastMessages();
    const chats = await getChats();
    this.setState({
      NeadLoad: false,
      lastMessagesData: lastMessages,
      chatsData: chats,
    });
  };

  render() {
    return (
      <>
        {!this.state.NeadLoad && (
          <div className={styles.container}>
            <ChooseChat chatsData={this.state.lastMessagesData} />
            <Chat chatId={0} />
          </div>
        )}
      </>
    );
  }
}

export default HomePage;
