import { TemporaryDataActionTypes } from "../../constants/types/reducerActionTypes";
import { lastChatId } from "../../constants/initialStates/reducerStates";

export const temporaryDataReducer = (state = lastChatId, action) => {
  switch (action.type) {
    case TemporaryDataActionTypes.SET_CURRENT_CHAT_ID:
      localStorage.setItem("lastChatId", action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
