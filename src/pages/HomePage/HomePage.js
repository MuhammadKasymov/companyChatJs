import React from "react";
import { connect } from "react-redux";
import { getChats, getLastMessages } from "../../controllers/chatController";
import { bindActionCreators } from "redux";
import ChooseChat from "../../components/ChooseChat/ChooseChat";

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
      <div>
        <ChooseChat />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
