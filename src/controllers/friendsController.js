import axios from "axios";
import {
  URL_SERVER,
  ROUTE_FRIENDS_NEW,
  ROUTER_FRIEND_INVITE,
} from "../constants/server";

export const getNewFriendsData = async (userId, filterData) => {
  let data = [];
  const reqBody = {
    userId: userId || null,
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
