export interface UserState  {
  users: any[], 
  loading: boolean,
  error: null | boolean,
}

export enum UserActionTypes {
  FETCH_USERS = 'FETCH_USER',
  ADD_MESSAGE = 'ADD_USER',
}

export interface FetchUserAction {
  type: UserActionTypes.FETCH_USERS;
}
export interface AddMessageAction {
  type: UserActionTypes.ADD_MESSAGE;
  payload: string;
}


export type UserAction = FetchUserAction | AddMessageAction;