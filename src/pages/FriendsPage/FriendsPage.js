import React, { Component } from "react";
import styles from "./FriendsPage.module.scss";
import { getFriendsData } from "../../controllers/friendsController";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import FriendsCards from "../../components/FriendsCards/FriendsCards";
import FilterUsersCardAndHeader from "../../components/FilterUsersCardAndHeader/FilterUsersCardAndHeader";
import RedirectWrapper from "../../components/RedirectWrapper/RedirectWrapper";
import { friendsSearchRoute } from "../../constants/routePath";

class FriendsPage extends Component {
  state = {
    friendsData: [],
    redirectData: {
      path: "",
      isRedirect: false,
      payload: null,
    },
  };

  constructor({ props }) {
    super(props);
  }

  componentDidMount() {
    this.uploadData();
  }

  async uploadData() {
    const userId = this.props.auth.id;
    let friendsData = await getFriendsData(userId);
    this.setState({ friendsData });
  }

  filterUsers = (filterData) => {
    this.setState({
      redirectData: {
        path: friendsSearchRoute,
        isRedirect: true,
        payload: { filterData },
      },
    });
  };

  render() {
    return (
      <RedirectWrapper
        path={this.state.redirectData.path}
        isRedirect={this.state.redirectData.isRedirect}
        state={this.state.redirectData.payload}
      >
        <div className={styles.container}>
          <NavBar />
          <FilterUsersCardAndHeader
            confirmFilters={this.filterUsers}
            headerText={"Глобальный поиск"}
          />
          <FriendsCards friendsData={this.state.friendsData} />
        </div>
      </RedirectWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, null)(FriendsPage);
