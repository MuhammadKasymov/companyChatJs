import { TemporaryDataActionTypes } from "../../constants/types/reducerActionTypes";
import { LAST_CHAT_ID } from "../../constants/localStorageKeys";

export const setCurrentChatId = (chatId) => {
  localStorage.setItem(LAST_CHAT_ID, chatId);
  
  return (dispatch) => {
    dispatch({
      type: TemporaryDataActionTypes.SET_CURRENT_CHAT_ID,
      payload: chatId,
    });
  };
};
