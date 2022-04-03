import { AuthActionTypes } from "../../constants/types/reducerActionTypes";
import { initialSelfInformationState } from "../../constants/initialStates/reducerStates";

export const selfInfoReducer = (
  state = initialSelfInformationState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_DATA:
      return {...state, ...action.payload}
    default:
      return state;
  }
};
