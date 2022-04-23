import React from "react";
import { connect } from "react-redux";
import styles from "./Chat.module.scss";
import ChatMessages from "../ChatMessages/ChatMessages";
import TextInput from "../TextInput/TextInput";
import { getChatData } from "../../controllers/chatController";
import { wsReqTypes } from "../../constants/types/wsTypes";

class Chat extends React.Component {
  state = {
    chatId: -1,
    chatData: [],
    NeadLoad: true,
  };

  constructor({ props }) {
    super(props);
  }

  async componentDidMount() {
    await this.uploadData();
  }

  async componentDidUpdate() {
    const chatId = this.props.tempData.chatId;
    const userId = this.props.auth.id;
    if (chatId !== this.state.chatId) {
      const chatData = await getChatData(chatId, userId);
      this.setState({
        chatId: chatId,
        chatData: chatData || {},
      });
    }
  }

  uploadData = async () => {
    const chatId = this.props.tempData.chatId;
    const userId = this.props.auth.id;
    const chatData = await getChatData(chatId, userId);

    this.setState({
      chatId: chatId,
      chatData: chatData || {},
      NeadLoad: false,
    });
  };

  sendMessage = (msgText) => {
    const payload = {
      chatId: this.state.chatId,
      messageText: msgText,
    };
    this.props.sendMessage(wsReqTypes.ADD_CHAT_MESSAGE, payload);
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
