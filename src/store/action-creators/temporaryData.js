import { TemporaryDataActionTypes } from "../../constants/types/reducerActionTypes";

export const setCurrentChatId = (chatId) => {
  localStorage.setItem("lastChatId", chatId);
  return (dispatch) => {
    dispatch({
      type: TemporaryDataActionTypes.SET_CURRENT_CHAT_ID,
      payload: chatId,
    });
  };
};
