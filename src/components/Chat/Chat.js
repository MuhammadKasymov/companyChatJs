import React from "react";
import { connect } from "react-redux";
import styles from "./Chat.module.scss";
import ChatMessages from "../ChatMessages/ChatMessages";
import TextInput from "../TextInput/TextInput";
import { connectToChatById } from "../../controllers/chatController";

class Chat extends React.Component {
  state = {
    chatData: [],
    NeadLoad: true,
  };

  constructor({props}) {
    super(props);
    console.log(props)
  }

  async componentDidMount() {
    await this.uploadData();
  }

  uploadData = async () => {
    const chatId = this.props.auth;
    const chatData = await connectToChatById(chatId);
    this.setState({
      chatData: chatData,
      NeadLoad: false,
    });
  };

  sendMessage = async (messageText) => {
    const currentDate = new Date();
    const msg = {
      userId: this.props.authData.id,
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
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (state) => {
  const { chatData, chatId } = state;
  return { chatData, chatId };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
