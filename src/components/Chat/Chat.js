import React from "react";
import { connect } from "react-redux";
import styles from "./Chat.module.scss";
import ChatMessages from "../ChatMessages/ChatMessages";
import TextInput from "../TextInput/TextInput";
import { getChatData } from "../../controllers/chatController";

class Chat extends React.Component {
  state = {
    chatData: [],
    NeadLoad: true,
  };

  constructor({ props }) {
    super(props);
  }

  async componentDidMount() {
    await this.uploadData();
  }

  uploadData = async () => {
    const chatId = this.props.tempData.chatId;
    const userId = this.props.auth.id;
    const chatData = await getChatData(chatId, userId);

    this.setState({
      chatData: chatData || {},
      NeadLoad: false,
    });
  };

  sendMessage = async (messageText) => {
    const currentDate = new Date();
    const msg = {
      userId: this.props.auth.id,
      date: currentDate.toString(),
      txt: messageText.trim(),
    };
    return msg;
  };

  render() {
    return (
      <>
        {!this.state.NeadLoad && (
          <div className={styles.container}>
            <ChatMessages chatData={this.state.chatData} />
            <TextInput sendMsg={this.sendMessage} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, tempData } = state;
  return { auth, tempData };
};

export default connect(mapStateToProps, null)(Chat);
