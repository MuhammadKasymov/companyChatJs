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
    chatData: "",
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
    if (chatId !== this.state.chatId) {
      this.setState({ NeadLoad: true, chatId: chatId });
      await this.uploadData();
    }
    await this.includeNewMessage();
  }

  includeNewMessage = async () => {
    const chatId = this.props.tempData.chatId;
    const lastMessages = this.props.tempData.lastMessagesData;
    const indexOfCurrentChat = lastMessages.findIndex(
      (el) => el.id.toString() === chatId.toString()
    );
    const lastMessageOfStorage = lastMessages[indexOfCurrentChat]?.lastMessage;
    const currentChatHistory = this.state.chatData?.chatHistory || [];
    const currentLastMessageIndex = currentChatHistory.length - 1;
    const currentLastMessage = currentChatHistory[currentLastMessageIndex];
    if (lastMessageOfStorage.id !== currentLastMessage.id) {
      currentChatHistory.push(lastMessageOfStorage);
      const newChatData = {
        ...this.state.chatData,
        chatHistory: currentChatHistory,
      };
      this.setState({ chatData: newChatData });
    }
  };

  uploadData = async () => {
    const chatId = this.props.tempData.chatId;
    const userId = this.props.auth.id;
    const chatData = await getChatData(chatId, userId);
    chatData.chatHistory = chatData.chatHistory
      ? JSON.parse(chatData.chatHistory)
      : [];

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
      <div className={styles.container}>
        <ChatMessages
          isLoading={this.state.NeadLoad}
          chatData={this.state.chatData}
        />
        <TextInput sendMsg={this.sendMessage} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, tempData } = state;
  return { auth, tempData };
};

export default connect(mapStateToProps, null)(Chat);
