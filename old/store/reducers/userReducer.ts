import { UserAction, UserActionTypes, UserState } from "../../types/todo"


const initialState: UserState = {
  users: [],
  loading: false,
  error: null
}


export const userReducer = (state = initialState, action: UserAction) : UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      console.log("FetchUser")
      return {loading: true, error: null, users: []}
    case UserActionTypes.ADD_MESSAGE:
      console.log("ADD_MESSAGE")
      return {loading: true, error: null, users: []}
  }
}