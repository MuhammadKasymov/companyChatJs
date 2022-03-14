import { combineReducers } from "redux";
import { selfInfoReducer } from "./selfInfoReducer"

export const rootReducer = combineReducers({
  auth: selfInfoReducer
})