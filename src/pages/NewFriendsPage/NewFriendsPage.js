import React from "react";
import styles from "./NewFriendsPage.module.scss";
import NewFriendCards from "../../components/NewFriendCards/NewFriendCards";
import NavBar from "../../components/NavBar/NavBar";
import { getNewFriendsData } from "../../controllers/friendsController";
import { connect } from "react-redux";
import FilterUsersCard from "../../components/FilterUsersCard/FilterUsersCard";

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

  uploadData = async (filterData) => {
    const userId = this.props.auth.id;
    const newFriendsData = await getNewFriendsData(userId, filterData);
    this.setState({ NeadLoad: false, newFriendsData });
  };

  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <FilterUsersCard confirmFilters={this.uploadData} />
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
