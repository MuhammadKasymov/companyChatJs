import { TemporaryDataActionTypes } from "../../constants/types/reducerActionTypes";
import { initialTempData } from "../../constants/initialStates/reducerStates";

export const temporaryDataReducer = (state = initialTempData, action) => {
  switch (action.type) {
    case TemporaryDataActionTypes.SET_CURRENT_CHAT_ID:
      return { ...state, chatId: action.payload };
    default:
      return state;
  }
};
