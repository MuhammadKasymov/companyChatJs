import axios from "axios";
import {
  URL_SERVER,
  ROUTE_LAST_MESSAGES,
  ROUTE_CHAT_DATA,
} from "../constants/server";

export const getLastMessages = async (userId) => {
  let lastMessages = [];
  const reqBody = { userId: userId };

  await axios
    .post(URL_SERVER + ROUTE_LAST_MESSAGES, reqBody)
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

export const getChatData = async (chatId, userId) => {
  let chatData = {};
  const reqBody = { userId, chatId };

  await axios
    .post(URL_SERVER + ROUTE_CHAT_DATA, reqBody)
    .then((res) => {
      if (res.data) {
        chatData = res.data;
      }
    })
    .catch((err) => {
      console.log();
    });

  return chatData;
};
