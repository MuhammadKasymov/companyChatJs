import axios from "axios";
import {
  URL_SERVER,
  ROUTE_LAST_MESSAGES,
  ROUTE_CHAT_DATA,
  ROUTE_PRIVATE_CHAT_ID,
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

export const getPrivateChatId = async (userId, friendId) => {
  const reqBody = { userId, friendId };
  let chatId = -1;
  await axios
    .post(URL_SERVER + ROUTE_PRIVATE_CHAT_ID, reqBody)
    .then((res) => {
      const result = res.data;
      if (result) {
        chatId = result.chatId;
      }
    })
    .catch((err) => {
      console.log();
    });

  return chatId;
};
