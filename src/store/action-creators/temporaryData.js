import { TemporaryDataActionTypes } from "../../constants/types/reducerActionTypes";
import { LAST_CHAT_ID } from "../../constants/localStorageKeys";

export const setCurrentChatId = (chatIdObj) => {
  localStorage.setItem(LAST_CHAT_ID, chatIdObj.chatId);
  
  return (dispatch) => {
    dispatch({
      type: TemporaryDataActionTypes.SET_CURRENT_CHAT_ID,
      payload: chatIdObj,
    });
  };
};