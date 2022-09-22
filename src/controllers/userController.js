import axios from "axios";
import {
  URL_SERVER,
  CHECK_ROUTE_PASSWORD,
  ROUTE_USER_UPDATE,
} from "../constants/server";

export const setUserData = async (userData) => {
  let isSuccess = false;
  await axios
    .post(URL_SERVER + ROUTE_USER_UPDATE, userData)
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

export const checkPassword = async (login, password) => {
  const reqBody = {
    login,
    password,
  };
  let isGood = false;
  await axios.post(URL_SERVER + CHECK_ROUTE_PASSWORD, reqBody).then((res) => {
    const result = res.data;
    isGood = result.isGood;
  }).catch(err => console.log(err));
  return isGood;
};
