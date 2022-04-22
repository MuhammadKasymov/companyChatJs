import { AuthActionTypes } from "../../constants/types/reducerActionTypes";

export const setAuth = (authData) => {
  //Todo: delete it, and create good jwt access..
  localStorage.setItem("userData", JSON.stringify(authData));
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.SET_AUTH_DATA,
      payload: authData,
    });
  };
};
