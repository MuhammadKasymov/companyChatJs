import React from "react";
import styles from "./NewFriendsPage.module.scss";
import NewFriendCards from "../../components/NewFriendCards/NewFriendCards";
import NavBar from "../../components/NavBar/NavBar";
import { getNewFriendsData } from "../../controllers/friendsController";
import { connect } from "react-redux";
import FilterUsersCard from "../../components/FilterUsersCard/FilterUsersCard";
import { useLocation } from "react-router-dom";

class NewFriendsPage extends React.Component {
  state = {
    NeadLoad: true,
    newFriendsData: [],
  };
  filterData = null;

  constructor({ props }) {
    super(props);
  }

  componentDidMount() {
    const params = this.props.params;
    this.filterData = params?.state?.filterData;
    this.uploadData(this.filterData);
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
        <FilterUsersCard
          confirmFilters={this.uploadData}
          filterData={this.filterData}
        />
        <NewFriendCards newFriendsData={this.state.newFriendsData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const ParamsNewFriendsPage = (props) => (
  <NewFriendsPage {...props} params={useLocation()} />
);

export default connect(mapStateToProps, null)(ParamsNewFriendsPage);
