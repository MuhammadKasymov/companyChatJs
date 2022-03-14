import { AuthActionTypes } from "../../contants/types/reducerActionTypes";

export const setAuth = (authData) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.SET_AUTH_DATA,
      payload: authData,
    });
  };
};
