import React from "react";
import { connect } from "react-redux";
import styles from "./Chat.module.scss";
import ChatMessages from "../ChatMessages/ChatMessages";
import TextInput from "../TextInput/TextInput";

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

  uploadData = async () => {};

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
      <div className={styles.container}>
        <ChatMessages chatData={this.state.chatData} />
        <TextInput sendMsg={this.sendMessage} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatData, authData } = state;
  return { chatData, authData };
};

const mapDispatchToProps = (state) => {
  const { chatData } = state;
  return { chatData };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
