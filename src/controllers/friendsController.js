import axios from "axios";
import {
  URL_SERVER,
  ROUTE_FRIENDS_NEW,
  ROUTER_FRIEND_INVITE,
  ROUTE_FRIENDS_ALL,
  ROUTE_USER_DATA,
} from "../constants/server";

export const getNewFriendsData = async (userId, filterData) => {
  let data = [];
  const reqBody = {
    userId: userId || null,
    login: filterData?.login || null,
    minAge: filterData?.minAge || null,
    maxAge: filterData?.maxAge || null,
    name: filterData?.name || null,
  };
  await axios
    .post(URL_SERVER + ROUTE_FRIENDS_NEW, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        data = result;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export const inviteFriend = async (userId, friendId) => {
  let isSuccess = false;
  const reqBody = {
    userId,
    friendId,
  };

  await axios
    .post(URL_SERVER + ROUTER_FRIEND_INVITE, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        isSuccess = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return isSuccess;
};

export const getFriendsData = async (userId) => {
  let data = [];
  const reqBody = {
    userId: userId,
  };
  await axios
    .post(URL_SERVER + ROUTE_FRIENDS_ALL, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        data = result.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

export const getFriendData = async (friendId) => {
  let data = {};
  const reqBody = { userId: friendId };

  await axios
    .post(URL_SERVER + ROUTE_USER_DATA, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        data = result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
