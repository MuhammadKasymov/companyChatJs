import axios from "axios";
import { URL_SERVER, URL_LAST_MESSAGES } from "../constants/server";

export const getLastMessages = async (userId) => {
  let lastMessages = [];
  const reqBody = { userId: userId };

  await axios
    .post(URL_SERVER + URL_LAST_MESSAGES, reqBody)
    .then((res) => {
      if (res.data) {
        lastMessages = res.data;
      }
    })
    .catch((err) => {
      console.log();
    });

  return lastMessages;
};

export const connectToChatById = async (chatId) => {
  return [];
};
