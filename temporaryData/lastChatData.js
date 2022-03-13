import { chats } from "./chatsData.json";

/** Get Last Messages from all chats in Array */
export const getLastMessages = () => {
  let lastMessages = [];
  for (let i = 0; i < chats.length; i++) {
    const chatHistorie = chats[i].chatHistorie;
    const lastMessageIndex = chatHistorie.length - 1;
    lastMessages.push(chatHistorie[lastMessageIndex]);
  }
};
