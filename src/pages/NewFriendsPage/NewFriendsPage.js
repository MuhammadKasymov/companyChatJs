import React from "react";
import styles from "./NewFriendsPage.module.scss";
import NewFriendCards from "../../components/NewFriendCards/NewFriendCards";
import NavBar from "../../components/NavBar/NavBar";
import { getNewFriendsData } from "../../controllers/friendsController";
import { connect } from "react-redux";

class NewFriendsPage extends React.Component {
  state = {
    NeadLoad: true,
    newFriendsData: [],
  };

  constructor({ props }) {
    super(props);
  }

  componentDidMount() {
    this.uploadData();
  }

  uploadData = async () => {
    const userId = this.props.auth.id;
    const newFriendsData = await getNewFriendsData(userId);
    this.setState({ NeadLoad: false, newFriendsData });
  };

  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <NewFriendCards newFriendsData={this.state.newFriendsData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, null)(NewFriendsPage);
