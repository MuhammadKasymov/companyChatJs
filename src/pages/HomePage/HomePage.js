import React from "react";
import styles from "./HomePage.module.scss";
import { getLastMessages } from "../../controllers/chatController";
import ChooseChat from "../../components/ChooseChat/ChooseChat";
import Chat from "../../components/Chat/Chat";
import { WS_SERVER } from "../../constants/server";
import { connect } from "react-redux";

class HomePage extends React.Component {
  state = {
    NeadLoad: true,
    isConnWS: false,
    lastMessagesData: [{ id: -1, lastMessage: "", date: 0 }],
  };

  constructor({ props }) {
    super(props);
  }

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
    const lastMessages = await getLastMessages(this.props.auth.id);
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
            <Chat chatId={0} />
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
