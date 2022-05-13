import axios from "axios";
import { URL_SERVER, ROUTE_NOTIFICATION_ALL } from "../constants/server";

export const getAllNotificationsData = async (userId) => {
  let data = [];
  const reqBody = { userId };
  await axios
    .post(URL_SERVER + ROUTE_NOTIFICATION_ALL, reqBody)
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
