import { AuthActionTypes } from "../../contants/types/reducerActionTypes";
import { initialSelfInformationState } from "../../contants/initialStates/reducerStates";

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
