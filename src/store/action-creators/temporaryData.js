import { TemporaryDataActionTypes } from "../../constants/types/reducerActionTypes";

export const setCurrentChatId = (authData) => {
  return (dispatch) => {
    dispatch({
      type: TemporaryDataActionTypes.SET_CURRENT_CHAT_ID,
      payload: authData,
    });
  };
};
