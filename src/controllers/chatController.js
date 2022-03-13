import { chats } from "../../temporaryData/chatsData.json";
import { getLastMessages as lastMessage } from "../../temporaryData/lastChatData";

//Todo: связать с беком
export const getChats = async () => {
  return chats;
};

//Todo: связать с беком
export const getLastMessages = async () => {
  return lastMessage();
};
