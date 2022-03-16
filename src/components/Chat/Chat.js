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

  constructor({ props }) {
    super(props);
  }

  async componentDidMount() {
    await this.uploadData();
  }

  uploadData = async () => {
    const chatId = this.props.chatId;
    const chatData = await connectToChatById(chatId);

    this.setState({
      chatData: chatData,
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
    console.log(msg)
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
  const { chatData } = state;
  return { chatData };
};

// export default Chat;
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
