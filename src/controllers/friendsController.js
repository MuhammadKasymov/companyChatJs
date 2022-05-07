import axios from "axios";
import { URL_SERVER, ROUTE_FRIENDS_NEW } from "../constants/server";

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
