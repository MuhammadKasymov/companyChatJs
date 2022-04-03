import axios from "axios";
import {
  URL_SERVER,
  CHECK_ROUTE_USER_EMAIL,
  CHECK_ROUTE_USER_LOGIN,
} from "../constants/server";

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

export const checkLogin = async (login) => {
  let isExist = false;
  await axios
    .post(URL_SERVER + CHECK_ROUTE_USER_LOGIN, {
      login: login,
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
