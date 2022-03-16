import React from "react";
import styles from "./HomePage.module.scss";
import { connect } from "react-redux";
import { getChats, getLastMessages } from "../../controllers/chatController";
import { bindActionCreators } from "redux";
import ChooseChat from "../../components/ChooseChat/ChooseChat";
import { setAuth } from "../../store/action-creators/auth";
import Chat from "../../components/Chat/Chat";

class HomePage extends React.Component {
  state = {
    NeadLoad: true,
    lastMessagesData: [{ id: -1, lastMessage: "", date: 0 }],
    chatsData: [{}],
  };

  async componentDidMount() {
    await this.uploadData();
  }

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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setAuth }, dispatch);
export default connect(null, mapDispatchToProps)(HomePage);
