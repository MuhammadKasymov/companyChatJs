import axios from "axios";
import { URL_SERVER, CHECK_ROUTE_USER_EMAIL } from "../contants/server";

export const checkEmail = async (email) => {
  let isExist = false;
  await axios
    .post(URL_SERVER + CHECK_ROUTE_USER_EMAIL, {
      email: email,
    })
    .then((res) => {
      const result = res.data;
      console.log(result);
      if (res.data) {
        isExist = result.isExist;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return isExist;
};
