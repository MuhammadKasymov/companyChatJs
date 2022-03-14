import { data } from "./chatsData";

/** Get Last Messages from all chats in Array */
export const getLastMessages = () => {
  let lastMessages = [];
  for (let i = 0; i < data.chats.length; i++) {
    const chatHistorie = data.chats[i].chatHistorie;
    const lastMessageIndex = chatHistorie.length - 1;
    const fullDataMessage = {
      id: data.chats[i].id,
      name: data.chats[i].name,
      lastMessage: chatHistorie[lastMessageIndex],
    };
    lastMessages.push(fullDataMessage);
  }
  return lastMessages;
};
