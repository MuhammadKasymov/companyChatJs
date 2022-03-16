import { data } from "../temporaryData/chatsData";
import {
  getLastMessages as lastMessage,
  getChatById as getChatWithId,
} from "../temporaryData/lastChatData";

//Todo: связать с беком
export const getChats = async () => {
  return data;
};

//Todo: связать с беком
export const getLastMessages = async () => {
  return lastMessage();
};

export const connectToChatById = async (chatId) => {
  return getChatWithId(chatId);
};
