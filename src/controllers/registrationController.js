import axios from "axios";
import {
  URL_SERVER,
  CHECK_ROUTE_USER_EMAIL,
  CHECK_ROUTE_USER_LOGIN,
  ROUTE_USER_NEW,
} from "../constants/server";

export const registrUser = async (userData) => {
  let isSuccess = false;
  await axios
    .post(URL_SERVER + ROUTE_USER_NEW, userData)
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

export const checkEmail = async (email) => {
  let isExist = false;
  await axios
    .post(URL_SERVER + CHECK_ROUTE_USER_EMAIL, {
      email: email,
    })
    .then((res) => {
      const result = res.data;
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
      if (res.data) {
        isExist = result.isExist;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return isExist;
};
